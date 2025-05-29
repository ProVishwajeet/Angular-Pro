import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SnackbarComponent } from './components/shared/snackbar/snackbar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { SnackbarService } from './services/snackbar.service';
import { CryptocurrencyService } from './services/cryptocurrency.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    SnackbarComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [SnackbarService, CryptocurrencyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
