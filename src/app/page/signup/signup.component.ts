import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { AngularFirestore } from "@angular/fire/firestore";

import { AthuService } from "src/app/providers/auth.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignupComponent implements OnInit {
  public signupForm: FormGroup;
  public rolsuser: string = "client";

  constructor(
    public formBuilder: FormBuilder,
    db: AngularFirestore,
    private AthuService: AthuService,
    private router: Router
  ) {
    this.signupForm = formBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      nom: [
        "",
        Validators.compose([Validators.required, Validators.minLength(6)])
      ],
      password: [
        "",
        Validators.compose([Validators.minLength(6), Validators.required])
      ],
      rpassword: [
        "",
        Validators.compose([Validators.minLength(6), Validators.required])
      ]
    });
  }

  ngOnInit() {}

  radioGroupChange(event) {
    this.rolsuser = event.detail.value;
  }

  signup(): void {
    if (!this.signupForm.valid) {
      console.log(this.signupForm.value);
      return;
    }

    this.AthuService.signup(this.signupForm.value, this.rolsuser);
  }
  signin() {
    this.router.navigate(["/login"]);
  }
}
