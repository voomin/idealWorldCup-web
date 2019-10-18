import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Track, TrackStatusType } from '../models/track';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbTypeaheadWindow } from '@ng-bootstrap/ng-bootstrap/typeahead/typeahead-window';

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  private tracksCollection: AngularFirestoreCollection<Track>;
  tracks: Observable<Track[]>;
  constructor(
    private afs: AngularFirestore,
    private authService: AuthService,
    private router: Router, 
    private route: ActivatedRoute
  ) { 
    this.tracksCollection = afs.collection<Track>('tracks');
    this.tracks = this.tracksCollection.valueChanges();
  }
  addNewTrack() {
    const userData = this.authService.getUserDataORNull();
    
    if(!userData){ return ; }

    let track: Track = {
      author: userData.uid,
      title: '제목없음',
      info: '',
      like: 0,
      hate: 0,
      createdAt: new Date().getTime(),
      status: TrackStatusType.making
    };
    return this.tracksCollection.add(track)
      .then((ref) => {
        ref.set({id: ref.id}, {merge: true});
        this.router.navigate([`/edit/${ref.id}`], { relativeTo: this.route });
        return true;
      })
      .catch(err => {
        return false;
      });
  }
  public submitTrack(track: Track) {
    return this.afs.doc(`tracks/${track.id}`).update({ status: TrackStatusType.show })
    .then(() => {
      this.router.navigate([`/`], { relativeTo: this.route });
    })
    .catch(err => {

    });
  }
  public getTrack(id: string) {
    return this.tracks.pipe(
      map((tracks: Track[]) => tracks.find(track => track.id === id))
    );
  }
  public getMakingTracks() {
    const userData = this.authService.getUserDataORNull();
    if (!userData) { return ; }
    return this.tracks.pipe(
      map((tracks: Track[]) => tracks.filter(track => track.author === userData.uid && track.status === 'making'))
    );
  }
  public getShowTracks() {
    const userData = this.authService.getUserDataORNull();
    if (!userData) { return ; }
    return this.tracks.pipe(
      map((tracks: Track[]) => tracks.filter(track => track.author === userData.uid && track.status === 'show'))
    );
  }
  public updateTrackTitle(trackId: string, title: string) {
    return this.afs.doc(`tracks/${trackId}`).update({ title: title })
      .then(() => { console.log(`정상적으로 변경되었습니다.`); })
      .catch((err) => { console.log(err); });
  }
  public updateTrackInfo(trackId: string, info: string) {
    return this.afs.doc(`tracks/${trackId}`).update({ info: info })
      .then(() => { console.log(`정상적으로 변경되었습니다.`); })
      .catch((err) => { console.log(err); });
  }
  public updateTrackCardCount(count: number, photoURL: string) {
  }
}
