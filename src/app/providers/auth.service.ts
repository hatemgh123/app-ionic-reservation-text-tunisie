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
import { FunctionsService } from "./functions.service";

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
    private funs: FunctionsService,

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
  signup(form, rolsuser) {
    if (form.password != form.rpassword) {
      this.showSuccess("votre mot de passe n'est pas le même");
    } else {
      this.afAuth.auth
        .createUserWithEmailAndPassword(form.email, form.password)
        .then(result => {
          if (rolsuser == "chauffeur") {
            this.funs.AddChauffeur(form.email);
          } else {
            this.router.navigate(["client/home"]);
          }
          this.showSuccess("bienvenue sur BanzartToBingerden :)");

          return result.user.updateProfile({
            displayName: form.nom
          });
        })
        .catch(error => {
          this.showSuccess(error);
        });
    }
  }

  emailLogin(form) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(form.email, form.password)
      .then(user => {
        this.showSuccess("Your settings have been saved.");
        this.router.navigate(["client/home"]);
      })
      .catch(error => this.showSuccess("error !"));
  }
  checkiduser() {
    return this.afAuth.auth.currentUser.uid;
    /// this.authState.subscribe(auth => console.log(auth.getInstance().getCurrentUser().getUid()));
  }
  checkAdmin() {
    return this.afAuth.auth.currentUser.getIdTokenResult();
    /// this.authState.subscribe(auth => console.log(auth.getInstance().getCurrentUser().getUid()));
  }
  infouser(): profile {
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

  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(["login"]);
    });
  }
}
