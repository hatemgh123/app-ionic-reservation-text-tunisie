import { Component, OnInit } from "@angular/core";

import { reservation, profile } from "src/app/providers/type-object";
import { Observable } from "rxjs";
import { AthuService } from "src/app/providers/auth.service";
import { Router } from "@angular/router";
import { ChauffeurprovidersService } from "src/app/providers/chauffeurproviders.service";
@Component({
  selector: "app-historych",
  templateUrl: "./historych.component.html",
  styleUrls: ["./historych.component.scss"]
})
export class HistorychComponent implements OnInit {
  public listereservation$: Observable<reservation[]> = null;
  public user: profile;
  public iduser: string;
  public listedemondedeChauffeur$: Observable<any[]> = null;
  constructor(
    private athu: AthuService,
    private router: Router,
    private chprovider: ChauffeurprovidersService
  ) {
    this.listereservation$ = this.chprovider.listereservation;
    this.user = athu.infouser();
    this.iduser = athu.checkiduser();
    this.listedemondedeChauffeur$ = this.chprovider.listedemondedeChauffeur;
  }

  ngOnInit() {}
  routpage(url) {
    this.router.navigate([url]);
  }
  logout() {
    this.athu.logout();
  }
}
