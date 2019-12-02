import { Component } from "@angular/core";

import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { ClientprovidersService } from "src/app/providers/clientproviders.service";
import { AthuService } from "src/app/providers/auth.service";
import { Router } from "@angular/router";
import { profile } from "src/app/providers/type-object";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent {
  public ajouteres: FormGroup;
  public user: profile;
  constructor(
    public formBuilder: FormBuilder,
    private cprovider: ClientprovidersService,
    private athu: AthuService,
    private router: Router
  ) {
    this.user = athu.infouser();
    this.ajouteres = formBuilder.group({
      Depart: [
        "",
        Validators.compose([Validators.minLength(4), Validators.required])
      ],
      Arrivee: [
        "",
        Validators.compose([Validators.minLength(4), Validators.required])
      ],
      date: [new Date(), Validators.compose([Validators.required])],
      heure: ["10h00", Validators.compose([Validators.required])],
      nbpersonne: ["", Validators.compose([Validators.required])],
      typereservation: ["", Validators.compose([Validators.required])],
      commentaire: [""],
      stats: ["en attente"],
      iduser: [athu.checkiduser()]
    });
  }

  routpage(url) {
    this.router.navigate([url]);
  }

  ajoutereservation() {
    // stop here if form is invalid
    if (this.ajouteres.invalid) {
      return;
    }
    this.cprovider.ajoutereservation(this.ajouteres.value);

    ///  alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
  }
  logout() {
    this.athu.logout();
  }
}
