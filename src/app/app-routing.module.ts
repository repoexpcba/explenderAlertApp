import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './components/login/login.component';
import { ButtonsAlertComponent } from './components/buttons-alert/buttons-alert.component';
import { AlertsComponent } from './components/alerts/alerts.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'buttonAlert', component: ButtonsAlertComponent, canActivate: [AuthGuard] },
  { path: 'alerts', component: AlertsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
