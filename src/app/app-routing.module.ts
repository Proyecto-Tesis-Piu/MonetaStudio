import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Components/home/home.component'
import { TransactionsComponent } from './Components/Transactions/transactions.component';
import { AuthGuard } from './shared/auth.guard';
import { ArticlesComponent } from './Components/article/articles/articles.component';
import { ArticleComponent } from './Components/article/article.component';
import { AboutusComponent } from './Components/aboutus/aboutus.component';
import { ConfirmMailComponent } from "./Components/Users/confirm-mail/confirm-mail.component";
//import { UserComponent } from './Components/Users/user.component';
import { ForgotPasswordComponent } from "./Components/Users/forgot-password/forgot-password.component";

const routes: Routes = [
  {path:'home', component: HomeComponent },
  //{path:'user', component: UserComponent, children: [
    {path:'user/ConfirmMail/:t', component: ConfirmMailComponent },
    //{path:'user/ResetPassword/:r', component: ResetPasswordComponent },
    //{path:'create', component: RegistrationComponent },
  //]},

  //{path: 'User/ConfirmMail/:t', component: ConfirmMailComponent},
  {path: 'articles', component: ArticlesComponent},
  {path: 'articles/article/:i', component: ArticleComponent},
  {path: 'aboutus', component: AboutusComponent},
  {path: 'ForgotPassword', component: ForgotPasswordComponent},
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
