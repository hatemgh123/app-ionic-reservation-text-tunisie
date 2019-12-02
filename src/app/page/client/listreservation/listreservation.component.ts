import { Component, OnInit } from "@angular/core";

import { ClientprovidersService } from "src/app/providers/clientproviders.service";
import { reservation, profile } from "src/app/providers/type-object";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { AthuService } from "src/app/providers/auth.service";
import { ChauffeurprovidersService } from "src/app/providers/chauffeurproviders.service";
@Component({
  selector: "app-listreservation",
  templateUrl: "./listreservation.component.html",
  styleUrls: ["./listreservation.component.scss"]
})
export class ListreservationComponent implements OnInit {
  public listereservation$: Observable<reservation[]> = null;
  public listedemondedeChauffeur$: Observable<any[]> = null;
  public user: profile;
  public iduser: string;
  constructor(
    private cprovider: ClientprovidersService,
    private router: Router,
    private athu: AthuService,
    private chprovider: ChauffeurprovidersService
  ) {
    this.user = athu.infouser();
    this.iduser = athu.checkiduser();
    this.listereservation$ = this.cprovider.listereservation;
    this.listedemondedeChauffeur$ = this.chprovider.getAllDocschu();
  }

  ngOnInit() {}
  routpage(url) {
    this.router.navigate([url]);
  }
  ajoute() {
    this.router.navigate(["/client/ajoute"]);
  }
  logout() {
    this.athu.logout();
  }
  confirmedemonde(idderes, iddemondedechoffeur) {
    this.chprovider.confirmedemonde(idderes, iddemondedechoffeur);
  }
}
