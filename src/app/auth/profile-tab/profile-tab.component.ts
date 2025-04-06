import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { profile } from '../models/profile';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-profile-tab',
  templateUrl: './profile-tab.component.html',
  styleUrls: ['./profile-tab.component.scss'],
  imports: [CommonModule, SharedModule],
})
export class ProfileTabComponent implements OnInit {
  profileForm!: FormGroup;
  passwordForm!: FormGroup;

  userProfile: profile = {} as profile;
  isEditMode = false;
  showOldPassword = false;
  showNewPassword = false;

  selectedFile: File | null = null;
  photoUrl: string = '';

  constructor(
    private dialogRef: MatDialogRef<ProfileTabComponent>,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getProfile();
    this.profileForm.disable();

    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
    });
  }

  initializeForm(): void {
    this.profileForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', Validators.required],
      occupation: ['', Validators.required],
      aadhaar: ['', [Validators.required, Validators.pattern('^[0-9]{12}$')]],
      emergency_contact_phone: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
      vehicle_number: [''],
      move_in_date: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  getProfile(): void {
    this.authService.getProfile().subscribe({
      next: (profile) => {
        this.userProfile = profile;
        this.patchFormData();
        if (profile.profile_photo) {
          this.photoUrl = `http://localhost:5000/uploads/profile_photos/${profile.profile_photo}`;
        }
      },
      error: (err) => {
        console.error('Error fetching profile:', err);
      },
    });
  }

  patchFormData(): void {
    const formattedProfile = { ...this.userProfile };

    if (formattedProfile.move_in_date) {
      formattedProfile.move_in_date = this.formatDateToYYYYMMDD(
        formattedProfile.move_in_date
      );
    }

    this.profileForm.patchValue(formattedProfile);
  }

  toggleEdit(): void {
    if (this.isEditMode) {
      this.onSubmit(); // Save
      this.profileForm.disable();
    } else {
      this.profileForm.enable(); // Enable form for editing
    }
    this.isEditMode = !this.isEditMode;
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      alert('Please fill all required fields correctly.');
      return;
    }

    const profileData = { ...this.profileForm.value };

    if (profileData.move_in_date) {
      profileData.move_in_date = this.formatDateToYYYYMMDD(
        profileData.move_in_date
      );
    }

    this.updateProfile(profileData);
  }

  updateProfile(profileData: any): void {
    const formData = new FormData();

    // Append form fields
    for (const key in profileData) {
      if (profileData[key] !== null && profileData[key] !== undefined) {
        formData.append(key, profileData[key]);
      }
    }

    // Append profile photo
    if (this.selectedFile) {
      formData.append('profile_photo', this.selectedFile);
    }

    this.authService.updateProfile(formData).subscribe({
      next: (response) => {
        alert('Profile updated successfully!');
        this.dialogRef.close();
      },
      error: (error) => {
        console.error('Error updating profile:', error);
        alert('Failed to update profile. Please try again.');
      },
    });
  }

  changePassword(): void {
    if (this.passwordForm.invalid) {
      alert('Please fill in both old and new passwords.');
      return;
    }

    const data = this.passwordForm.value;

    this.authService
      .changePassword(data.oldPassword, data.newPassword)
      .subscribe({
        next: () => {
          alert('Password changed successfully!');
          this.passwordForm.reset();
        },
        error: (err) => {
          console.error('Password change failed:', err);
          alert(err.error?.message || 'Failed to change password.');
        },
      });
  }

  toggleOldPasswordVisibility(): void {
    this.showOldPassword = !this.showOldPassword;
  }

  toggleNewPasswordVisibility(): void {
    this.showNewPassword = !this.showNewPassword;
  }

  formatDateToYYYYMMDD(date: string | Date): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
