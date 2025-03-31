import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class IconService {
  private iconsRegistered = false;
  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {}

  registerIcons() {
    if (this.iconsRegistered) {
      return;
    }

    this.iconRegistry.addSvgIcon(
      'save',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/save.svg')
    );
    this.iconRegistry.addSvgIcon(
      'delete',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/delete.svg')
    );
    this.iconRegistry.addSvgIcon(
      'edit',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/edit.svg')
    );
    this.iconRegistry.addSvgIcon(
      'close',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/close.svg')
    );
    this.iconRegistry.addSvgIcon(
      'logout',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/logout.svg')
    );
    this.iconRegistry.addSvgIcon(
      'add',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/plus.svg')
    );
    // dashboard icon
    this.iconRegistry.addSvgIcon(
      'dashboard',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/dashboard.svg'
      )
    );
    this.iconRegistry.addSvgIcon(
      'member',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/building-member.svg'
      )
    );
    this.iconRegistry.addSvgIcon(
      'flat',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/users.svg')
    );
    this.iconRegistry.addSvgIcon(
      'allotment',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/allotment.svg'
      )
    );
    this.iconRegistry.addSvgIcon(
      'expense',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/expense.svg')
    );
    this.iconRegistry.addSvgIcon(
      'recurring',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/recurring.svg'
      )
    );

    this.iconsRegistered = true;
  }
}
