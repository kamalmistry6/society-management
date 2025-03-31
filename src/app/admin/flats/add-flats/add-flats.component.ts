import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FlatService } from '../../service/flat.service';

@Component({
  selector: 'app-add-flats',
  standalone: false,
  templateUrl: './add-flats.component.html',
  styleUrl: './add-flats.component.scss',
})
export class AddFlatsComponent {
  flatForm: FormGroup;
  flatTypeOptions: string[] = ['1BHK', '2BHK', '3BHK', '4BHK'];

  constructor(
    private dialogRef: MatDialogRef<AddFlatsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private flatService: FlatService
  ) {
    this.flatForm = this.fb.group({
      id: [null],
      flat_no: ['', Validators.required],
      block_no: ['', Validators.required],
      flat_type: ['', Validators.required],
    });

    if (this.data?.flat) {
      this.flatForm.patchValue(this.data.flat);
    }
  }

  onSubmit(): void {
    if (this.flatForm.invalid) {
      alert('Please fill all required fields correctly.');
      return;
    }

    const flatData = {
      flat_no: this.flatForm.value.flat_no,
      block_no: this.flatForm.value.block_no,
      flat_type: this.flatForm.value.flat_type,
    };

    if (this.flatForm.value.id) {
      this.flatService.updateFlat(this.flatForm.value.id, flatData).subscribe(
        (response) => {
          console.log('Flat updated successfully:', response);
          this.dialogRef.close(true);
        },
        (error) => {
          console.error('Error updating Flat:', error);
        }
      );
    } else {
      this.flatService.addFlat(flatData).subscribe(
        (response) => {
          console.log('Flat added successfully:', response);
          this.dialogRef.close(true);
        },
        (error) => {
          console.error('Error adding Flat:', error);
        }
      );
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
