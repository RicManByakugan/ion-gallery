import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.page.html',
  styleUrls: ['./photo.page.scss'],
})
export class PhotoPage {
  photos: Photo[] = [];

  constructor() { }

  ngOnInit() {
  }

  async loadPhotos() {
    // Charger les photos sauvegardées depuis le système de fichiers
    // Vous pouvez ajouter du code ici pour récupérer et afficher les photos sauvegardées
  }

  async takePhoto() {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 90
    });

    this.photos.unshift(photo);

    // Demander la permission pour écrire dans le système de fichiers
    if (Capacitor.isNativePlatform()) {
      const permissions = await Filesystem.requestPermissions();
      if (permissions.publicStorage === 'granted') {
        this.savePhoto(photo);
        console.log("Ok");
      } else {
        console.error('Permission non accordée pour accéder au système de fichiers');
      }
    }
  }

  async savePhoto(photo: Photo) {
    // Convertir l'image en base64
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
    const base64Data = await this.convertBlobToBase64(blob) as string;

    const fileName = new Date().getTime() + '.jpeg';

    try {
      const result = await Filesystem.writeFile({
        path: fileName,
        data: base64Data,
        directory: Directory.Documents
      });

      console.log('Fichier sauvegardé avec succès:', result);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la photo:', error);
    }
  }

  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

}
