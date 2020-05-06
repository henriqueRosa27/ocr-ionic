import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { Camera } from "@ionic-native/camera/ngx";
import { OCR } from "@ionic-native/ocr/ngx";
import { WebView } from "@ionic-native/ionic-webview/ngx";

import { ByapiPageRoutingModule } from './byapi-routing.module';

import { ByapiPage } from './byapi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ByapiPageRoutingModule
  ],
  providers: [Camera, OCR, WebView],
  declarations: [ByapiPage]
})
export class ByapiPageModule {}
