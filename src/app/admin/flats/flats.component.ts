import { ChangeDetectorRef, Component } from '@angular/core';
import { flats } from '../models/flats';
import { MatTableDataSource } from '@angular/material/table';
import { FlatService } from '../service/flat.service';
import { MatDialog } from '@angular/material/dialog';
import { AddFlatsComponent } from './add-flats/add-flats.component';

@Component({
  selector: 'app-flats',
  standalone: false,
  templateUrl: './flats.component.html',
  styleUrl: './flats.component.scss',
})
export class FlatsComponent {
  displayedColumns: string[] = [
    'sr_no',
    'flat_no',
    'block_no',
    'flat_type',
    'status',
    'action',
  ];
  dataSource = new MatTableDataSource<flats>();

  constructor(
    private flatService: FlatService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getFlat();
  }

  getStatusClass(status: string): string {
    return status.toLowerCase() === 'available'
      ? 'status-available'
      : 'status-alloted';
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddFlatsComponent, {
      maxHeight: '90vh',
      width: '65%',
      maxWidth: '95vw',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getFlat();
      }
    });
  }
  editFlat(flat?: flats): void {
    const dialogRef = this.dialog.open(AddFlatsComponent, {
      maxHeight: '80vh',
      width: '65%',
      maxWidth: '95vw',
      data: flat ? { flat } : null,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getFlat();
      }
    });
  }

  getFlat(): void {
    this.flatService.getFlats().subscribe(
      (data: flats[]) => {
        this.dataSource.data = data;
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error fetching anime data:', error);
      }
    );
  }

  deleteFlat(id: number): void {
    if (confirm('Are you sure you want to delete this flat?')) {
      this.flatService.deleteFlat(id).subscribe({
        next: () => {
          this.dataSource.data = this.dataSource.data.filter(
            (flat) => flat.id !== id
          );
          this.getFlat();
          alert('Flat deleted successfully.');
        },
        error: (err) => {
          console.error('Error deleting flat:', err);
          alert('Failed to delete flat.');
        },
      });
    }
  }
}
