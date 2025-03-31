import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { members } from '../../models/members';
import { MemberService } from '../../service/member.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllotmentService } from '../../service/allotment.service';
import { flats } from '../../models/flats';
import { FlatService } from '../../service/flat.service';

@Component({
  selector: 'app-add-allotment',
  standalone: false,
  templateUrl: './add-allotment.component.html',
  styleUrl: './add-allotment.component.scss',
})
export class AddAllotmentComponent {
  allotmentForm!: FormGroup;
  memberData: members[] = [];
  flatdata: flats[] = [];

  constructor(
    private dialogRef: MatDialogRef<AddAllotmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private memberService: MemberService,
    private allotmentService: AllotmentService,
    private flatService: FlatService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.initializeForm();
    this.patchFormData();
  }

  ngOnInit(): void {
    this.getMember();
    this.getFlat();
  }

  initializeForm(): void {
    this.allotmentForm = this.fb.group({
      id: [null],
      member_id: ['', Validators.required],
      flat_id: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: [''],
    });
  }

  patchFormData(): void {
    if (this.data?.allotment) {
      const allotment = { ...this.data.allotment };

      if (allotment.start_date) {
        allotment.start_date = this.formatDateToYYYYMMDD(allotment.start_date);
      }
      if (allotment.end_date) {
        allotment.end_date = this.formatDateToYYYYMMDD(allotment.end_date);
      }

      this.allotmentForm.patchValue(allotment);
    }
  }

  onSubmit(): void {
    if (this.allotmentForm.invalid) {
      alert('Please fill all required fields correctly.');
      return;
    }

    const allotmentData = this.allotmentForm.value;

    allotmentData.start_date = this.formatDateToYYYYMMDD(
      allotmentData.start_date
    );
    allotmentData.end_date = this.formatDateToYYYYMMDD(allotmentData.end_date);

    if (allotmentData.id) {
      this.updateAllotment(allotmentData);
    } else {
      this.addAllotment(allotmentData);
    }
  }

  updateAllotment(allotmentData: any): void {
    this.allotmentService
      .updateAllotment(allotmentData.id, allotmentData)
      .subscribe(
        (response) => {
          console.log('Flat Allotment updated successfully:', response);
          this.dialogRef.close(true);
        },
        (error) => {
          console.error('Error updating Flat Allotment:', error);
        }
      );
  }

  addAllotment(allotmentData: any): void {
    this.allotmentService.addAllotment(allotmentData).subscribe(
      (response) => {
        console.log('Flat Allotment added successfully:', response);
        this.dialogRef.close(true);
      },
      (error) => {
        console.error('Error adding Flat Allotment:', error);
      }
    );
  }

  formatDateToYYYYMMDD(date: string | Date): string {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  getMember(): void {
    this.memberService.getMembers().subscribe(
      (data: members[]) => {
        this.memberData = data.filter(
          (member) => member.status.toLowerCase() === 'inactive'
        );
        // this.memberData = data;
        this.cdr.detectChanges();
      },
      (error) => console.error('Error fetching member data:', error)
    );
  }

  getFlat(): void {
    this.flatService.getFlats().subscribe(
      (data: flats[]) => {
        // Filter only flats where status is 'available'
        this.flatdata = data.filter(
          (flat) => flat.status.toLowerCase() === 'available'
        );
        this.cdr.detectChanges();
      },
      (error) => console.error('Error fetching flat data:', error)
    );
  }
}
