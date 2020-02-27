import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Camera, PictureSourceType } from '@ionic-native/camera/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  selectedImage: string;
  imageText: string;

  constructor( public actionSheetController: ActionSheetController, private camera: Camera) {}

  async selectSource() {    
    const actionSheet = await this.actionSheetController.create({
      header: 'Modo captura Foto',
      cssClass: 'action-sheets-groups-page',
      buttons: [{
        text: 'Galeria',
        icon: 'albums',
        handler: () => {
          this.getPicture(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      }, 
      {
        text: 'Câmera',
        icon: 'camera',
        handler: () => {
          this.getPicture(this.camera.PictureSourceType.CAMERA);
        }
      }, 
      {
        text: 'Cancelar',
        icon: 'close-circle',
        role: 'cancel',
        cssClass: 'EditionIcon'
      }]
    });
    await actionSheet.present();
  }

  getPicture(sourceType: PictureSourceType) {
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: sourceType,
      allowEdit: true,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }).then((imageData) => {
      this.selectedImage = `data:image/jpeg;base64,${imageData}`;
    });
  }
}
