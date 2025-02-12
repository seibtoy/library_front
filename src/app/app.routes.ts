import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/HomePage/home-page.component';
import { RegisterPageComponent } from './pages/RegisterPage/reg-page.component';
import { LoginPageComponent } from './pages/LoginPage/log-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'login', component: LoginPageComponent },
];
