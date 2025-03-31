import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { IconService } from './services/icon.service';
import { LayoutComponent } from './layout/layout.component';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { SharedModule } from './shared/shared.module';
import { PermissionService } from './services/permission.service';

@NgModule({
  declarations: [AppComponent, SidenavComponent, LayoutComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, SharedModule],
  providers: [IconService, PermissionService],
  bootstrap: [AppComponent],
})
export class AppModule {}
