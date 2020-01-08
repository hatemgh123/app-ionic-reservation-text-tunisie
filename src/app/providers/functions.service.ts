import { Injectable } from "@angular/core";
import { AngularFireFunctions } from "@angular/fire/functions";
import { Router } from "@angular/router";
@Injectable({
  providedIn: "root"
})
export class FunctionsService {
  constructor(private fun: AngularFireFunctions, private router: Router) {}

  AddChauffeur(email) {
    console.log(email);
    const callable = this.fun.httpsCallable("AdAdminRole");
    callable({
      email: email
    }).subscribe(result => {
      console.log(result);
      this.router.navigate(["chauffeur/home"]);
    });
  }
}
