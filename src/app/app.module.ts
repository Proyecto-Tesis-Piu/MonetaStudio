//Core
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

//Third parties
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartsModule, WavesModule } from 'angular-bootstrap-md';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';

//Modules
import { AppRoutingModule } from './app-routing.module';

//Components
import { AppComponent } from './app.component';
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
import { HttpClientModule } from "@angular/common/http";
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog'
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatTreeModule } from '@angular/material/tree';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';

const fbLoginOptions = {
  scope: 'user_birthday,user_hometown,user_location,user_gender,user_age_range,email,public_profile',
  //return_scopes: true,
  //enable_profile_selector: true,
  fields: 'email,first_name,name,id,last_name,age_range,birthday,gender,hometown,location,middle_name,picture.type(large)',
  accessToken: '79e1498519972262ac9e10464fc4e933',
  locale: 'es_MX',
  version: 'v9.0'
};

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
    SocialLoginModule
  ],
  providers: [
    UserService,
    AuthGuard,
    TransactionService,
    ArticlesService,
    SnackBarService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('clientId')
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('881655689304922', fbLoginOptions)
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
