import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./page/login/login.component";
import { SignupComponent } from "./page/signup/signup.component";
import { HomeComponent } from "./page/client/home/home.component";
import { ProfileComponent } from "./page/profile/profile.component";
import { HistoryComponent } from "./page/client/history/history.component";
import { AuthGuard } from "./providers/auth.guard";
import { PageNotFoundComponent } from "./page/page-not-found/page-not-found.component";
import { ListreservationComponent } from "./page/client/listreservation/listreservation.component";
import { ListedevoyageComponent } from "./page/chauffeur/listedevoyage/listedevoyage.component";
import { HistorychComponent } from "./page/chauffeur/historych/historych.component";
import { ProfilechComponent } from "./page/chauffeur/profilech/profilech.component";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },

  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },

  {
    path: "client",

    canActivate: [AuthGuard],
    children: [
      { path: "home", component: ListreservationComponent },
      { path: "profile", component: ProfileComponent },
      { path: "ajoute", component: HomeComponent },
      { path: "histoire", component: HistoryComponent },
      { path: "**", component: PageNotFoundComponent }
    ]
  },
  {
    path: "chauffeur",

    canActivate: [AuthGuard],
    children: [
      { path: "home", component: ListedevoyageComponent },
      { path: "profile", component: ProfilechComponent },
      { path: "ajoute", component: HomeComponent },
      { path: "histoire", component: HistorychComponent },

      { path: "**", component: PageNotFoundComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
