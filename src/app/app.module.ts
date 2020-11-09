import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartsModule, WavesModule } from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { VideoTutorialComponent } from './Components/home/video-tutorial/video-tutorial.component';
import { RegistrationComponent } from './Components/Users/registration/registration.component';
import { LoginDialogComponent } from './Components/Users/login/login.component';
import { UserComponent } from './Components/Users/user.component';
import { UserService } from './Components/Users/shared/user.service';
import { AuthGuard } from './Components/Users/shared/auth.guard';
import { TransactionService } from './Components/Transactions/transactions.service';
import { TransactionsComponent } from './Components/Transactions/transactions.component';
import { NewTransactionComponent } from './Components/Transactions/new-transaction/new-transaction.component';
import { DeleteTransactionComponentDialog } from './Components/Transactions/delete-transaction/delete-transaction.component';
import { NewsService } from "./Components/new/service/news.service";
import { NewsComponent } from "./Components/new/News/news.component";
import { NewComponent } from "./Components/new/New/new.component";
//import { TreeChecklistExample } from './Components/new/New/tree-checklist-example/tree-checklist-example';
import { CategoriesComponent } from './Components/Transactions/categories/categories.component';
import { IconSelectionDialogComponent } from './Components/Transactions/icon-selection-dialog/icon-selection-dialog.component';
import { AboutusComponent } from './Components/aboutus/aboutus.component';
import { ContactusComponent } from './Components/contactus/contactus.component';

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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginDialogComponent,
    RegistrationComponent,
    TransactionsComponent,
    UserComponent,
    VideoTutorialComponent,
    NewTransactionComponent,
    NewComponent,
    NewsComponent,
    DeleteTransactionComponentDialog,
    //TreeChecklistExample,
    CategoriesComponent,
    IconSelectionDialogComponent,
    AboutusComponent,
    ContactusComponent,
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
    MatChipsModule
  ],
  providers: [UserService, AuthGuard, TransactionService, NewsService],

  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
