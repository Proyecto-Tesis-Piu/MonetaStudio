import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { VideoSavioComponent } from './Components/home/video-savio/video-savio.component';
import { RegistrationComponent } from './Components/Users/registration/registration.component';
import { LoginDialogComponent } from './Components/Users/login/login.component';
import { UserComponent } from './Components/Users/user.component';
import { UserService } from './Components/Users/shared/user.service';
import { AuthGuard } from './Components/Users/shared/auth.guard';
import { TransactionsComponent } from './Components/Transactions/transactions.component';
import { NewTransactionComponent } from './Components/Transactions/new-transaction/new-transaction.component';

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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { TransactionService } from './Components/Transactions/transactions.service';
import { MatTreeModule} from '@angular/material/tree';
import { VideoSavioComponent } from './Components/home/video-savio/video-savio.component';
import { TransactionService } from './Components/Transactions/transactions.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginDialogComponent,
    RegistrationComponent,
    TransactionsComponent,
    UserComponent,
    VideoSavioComponent,
    NewTransactionComponent,
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
    MatTreeModule
  ],
  providers: [UserService, AuthGuard, TransactionService],

  bootstrap: [AppComponent]
})
export class AppModule { }
