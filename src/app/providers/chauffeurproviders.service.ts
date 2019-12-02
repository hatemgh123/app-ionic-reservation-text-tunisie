import { Injectable } from "@angular/core";
import { reservation } from "./type-object";
import { ToastController } from "@ionic/angular";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { AthuService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class ChauffeurprovidersService {
  private itemsCollection: AngularFirestoreCollection<reservation>;
  private demondedeChauffeurCollection: AngularFirestoreCollection<any>;
  listereservation: Observable<reservation[]>;
  listedemondedeChauffeur: Observable<any[]>;

  public iduser: string;
  constructor(
    private db: AngularFirestore,
    public toastController: ToastController,
    private athus: AthuService,
    private router: Router
  ) {
    this.iduser = this.athus.checkiduser();
    this.demondedeChauffeurCollection = db.collection<any>(
      "demondedeChauffeur",
      ref => ref.where("idChauffeur", "==", this.iduser)
    );
    this.itemsCollection = db.collection<reservation>("reservation");
    this.listereservation = this.getAllDocs();
    this.listedemondedeChauffeur = this.getAllDocsdemonde();
  }
  getAllDocsdemonde() {
    const ref = this.db.collection<any>("demondedeChauffeur", ref =>
      ref.where("idChauffeur", "==", this.iduser)
    );
    return ref.valueChanges({ idField: "customIdName" });
  }
  getAllDocs() {
    const ref = this.db.collection<reservation>("reservation");
    return ref.valueChanges({ idField: "customIdName" });
  }
  getAllDocschu() {
    const ref = this.db.collection<any>("demondedeChauffeur");
    return ref.valueChanges({ idField: "customIdName" });
  }
  ajoutereservation(res: reservation) {
    this.itemsCollection.add(res);
    this.showSuccess("la reservation il été ajoute");
    this.router.navigate(["/home"]);
  }

  async showSuccess(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
  invite(iddemonde, namedChauffeur, idChauffeur, idclient, dp, ar) {
    var currDate = new Date();
    let demonde = {
      iddemonde,
      namedChauffeur,
      idChauffeur,
      currDate,
      stats: "en attente",
      idclient: idclient,
      dp,
      ar
    };
    /*    this.demondedeChauffeurCollection.add(demonde); */

    const starPath = `demondedeChauffeur/${idChauffeur}_${iddemonde}`;

    this.db.doc(starPath).set(demonde);
    this.showSuccess("la demande a été envoye");

    /*  this.router.navigate(["/home"]); */
  }
  deleteinvite(iddemonde) {
    this.db
      .collection("demondedeChauffeur")
      .doc(iddemonde)
      .delete()
      .then(() => {
        this.showSuccess("la demande a été supprime");
      })
      .catch(error => {
        console.error("Error removing document: ", error);
      });
  }

  confirmedemonde(idderes, iddemondedechoffeur) {
    const reservation = `reservation/${idderes}`;
    const demondechef = `demondedeChauffeur/${iddemondedechoffeur}`;
    let stats = {
      stats: "compléter"
    };
    this.db.doc(demondechef).update(stats);
    this.db.doc(reservation).update(stats);
    this.showSuccess("la demande a été accepte");
  }
}
