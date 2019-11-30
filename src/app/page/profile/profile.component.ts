import { Component, OnInit } from "@angular/core";
import { RouteappService } from "src/app/providers/routeapp.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  constructor(private rt: RouteappService) {}

  ngOnInit() {}
  routpage(url) {
    this.rt.routpage([url]);
  }
}
