import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MemberService } from '../service/member.service';
import { MatDialog } from '@angular/material/dialog';
import { AddMembersComponent } from './add-members/add-members.component';
import { members } from '../models/members';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-members',
  standalone: false,
  templateUrl: './members.component.html',
  styleUrl: './members.component.scss',
})
export class MembersComponent implements OnInit {
  displayedColumns: string[] = [
    'sr_no',
    'name',
    'phone',
    'email',
    'aadhaar',
    'vehicle_number',
    'move_in_date',
    'status',
    'action',
  ];

  dataSource = new MatTableDataSource<members>();
  filterForm: FormGroup;

  constructor(
    private memberService: MemberService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      name: [''],
      phone: [''],
      email: [''],
      status: [''],
    });
  }

  ngOnInit(): void {
    this.getMembers();
    this.setupFilter();
  }

  // Filtering with debounce
  setupFilter(): void {
    this.filterForm.valueChanges.pipe(debounceTime(500)).subscribe(() => {
      this.getMembers();
    });
  }

  getMembers(): void {
    const filterValues = this.filterForm.value;

    this.memberService.getMembers(filterValues).subscribe(
      (data: members[]) => {
        this.dataSource.data = data;
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error fetching members data:', error);
        alert('Failed to fetch members data');
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddMembersComponent, {
      maxHeight: '80vh',
      width: '65%',
      maxWidth: '95vw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getMembers();
      }
    });
  }

  editMember(member?: members): void {
    const dialogRef = this.dialog.open(AddMembersComponent, {
      maxHeight: '80vh',
      width: '65%',
      maxWidth: '95vw',
      data: member ? { member } : null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getMembers();
      }
    });
  }

  deleteMember(id: number): void {
    if (confirm('Are you sure you want to delete this member?')) {
      this.memberService.deleteMember(id).subscribe({
        next: () => {
          this.getMembers();
          alert('Member deleted successfully.');
        },
        error: (err) => {
          console.error('Error deleting member:', err);
          alert('Failed to delete member.');
        },
      });
    }
  }

  getStatusClass(status: string): string {
    return status.toLowerCase() === 'active'
      ? 'status-active'
      : 'status-inactive';
  }
}
