import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MemberService } from '../../service/member.service';

@Component({
  selector: 'app-add-members',
  standalone: false,
  templateUrl: './add-members.component.html',
  styleUrl: './add-members.component.scss',
})
export class AddMembersComponent {
  memberForm!: FormGroup;
  statusTypeOptions: string[] = ['Active', 'Inactive'];

  constructor(
    private dialogRef: MatDialogRef<AddMembersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private memberService: MemberService
  ) {
    this.initializeForm();
    this.patchFormData();
  }

  initializeForm(): void {
    this.memberForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      phone: ['', Validators.required], // Validates 10-digit phone numbers
      email: ['', Validators.required], // Ensures valid email format
      address: ['', Validators.required], // Ensures valid email format
      city: ['', Validators.required], // Ensures valid email format
      state: ['', Validators.required], // Ensures valid email format
      pincode: ['', Validators.required], // Ensures valid email format
      occupation: ['', Validators.required],
      aadhaar: ['', Validators.required], // Validates 12-digit Aadhaar numbers
      emergency_contact_phone: ['', Validators.required],
      vehicle_number: ['', Validators.required],
      move_in_date: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  patchFormData(): void {
    if (this.data?.member) {
      const member = { ...this.data.member };

      if (member.move_in_date) {
        member.move_in_date = this.formatDateToYYYYMMDD(member.move_in_date);
      }

      this.memberForm.patchValue(member);
    }
  }

  onSubmit(): void {
    if (this.memberForm.invalid) {
      alert('Please fill all required fields correctly.');

      return;
    }

    const memberData = this.memberForm.value;

    if (memberData.move_in_date) {
      memberData.move_in_date = this.formatDateToYYYYMMDD(
        memberData.move_in_date
      );
    }

    if (memberData.id) {
      this.updateMember(memberData);
    }
  }

  updateMember(memberData: any): void {
    this.memberService.updateMember(memberData.id, memberData).subscribe(
      (response) => {
        console.log('Member updated successfully:', response);
        this.dialogRef.close(true);
      },
      (error) => {
        console.error('Error updating member:', error);
      }
    );
  }

  formatDateToYYYYMMDD(date: string | Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
