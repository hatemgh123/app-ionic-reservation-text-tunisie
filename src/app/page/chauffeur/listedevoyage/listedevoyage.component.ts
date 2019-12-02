import { ClientprovidersService } from "src/app/providers/clientproviders.service";
import { reservation, profile } from "src/app/providers/type-object";
import { Observable } from "rxjs";

import { Router } from "@angular/router";
import { AthuService } from "src/app/providers/auth.service";

import { Component, OnInit } from "@angular/core";
import { ChauffeurprovidersService } from "src/app/providers/chauffeurproviders.service";
import { AlertController } from "@ionic/angular";
@Component({
  selector: "app-listedevoyage",
  templateUrl: "./listedevoyage.component.html",
  styleUrls: ["./listedevoyage.component.scss"]
})
export class ListedevoyageComponent implements OnInit {
  public listereservation$: Observable<reservation[]> = null;
  public listedemondedeChauffeur$: Observable<any[]> = null;
  public user: profile;
  public iduser: string;
  constructor(
    private cprovider: ClientprovidersService,
    private router: Router,
    private athu: AthuService,
    private chprovider: ChauffeurprovidersService,
    public alertController: AlertController
  ) {
    this.user = athu.infouser();
    this.iduser = athu.checkiduser();
    this.listereservation$ = this.cprovider.listereservation;
    this.listedemondedeChauffeur$ = this.chprovider.listedemondedeChauffeur;
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
  invite(iddemonde, idclient, dp, ar) {
    this.chprovider.invite(
      iddemonde,
      this.user.name,
      this.iduser,
      idclient,
      dp,
      ar
    );
  }

  deleteinvite(iddemonde) {
    this.chprovider.deleteinvite(iddemonde);
  }
  dataLength(data: any[]) {
    console.log(data);
    return data.length > 0 ? true : false;
  }
  async presentAlertConfirm(iddemonde, idclient, dp, ar) {
    const alert = await this.alertController.create({
      header: "Confirm!",
      message: "Message <strong>text</strong>!!!",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: blah => {
            console.log("Confirm Cancel: blah");
          }
        },
        {
          text: "Okay",
          handler: () => {
            this.invite(iddemonde, idclient, dp, ar);
          }
        }
      ]
    });

    await alert.present();
  }
}
