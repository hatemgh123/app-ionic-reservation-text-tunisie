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
import { profile } from "./type-object";
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

  emailLogin(form) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(form.email, form.password)
      .then(user => {
        this.showSuccess("Your settings have been saved.");
        this.router.navigate(["/home"]);
      })
      .catch(error => this.showSuccess("error !"));
  }
  checkiduser() {
    return this.afAuth.auth.currentUser.uid;
    /// this.authState.subscribe(auth => console.log(auth.getInstance().getCurrentUser().getUid()));
  }
  infouser(): profile {
    /*     let profiles: profile;
    if ( this.afAuth.auth.currentUser != null) {
      profiles.displayName =  this.afAuth.auth.currentUser.displayName;
      profiles.email =  this.afAuth.auth.currentUser.email;
      profiles.photoUrl =  this.afAuth.auth.currentUser.photoURL;
      profiles.emailVerified =  this.afAuth.auth.currentUser.emailVerified;
      profiles.uid =  this.afAuth.auth.currentUser.uid;
      // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
    } */
    var name: string,
      email: string,
      photoUrl: string,
      uid: string,
      emailVerified: boolean;

    if (this.afAuth.auth.currentUser != null) {
      name = this.afAuth.auth.currentUser.displayName;
      email = this.afAuth.auth.currentUser.email;
      photoUrl = this.afAuth.auth.currentUser.photoURL;
      emailVerified = this.afAuth.auth.currentUser.emailVerified;
      uid = this.afAuth.auth.currentUser.uid; // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
    }

    return { name, email, photoUrl, uid, emailVerified };
  }
  modifyProfile(profileinfo) {
    let justadd = 0;
    this.afAuth.auth
      .signInWithEmailAndPassword(
        this.afAuth.auth.currentUser.email,
        profileinfo.password
      )
      .then(userCredential => {
        if (profileinfo.email != userCredential.user.email) {
          userCredential.user.updateEmail(profileinfo.email);
          justadd++;
          console.log("updateEmail");
        }

        if (
          profileinfo.name + " " + profileinfo.prenom !=
          userCredential.user.displayName
        ) {
          userCredential.user.updateProfile({
            displayName: profileinfo.name + " " + profileinfo.prenom
          });
          justadd++;
          console.log("updateProfile");
        }
        if (profileinfo.npassword != null || profileinfo.npassword != " ")
          if (profileinfo.npassword.length > 6) {
            userCredential.user.updatePassword(profileinfo.npassword);
            justadd++;
            console.log("updatePassword");
          }
        if (justadd > 0) {
          this.showSuccess("le information  modifiée avec succes");
        } else this.showSuccess("aucune  modifiction");
      })
      .catch(error => {
        this.showSuccess(error);
      });
  }
}
