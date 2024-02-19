import { Routes } from '@angular/router';
import { LibraryComponent } from './library/library.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MoreInfoComponent } from './more-info/more-info.component';
import { HomeComponent } from './home/home.component';
import { CardsComponent } from './cards/cards.component';
import { AuthGuardService } from './auth-guard.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'store', component: CardsComponent },
  {
    path: 'library',
    component: LibraryComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'store/moreInfo',
    component: MoreInfoComponent,
  },
  { path: 'login/forgotPassword', component: ForgotPasswordComponent },
];
