import { Component, OnInit } from "@angular/core";
import { RouteappService } from "src/app/providers/routeapp.service";
import { ClientprovidersService } from "src/app/providers/clientproviders.service";
import { reservation } from "src/app/providers/type-object";
import { Observable } from "rxjs";

@Component({
  selector: "app-history",
  templateUrl: "./history.component.html",
  styleUrls: ["./history.component.scss"]
})
export class HistoryComponent implements OnInit {
  public listereservation$: Observable<reservation[]> = null;
  constructor(
    private rt: RouteappService,
    private cprovider: ClientprovidersService
  ) {
    this.listereservation$ = this.cprovider.listereservation;
  }

  ngOnInit() {}
  routpage(url) {
    this.rt.routpage([url]);
  }
}
