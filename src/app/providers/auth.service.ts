import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";

import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { ToastController } from "@ionic/angular";

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
@Injectable({
  providedIn: "root"
})
export class AthuService {
  private SubscribemailCollection: AngularFirestoreCollection<any>;

  authState: Observable<any>;
  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,

    public toastController: ToastController
  ) {
    this.authState = this.afAuth.user;
  }
  async showSuccess(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  /*   .authState.subscribe(auth => {
        this.authState = auth;
      }); */

  // Returns true if user is logged in
  /*   get authenticated(): boolean {
        return this.authState !== null;
      } */

  emailLogin(form) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(form.email, form.password)
      .then(user => {
        this.showSuccess("Your settings have been saved.");
        this.router.navigate(["/home"]);
      })
      .catch(error => this.showSuccess("error !"));
  }
}
