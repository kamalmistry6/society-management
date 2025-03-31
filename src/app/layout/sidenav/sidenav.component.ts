import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { navbarData } from './nav-data';
import { IconService } from '../../services/icon.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

interface sidenavToggle {
  screenWidth: number;
  collapsed: boolean;
}
interface NavbarItem {
  RouterLink: string;
  iconName: string;
  label: string;
  permission?: string;
}

@Component({
  selector: 'app-sidenav',
  standalone: false,
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  @Output() onToggleSidenav: EventEmitter<sidenavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData: NavbarItem[] = navbarData;
  filteredNavData: NavbarItem[] = [];

  constructor(
    private iconService: IconService,
    private authService: AuthService,
    private router: Router
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.collapsed = false;
    this.onToggleSidenav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.iconService.registerIcons();
    this.filterNavbarItems();
  }

  /**
   * @desc Filters navbar items based on user role
   */
  filterNavbarItems(): void {
    const currentRole = this.authService.getRole(); // Fetch current role
    this.filteredNavData = this.navData.filter((item) => {
      // Show item only if the role matches the required permission
      return !item.permission || item.permission === currentRole;
    });
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSidenav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSidenav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirect to login page
  }
}
