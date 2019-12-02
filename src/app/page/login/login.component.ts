import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { AngularFirestore } from "@angular/fire/firestore";

import { AthuService } from "src/app/providers/auth.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    db: AngularFirestore,
    private AthuService: AthuService,
    private router: Router
  ) {
    this.loginForm = formBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: [
        "",
        Validators.compose([Validators.minLength(6), Validators.required])
      ]
    });
  }

  ngOnInit() {}

  loginUser(): void {
    if (!this.loginForm.valid) {
      console.log(this.loginForm.value);
      return;
    }

    this.AthuService.emailLogin(this.loginForm.value);
  }
  signup() {
    this.router.navigate(["/signup"]);
  }
}
