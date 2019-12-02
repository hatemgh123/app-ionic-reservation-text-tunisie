import { Injectable } from "@angular/core";

import { Observable } from "rxjs";

import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree
} from "@angular/router";

import { AthuService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class AthuadminGuard implements CanActivate {
  constructor(private router: Router, private Athu: AthuService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean | UrlTree {
    return new Promise(resolve => {
      this.Athu.authState.subscribe(auth => {
        if (auth) resolve(true);
        else this.router.navigate(["login"]);
      });
    });
  }
}
