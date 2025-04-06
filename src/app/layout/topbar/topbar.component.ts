import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProfileTabComponent } from '../../auth/profile-tab/profile-tab.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-topbar',
  standalone: false,
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent {
  profilePhotoUrl: string = '';

  constructor(private dialog: MatDialog, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.profile$.subscribe((profile) => {
      if (profile?.profile_photo) {
        this.profilePhotoUrl = `http://localhost:5000/uploads/profile_photos/${profile.profile_photo}`;
      }
    });

    // Just in case it's not loaded yet
    this.authService.refreshProfile();
  }
  openDialog(): void {
    this.dialog.open(ProfileTabComponent, {
      height: '95vh',
      width: '80%',
      maxWidth: '80vw',
    });
  }
}
