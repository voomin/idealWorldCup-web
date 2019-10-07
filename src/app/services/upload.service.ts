import { Injectable } from '@angular/core';
import { Upload } from '../models/upload';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private basePath:string = '/cards';
  // uploads: FirebaseListObservable<Upload[]>;

  constructor(
    // private af: AngularFire, 
    // private db: AngularFireDatabase
    ) { }
  
  pushUpload(upload: Upload) {
    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);
    console.log(upload);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
        // upload in progress
        upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      },
      (error) => {
        // upload failed
        console.log(error)
      },
      () => {
        // upload success
        upload.url = uploadTask.snapshot.downloadURL
        upload.name = upload.file.name
        // this.saveFileData(upload)
      }
    );
  }
  
  deleteUpload(upload: Upload) {
    this.deleteFileStorage(upload.name)
    // this.deleteFileData(upload.$key)
    // .then( () => {
    //   this.deleteFileStorage(upload.name)
    // })
    // .catch(error => console.log(error))
  }
  private deleteFileStorage(name:string) {
    let storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete()
  }

}
