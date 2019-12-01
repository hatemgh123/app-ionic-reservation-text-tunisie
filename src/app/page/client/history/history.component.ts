import { Component, OnInit } from "@angular/core";

import { ClientprovidersService } from "src/app/providers/clientproviders.service";
import { reservation, profile } from "src/app/providers/type-object";
import { Observable } from "rxjs";
import { AthuService } from "src/app/providers/auth.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-history",
  templateUrl: "./history.component.html",
  styleUrls: ["./history.component.scss"]
})
export class HistoryComponent implements OnInit {
  public listereservation$: Observable<reservation[]> = null;
  public user: profile;
  constructor(
    private cprovider: ClientprovidersService,
    private athu: AthuService,
    private router: Router
  ) {
    this.listereservation$ = this.cprovider.listereservation;
    this.user = athu.infouser();
  }

  ngOnInit() {}
  routpage(url) {
    this.router.navigate([url]);
  }
}
