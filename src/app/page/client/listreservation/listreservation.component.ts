import { Component, OnInit } from "@angular/core";

import { ClientprovidersService } from "src/app/providers/clientproviders.service";
import { reservation, profile } from "src/app/providers/type-object";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { AthuService } from "src/app/providers/auth.service";

@Component({
  selector: "app-listreservation",
  templateUrl: "./listreservation.component.html",
  styleUrls: ["./listreservation.component.scss"]
})
export class ListreservationComponent implements OnInit {
  public listereservation$: Observable<reservation[]> = null;
  public user: profile;
  constructor(
    private cprovider: ClientprovidersService,
    private router: Router,
    private athu: AthuService
  ) {
    this.user = athu.infouser();
    this.listereservation$ = this.cprovider.listereservation;
  }

  ngOnInit() {}
  routpage(url) {
    this.router.navigate([url]);
  }
  ajoute() {
    this.router.navigate(["/client/ajoute"]);
  }
}
