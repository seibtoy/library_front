import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/HomePage/home-page.component';
import { RegisterPageComponent } from './pages/RegisterPage/reg-page.component';
import { LoginPageComponent } from './pages/LoginPage/log-page.component';
import { RedirectGuard } from './guard/redirect.guard';
import { BorrowedPageComponent } from './pages/BorrowedPage/borrowed-page.component';
import { FinancialsPageComponent } from './pages/FinancialsPage/financials-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: 'register',
    component: RegisterPageComponent,
    canActivate: [RedirectGuard],
  },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [RedirectGuard],
  },
  {
    path: 'borrowed',
    component: BorrowedPageComponent,
  },
  {
    path: 'financials',
    component: FinancialsPageComponent,
  },
];
