import { ChangeDetectorRef, Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { allotment } from '../models/allotment';
import { AllotmentService } from '../service/allotment.service';
import { MatDialog } from '@angular/material/dialog';
import { AddAllotmentComponent } from './add-allotment/add-allotment.component';

@Component({
  selector: 'app-allotment',
  standalone: false,
  templateUrl: './allotment.component.html',
  styleUrl: './allotment.component.scss',
})
export class AllotmentComponent {
  displayedColumns: string[] = [
    'sr_no',
    'user_name',
    'flat_no',
    'block_no',
    'flat_type',
    'start_date',
    'end_date',
    'action',
  ];
  dataSource = new MatTableDataSource<allotment>();

  constructor(
    private allotmentService: AllotmentService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getAllotment();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddAllotmentComponent, {
      maxHeight: '90vh',
      width: '65%',
      maxWidth: '95vw',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAllotment();
      }
    });
  }
  editAllotment(allotment?: allotment): void {
    const dialogRef = this.dialog.open(AddAllotmentComponent, {
      maxHeight: '80vh',
      width: '65%',
      maxWidth: '95vw',
      data: allotment ? { allotment } : null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAllotment();
      }
    });
  }

  getAllotment(): void {
    this.allotmentService.getAllotments().subscribe(
      (data: allotment[]) => {
        this.dataSource.data = data;
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error fetching allotment data:', error);
      }
    );
  }

  deleteAllotment(id: number): void {
    if (confirm('Are you sure you want to delete this allotment?')) {
      this.allotmentService.deleteAllotment(id).subscribe({
        next: () => {
          this.dataSource.data = this.dataSource.data.filter(
            (allotment) => allotment.allotment_id !== id
          );
          alert('Flat Allotment deleted successfully.');
        },
        error: (err) => {
          console.error('Error deleting Flat Allotment:', err);
          alert('Failed to delete Flat Allotment.');
        },
      });
    }
  }
}
