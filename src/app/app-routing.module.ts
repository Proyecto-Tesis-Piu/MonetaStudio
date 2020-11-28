import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Components/home/home.component'
import { TransactionsComponent } from './Components/Transactions/transactions.component';
import { AuthGuard } from './Components/Users/shared/auth.guard';
import { NewsComponent } from './Components/new/News/news.component';
import { NewComponent } from './Components/new/New/new.component';
import { AboutusComponent } from './Components/aboutus/aboutus.component';
import { ConfirmMailComponent } from "./Components/Users/confirm-mail/confirm-mail.component";
import { UserComponent } from './Components/Users/user.component';

const routes: Routes = [
  {path:'home', component: HomeComponent },
  //{path:'user', component: UserComponent, children: [
    {path:'user/ConfirmMail/:t', component: ConfirmMailComponent },
    //{path:'create', component: RegistrationComponent },
  //]},

  //{path: 'User/ConfirmMail/:t', component: ConfirmMailComponent},
  {path: 'news', component: NewsComponent},
  {path: 'news/new/:i', component: NewComponent},
  {path: 'aboutus', component: AboutusComponent},
  {
    path:'transactions', component: TransactionsComponent, 
    canActivate: [AuthGuard], runGuardsAndResolvers: 'always'
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
