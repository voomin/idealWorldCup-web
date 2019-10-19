import { Injectable } from '@angular/core';
import { Card } from '../models/card';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Upload } from '../models/upload';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private cardsCollection: AngularFirestoreCollection<Card>;
  cards: Observable<Card[]>;
  constructor(
    private afs: AngularFirestore,
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
        console.log(`card Id : ${cardId}`);
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
              ref.set({id: cardId, photoURL: imageUrl}, {merge: true});
            });
          }
        );
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }
  deleteCard(cardId: string) {
    return this.afs.doc(`cards/${cardId}`).delete()
      .then(() => { 
        firebase.storage().ref(`cards/${cardId}`).delete()
        .then(() => {
          console.log('이미지와 카드정보 삭제 완료');
        });
      })
      .catch((err) => { alert(err); })
      .finally(() => { });
  }
  updateCardTitle(cardId: string, title: string){
    return this.afs.doc(`cards/${cardId}`).update({title : title})
    .then(() => { console.log('카드제목 바꾸기 성공'); })
    .catch((err) => { console.log(err); })
    .finally(() => { });
  }
  public getCardsinATrack(trackId: string){
    return this.cards.pipe(
      map((cards: Card[]) => cards.filter(card => card.trackId === trackId))
      );
  }
  public getPlayCards(trackId: string) {
  }
  private mix(oldArr: Card[]) {
    let newArr = [];
    const random = (max: number) => Math.floor(Math.random() * max);
    while(oldArr.length !== 0) {
      const obj = oldArr.splice(random(oldArr.length), 1)[0];
      newArr.push(obj);
    }
    return newArr;
  }

}
