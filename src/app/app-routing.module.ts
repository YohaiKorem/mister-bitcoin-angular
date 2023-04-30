import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component';
import { StatisticsPageComponent } from './pages/statistics-page/statistics-page.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { ContactEditComponent } from './pages/contact-edit/contact-edit.component';
import { ContactResolver } from './services/contact-resolver.service';

const routes: Routes = [
  {
    path: 'statistics',
    component: StatisticsPageComponent,
  },
  { path: 'signup', component: SignupComponent },
  {
    path: 'contact',
    component: ContactPageComponent,
    children: [
      {
        path: 'edit/:id',
        component: ContactEditComponent,
        resolve: { contact: ContactResolver },
      },
      { path: 'edit', component: ContactEditComponent },
    ],
  },
  {
    path: 'contact/:id',
    component: ContactDetailsComponent,
    resolve: { contact: ContactResolver },
  },
  {
    path: '',
    component: HomePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
