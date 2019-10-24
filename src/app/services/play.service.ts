import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Play } from '../models/play';
import { Observable, from } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Card } from '../models/card';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class PlayService {
  private playCollection: AngularFirestoreCollection<Play>;
  plays: Observable<Play[]>;
  constructor(
    private afs: AngularFirestore,
    private authService: AuthService,
    private router: Router, 
    private route: ActivatedRoute,
  ) { 
    this.playCollection = afs.collection<Play>('plays');
    this.plays = this.playCollection.valueChanges();
  }
  public initPlayTrack(trackId: string) {
    const userData = this.authService.getUserDataORNull();
    
    if(!userData){ return ; }

    // this.afs.doc(`plays`).set({},{ merge: true });
    const play: Play = {
      // type: PlayStatusType.track,
      trackId: trackId,
      author: userData.uid,
      createdAt: new Date().getTime()
    };
    return this.afs.doc(`plays/${trackId}`).set(play, {merge: true})
      .then(() => {
        // ref.set({id: ref.id}, {merge: true});
        this.router.navigate([`/v/${trackId}`], { relativeTo: this.route });
        return true;
      })
      .catch(err => {
        return false;
      });
  }
  public getMyPlayTrack(trackId: string) {
    const userData = this.authService.getUserDataORNull();
    
    if(!userData){ return ; }

    return this.plays.pipe(
      map((plays: Play[]) => plays.find(play => play.trackId === trackId && play.author === userData.uid))
    );
  }
  public pickCard(card: Card, play: Play, cardIndex: number) {
    // const obj: any = {};
    if(play.pickList.length===2){
      return ;
    }

    play.pickList.shift();
    play.pickList.shift();
    play.pickList.push(cardIndex);
    
    play.nowRound += 1;

    return this.afs.doc(`plays/${play.trackId}`).update({
      pickList: play.pickList,
      nowRound: play.nowRound
    });
  }
}
