import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { MenuController } from '@ionic/angular';

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public menuCtrl: MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  sendToApi() {
    console.log("sdf")
    this.router.navigate(["ocr/byapi"]);
    this.menuCtrl.close();
  }
  sendToIonic() {
    this.router.navigate(["ocr/byionic"]);
    this.menuCtrl.close();
  }
}
