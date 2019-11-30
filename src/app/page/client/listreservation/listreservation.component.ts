import { Component, OnInit } from "@angular/core";
import { RouteappService } from "src/app/providers/routeapp.service";
import { ClientprovidersService } from "src/app/providers/clientproviders.service";
import { reservation } from "src/app/providers/type-object";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
@Component({
  selector: "app-listreservation",
  templateUrl: "./listreservation.component.html",
  styleUrls: ["./listreservation.component.scss"]
})
export class ListreservationComponent implements OnInit {
  public listereservation$: Observable<reservation[]> = null;
  constructor(
    private rt: RouteappService,
    private cprovider: ClientprovidersService,
    private router: Router
  ) {
    this.listereservation$ = this.cprovider.listereservation;
  }

  ngOnInit() {}
  routpage(url) {
    this.rt.routpage([url]);
  }
  ajoute() {
    this.router.navigate(["/client/ajoute"]);
  }
}
