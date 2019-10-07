import { Injectable } from '@angular/core';
import { Card } from '../models/card';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Upload } from '../models/upload';
import { UploadService } from './upload.service';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private cardsCollection: AngularFirestoreCollection<Card>;
  cards: Observable<Card[]>;
  constructor(
    private afs: AngularFirestore,
    private uploadService: UploadService
  ) { 
    this.cardsCollection = afs.collection<Card>('cards');
    this.cards = this.cardsCollection.valueChanges();
  }
  public addCard(card: Card, imgFile: Upload) {
    return this.cardsCollection.add(card)
      .then((ref) => {
        const cardId = ref.id;
        const storageRef = firebase.storage().ref();
        const uploadTask = storageRef.child(`cards/${cardId}`).put(imgFile.file);

        return uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot) =>  {
            // upload in progress
            // imgFile.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            ref.set({imgUploadingSize: snapshot.bytesTransferred}, {merge: true});
          },
          (error) => {
            // upload failed
            console.log(error);
            ref.delete();
          },
          () => {
            // upload success
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              const imageUrl = downloadURL;
              ref.set({photoURL: imageUrl}, {merge: true});
            });
          }
        );
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }
  public getCardsinATrack(trackId:string){
    return this.cards.pipe(
      map((cards: Card[]) => cards.filter(card => card.trackId === trackId))
      );
  }

}
