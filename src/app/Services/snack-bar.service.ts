import { Injectable, OnDestroy } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { Subject, Subscription } from 'rxjs';

export class SnackBarMessage {
  message: string;
  action: string = null;
  config: MatSnackBarConfig = null;
}

@Injectable({
  providedIn: 'root'
})
export class SnackBarService implements OnDestroy {
  private messageQueue: Array<any> = Array<any>();
  private subscription: Subscription;
  private snackBarRef: MatSnackBarRef<SimpleSnackBar>;
  private isInstanceVisible = false;


  constructor(public snackBar: MatSnackBar) { }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * Add a message
   * @param message The message to show in the snackbar.
   * @param action The label for the snackbar action.
   * @param config Additional configuration options for the snackbar.
   */
  show(message: string, action?: string, config?: MatSnackBarConfig, classOverride?: string): void {

    if (!config) {
      config = new MatSnackBarConfig();
      config.duration = 5000;
      config.verticalPosition = 'bottom';
      config.horizontalPosition = 'center';
      if (classOverride) {
        config.panelClass = [classOverride];
      }
    }

    let sbMessage = new SnackBarMessage();
    sbMessage.message = message;
    sbMessage.action = action;
    sbMessage.config = config;

    this.messageQueue.push(sbMessage);

    if (!this.isInstanceVisible) {
      this.showNext();
    }
  }

  private showNext() {
    if (this.messageQueue.length === 0) {
      return;
    }

    const message = this.messageQueue.shift();
    this.isInstanceVisible = true;

    this.snackBarRef = this.snackBar.open(
      message.message,
      message.action,
      message.config
    );

    this.snackBarRef.afterDismissed().subscribe(() => {
      this.isInstanceVisible = false;
      this.showNext();
    });
  }

  public isVisible(){
    return this.isInstanceVisible;
  }

  public dismiss(){
    if(this.isInstanceVisible)
      this.snackBarRef.dismiss();
  }

  public getMessage(){
    return this.messageQueue[0];
  }
}