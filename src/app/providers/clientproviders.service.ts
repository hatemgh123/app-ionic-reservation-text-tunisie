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

@Injectable({
  providedIn: "root"
})
export class ClientprovidersService {
  private itemsCollection: AngularFirestoreCollection<reservation>;
  listereservation: Observable<reservation[]>;
  constructor(
    private db: AngularFirestore,
    public toastController: ToastController,
    private router: Router
  ) {
    this.itemsCollection = db.collection<reservation>("reservation");
    this.listereservation = db
      .collection<reservation>("reservation")
      .valueChanges();
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
}
