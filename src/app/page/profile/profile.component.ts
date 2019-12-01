import { Component } from "@angular/core";

import { AthuService } from "src/app/providers/auth.service";
import { profile } from "src/app/providers/type-object";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent {
  public infoprofile: FormGroup;
  public user: profile;
  name: any;
  prenom: any;
  fullname: any;
  constructor(
    public formBuilder: FormBuilder,

    private athu: AthuService,
    private router: Router
  ) {
    this.user = athu.infouser();
    this.slicefullname();

    this.infoprofile = formBuilder.group({
      name: [this.name],
      prenom: [this.prenom],

      email: [
        this.user.email,
        Validators.compose([Validators.required, Validators.email])
      ],
      password: ["", Validators.compose([Validators.required])],
      npassword: ""
    });
  }

  slicefullname() {
    this.fullname = this.user.name.split(" ");
    if (this.fullname.length == 2) {
      this.name = this.fullname[0];
      this.prenom = this.fullname[1];
    } else {
      this.name = this.user.name;
      this.prenom = "";
    }
  }

  routpage(url) {
    this.router.navigate([url]);
  }

  modifyProfile(): void {
    if (!this.infoprofile.valid) {
      console.log(this.infoprofile.value);
      return;
    }

    this.athu.modifyProfile(this.infoprofile.value);
  }
}
