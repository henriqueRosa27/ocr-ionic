import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { Camera } from "@ionic-native/camera/ngx";
import { OCR } from "@ionic-native/ocr/ngx";
import { WebView } from "@ionic-native/ionic-webview/ngx";

import { ByionicPageRoutingModule } from "./byionic-routing.module";

import { ByionicPage } from "./byionic.page";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ByionicPageRoutingModule],
  providers: [Camera, OCR, WebView],
  declarations: [ByionicPage],
})
export class ByionicPageModule {}
