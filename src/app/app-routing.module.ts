import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Components/home/home.component'
import { RegistrationComponent } from './Components/Users/registration/registration.component'
import { TransactionsComponent } from './Components/Transactions/transactions.component';
import { AuthGuard } from './Components/Users/shared/auth.guard';
import { UserComponent } from './Components/Users/user.component';

const routes: Routes = [
  {path:'home', component: HomeComponent },
  {path:'user', component: UserComponent, children: [
    {path:'modify', component: RegistrationComponent },
    {path:'create', component: RegistrationComponent },
  ]},
  {
    path:'transactions', component: TransactionsComponent, canActivate: [AuthGuard]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
