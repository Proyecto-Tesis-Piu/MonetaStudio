//Core
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Third parties
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartsModule, WavesModule } from 'angular-bootstrap-md';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { AuthModule } from '@auth0/auth0-angular';

//Modules
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

//Components
import { HomeComponent } from './Components/home/home.component';
import { VideoTutorialComponent } from './Components/home/video-tutorial/video-tutorial.component';
import { RegistrationComponent } from './Components/Users/registration/registration.component';
import { LoginDialogComponent } from './Components/Users/login/login.component';
import { TransactionsComponent } from './Components/Transactions/transactions.component';
import { NewTransactionComponent } from './Components/Transactions/new-transaction/new-transaction.component';
import { DeleteTransactionComponentDialog } from './Components/Transactions/delete-transaction/delete-transaction.component';
import { ArticlesComponent } from "./Components/article/articles/articles.component";
import { ArticleComponent } from "./Components/article/article.component";
import { CategoriesComponent } from './Components/Transactions/categories/categories.component';
import { IconSelectionDialogComponent } from './Components/Transactions/icon-selection-dialog/icon-selection-dialog.component';
import { ColorSelectionComponent } from './Components/Transactions/color-selection/color-selection.component';
import { AboutusComponent } from './Components/aboutus/aboutus.component';
import { ContactusComponent } from './Components/contactus/contactus.component';
import { NavbarComponent } from "./Components/home/navbar/navbar.component";
import { SidebarComponent } from './Components/Shared/Sidebar/sidebar.component';
import { LegalComponent } from './Components/Users/legal/legal.component';
import { ConfirmMailComponent } from './Components/Users/confirm-mail/confirm-mail.component';
import { ForgotPasswordComponent } from './Components/Users/forgot-password/forgot-password.component';

//Shared
import { AuthGuard } from './shared/auth.guard';

//Services
import { UserService } from './Services/user.service';
import { TransactionService } from './Services/transactions.service';
import { ArticlesService } from "./Services/articles.service";
import { SnackBarService } from './Services/snack-bar.service';

//import { UserSettingsComponent } from './Components/settings/settings.component';
//import { UserComponent } from './Components/Users/user.component';
//import { TreeChecklistExample } from './Components/new/New/tree-checklist-example/tree-checklist-example';

//Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog'
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatTreeModule } from '@angular/material/tree';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginDialogComponent,
    RegistrationComponent,
    TransactionsComponent,
    VideoTutorialComponent,
    NewTransactionComponent,
    ArticleComponent,
    ArticlesComponent,
    DeleteTransactionComponentDialog,
    CategoriesComponent,
    IconSelectionDialogComponent,
    AboutusComponent,
    ContactusComponent,
    NavbarComponent,
    SidebarComponent,
    ColorSelectionComponent,
    LegalComponent,
    ConfirmMailComponent,
    ForgotPasswordComponent,

    //TreeChecklistExample,
    //UserComponent,
    //UserSettingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatTreeModule,
    MatRippleModule,
    ChartsModule,
    WavesModule,
    AngularMyDatePickerModule,
    MatTabsModule,
    MatSlideToggleModule,
    ClipboardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatMenuModule,
    AuthModule.forRoot({
      domain: 'monetastudio.us.auth0.com',
      clientId: 'CSpWV6Y9cZcQMlNsF2sGzxsCdKJ6VbZ1',
      audience: 'https://monetastudio.us.auth0.com/api/v2/'
    }),
  ],
  providers: [
    UserService,
    AuthGuard,
    TransactionService,
    ArticlesService,
    SnackBarService
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
