import { Component } from "@angular/core";
import { ActionSheetController } from "@ionic/angular";
import { Camera, PictureSourceType } from "@ionic-native/camera/ngx";
import { OCR, OCRSourceType, OCRResult } from "@ionic-native/ocr/ngx";
import { WebView } from "@ionic-native/ionic-webview/ngx";
import {
  LoadingController,
  ToastController,
  AlertController,
} from "@ionic/angular";

@Component({
  selector: "app-byionic",
  templateUrl: "./byionic.page.html",
  styleUrls: ["./byionic.page.scss"],
})
export class ByionicPage {
  selectedImage = "";
  imageText: string;
  sourceImage: string;
  image: string;

  constructor(
    public actionSheetController: ActionSheetController,
    private camera: Camera,
    private ocr: OCR,
    private webview: WebView,
    private loadingController: LoadingController,
    private toastController: ToastController,
    public alertController: AlertController
  ) {}

  async selectSource() {
    const actionSheet = await this.actionSheetController.create({
      header: "Modo captura Foto",
      cssClass: "action-sheets-groups-page",
      buttons: [
        {
          text: "Galeria",
          icon: "albums",
          handler: () => {
            this.getPicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          },
        },
        {
          text: "Câmera",
          icon: "camera",
          handler: () => {
            this.getPicture(this.camera.PictureSourceType.CAMERA);
          },
        },
        {
          text: "Cancelar",
          icon: "close-circle",
          role: "cancel",
          cssClass: "EditionIcon",
        },
      ],
    });
    await actionSheet.present();
  }

  getPicture(sourceType: PictureSourceType) {
    this.camera
      .getPicture({
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        sourceType: sourceType,
        saveToPhotoAlbum: true,
        correctOrientation: true,
      })
      .then((imageData) => {
        //this.selectedImage = `data:image/jpeg;base64,${imageData}`;
        this.selectedImage = imageData;

        this.sourceImage = this.webview.convertFileSrc(imageData);
      });
  }

  async recognizeImage() {
    const loading = await this.loadingController.create({
      message: "Extraindo texto...",
    });
    await loading.present();
    console.log(this.selectedImage);
    this.ocr
      .recText(OCRSourceType.NORMFILEURL, this.selectedImage)
      .then((res: OCRResult) => {
        loading.dismiss();
        this.presentAlert(JSON.stringify(res.lines.linetext));
      })
      .catch((error: any) => {
        loading.dismiss();
        this.presentToast("Erro ao fazer a requisição");
      });
  }

  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: "bottom",
      duration: 3000,
      color: "danger",
    });
    toast.present();
  }

  async presentAlert(text) {
    const alert = await this.alertController.create({
      header: "Texto extraído",
      message: text,
      buttons: ["OK"],
    });

    await alert.present();
  }
}
