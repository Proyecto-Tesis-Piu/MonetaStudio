import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Subscription } from 'rxjs';
import { SnackBarService } from '../Shared/Snackbar/snack-bar.service';
import { UserService } from '../Users/shared/user.service';
import { Feedback } from './feedback.model'

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent {

  feedback: Feedback;
  token: string;
  tokenSubscription: Subscription;

  constructor(
    public dialogRef: MatDialogRef<ContactusComponent>,
    private service: UserService,
    protected storageMap: StorageMap,
    private snack: SnackBarService) {

    this.tokenSubscription = this.storageMap.watch('token', { type: 'string' }).subscribe((data: string) => {
      this.token = data;
      //console.log("navbar token update: " + data);
    });
    this.feedback = new Feedback();
  }

  updateForm(value: string, property: string) {
    this.feedback[property] = value;
    console.log(this.feedback);
  }

  submitFeedback() {
    this.service.submitFeedback(this.feedback, this.token).subscribe(
      res => {
        //console.log(res);
        this.snack.show('Gracias por tus comentarios, los tomaremos en cuenta.', 'Cerrar');
      },
      err => {
        this.snack.show('Se presentó un error al subir tus comentarios. Intentalo de nuevo', 'Cerrar');
        console.log(err);
      },
      () => { });
  }
}
