import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
@Injectable({
  providedIn: "root"
})
export class RouteappService {
  constructor(private router: Router) {}
  routpage(url) {
    this.router.navigate([url]);
  }
}
