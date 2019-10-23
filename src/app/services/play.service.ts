import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Play } from '../models/play';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

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
    private route: ActivatedRoute
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
}
