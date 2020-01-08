import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { LoginComponent } from "./page/login/login.component";
import { SignupComponent } from "./page/signup/signup.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireFunctionsModule } from "@angular/fire/functions";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from "../environments/environment";
import { HomeComponent } from "./page/client/home/home.component";
import { MenuclientComponent } from "./page/client/menuclient/menuclient.component";
import { ProfileComponent } from "./page/profile/profile.component";
import { HistoryComponent } from "./page/client/history/history.component";
import { PageNotFoundComponent } from "./page/page-not-found/page-not-found.component";
import { ListreservationComponent } from "./page/client/listreservation/listreservation.component";
import { ListedevoyageComponent } from "./page/chauffeur/listedevoyage/listedevoyage.component";
import { HistorychComponent } from "./page/chauffeur/historych/historych.component";
import { ProfilechComponent } from "./page/chauffeur/profilech/profilech.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    MenuclientComponent,
    ProfileComponent,
    HistoryComponent,
    PageNotFoundComponent,
    ListreservationComponent,
    ProfilechComponent,
    ListedevoyageComponent,
    HistorychComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, "taxitn"),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AngularFireFunctionsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
