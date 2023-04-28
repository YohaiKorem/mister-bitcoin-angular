import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component';
import { ContactEditComponent } from './pages/contact-edit/contact-edit.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ContactFilterComponent } from './cmps/contact-filter/contact-filter.component';
import { ContactListComponent } from './cmps/contact-list/contact-list.component';
import { ContactPreviewComponent } from './cmps/contact-preview/contact-preview.component';
import { MainHeaderComponent } from './cmps/main-header/main-header.component';
import { MovesListComponent } from './cmps/moves-list/moves-list.component';
import { TransferFundsComponent } from './cmps/transfer-funds/transfer-funds.component';
import { StatisticsPageComponent } from './pages/statistics-page/statistics-page.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ChartComponent } from './cmps/chart/chart.component';
import { NgChartsModule } from 'ng2-charts';
@NgModule({
  declarations: [
    AppComponent,
    ContactDetailsComponent,
    ContactEditComponent,
    ContactPageComponent,
    HomePageComponent,
    ContactFilterComponent,
    ContactListComponent,
    ContactPreviewComponent,
    MainHeaderComponent,
    MovesListComponent,
    TransferFundsComponent,
    StatisticsPageComponent,
    SignupComponent,
    ChartComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgChartsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
