import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/HomePage/home-page.component';
import { RegisterPageComponent } from './pages/RegisterPage/reg-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: RegisterPageComponent },
];
