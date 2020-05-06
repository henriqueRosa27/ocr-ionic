import { Component } from "@angular/core";
import { ActionSheetController } from "@ionic/angular";
import { Camera, PictureSourceType } from "@ionic-native/camera/ngx";
import { OCR, OCRSourceType, OCRResult } from "@ionic-native/ocr/ngx";
import { WebView } from "@ionic-native/ionic-webview/ngx";

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
    private webview: WebView
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

  recognizeImage() {
    console.log(this.selectedImage);
    this.ocr
      .recText(OCRSourceType.NORMFILEURL, this.selectedImage)
      .then(
        (res: OCRResult) =>
          (this.imageText = JSON.stringify(res.lines.linetext))
      )
      .catch((error: any) => console.error(error));
  }
}
