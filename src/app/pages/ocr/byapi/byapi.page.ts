import { Component } from "@angular/core";
import { ActionSheetController } from "@ionic/angular";
import { Camera, PictureSourceType } from "@ionic-native/camera/ngx";
import { OCR, OCRSourceType, OCRResult } from "@ionic-native/ocr/ngx";
import { WebView } from "@ionic-native/ionic-webview/ngx";
import { HttpClient } from "@angular/common/http";

import { File, FileEntry } from "@ionic-native/file/ngx";
import { FilePath } from "@ionic-native/file-path/ngx";
import { of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import {
  LoadingController,
  ToastController,
  AlertController,
} from "@ionic/angular";

@Component({
  selector: "app-byapi",
  templateUrl: "./byapi.page.html",
  styleUrls: ["./byapi.page.scss"],
})
export class ByapiPage {
  selectedImage = "";
  imageText: string;
  sourceImage: string;
  image: string;
  test: string;

  constructor(
    public actionSheetController: ActionSheetController,
    private camera: Camera,
    private webview: WebView,
    private file: File,
    private http: HttpClient,
    private filePath: FilePath,
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
        destinationType: this.camera.DestinationType.NATIVE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        sourceType: sourceType,
        saveToPhotoAlbum: true,
        correctOrientation: true,
      })
      .then((imageData) => {
        //this.selectedImage = `data:image/jpeg;base64,${imageData}`;
        this.selectedImage = imageData;
        this.filePath.resolveNativePath(imageData).then((t) => {
          console.log(t);
          this.test = t;
        });

        this.sourceImage = this.webview.convertFileSrc(imageData);
      });
  }

  recognizeImage() {
    //this.imageText
    console.log(this.selectedImage);
    this.teste();
  }

  teste() {
    this.file
      .resolveLocalFilesystemUrl(this.test)
      .then((entry) => {
        (<FileEntry>entry).file((file) => this.readFile(file));
      })
      .catch((err) => {
        this.presentToast("Erro ao carregar imagem");
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

  readFile(file: any) {
    const reader = new FileReader();
    reader.onload = () => {
      const formData = new FormData();
      const imgBlob = new Blob([reader.result], {
        type: file.type,
      });
      formData.append("image", imgBlob, file.name);
      this.uploadImageData(formData);
    };
    reader.readAsArrayBuffer(file);
  }

  async uploadImageData(formData: FormData) {
    const loading = await this.loadingController.create({
      message: "Extraindo texto...",
    });
    await loading.present();
    await this.http
      .post("https://a-definir.herokuapp.com/ocr", formData)
      .toPromise()
      .then((res: any) => {
        loading.dismiss();
        console.log(res.text);
        this.presentAlert(res.text);
      })
      .catch(() => {
        loading.dismiss();
        this.presentToast("Erro ao fazer a requisição");
      });
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
