import { Component, OnInit } from '@angular/core';
import { IconService } from './services/icon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'society-management';
  constructor(private iconService: IconService) {}

  ngOnInit() {
    this.iconService.registerIcons(); // ✅ Register icons once
  }
}
