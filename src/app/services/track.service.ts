import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Track } from '../models/track';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  private tracksCollection: AngularFirestoreCollection<Track>;
  tracks: Observable<Track[]>;
  constructor(
    private afs: AngularFirestore,
  ) { 
    this.tracksCollection = afs.collection<Track>('tracks');
    this.tracks = this.tracksCollection.valueChanges();
  }
  addTrack(track: Track) {
    return this.tracksCollection.add(track)
      .then((ref) => {
        // console.log('success');
        ref.set({id: ref.id}, {merge: true});
        return ref;
      })
      .catch(err => {
        // console.log('fail');
        // console.log(err);
        return err;
      });
  }
  public getTrack(id: string) {
    return this.tracks.pipe(
      map((tracks: Track[]) => tracks.find(track => track.id === id))
    );
  }
  public getMakingTrack(uid: string){
    return this.tracks.pipe(
      map((tracks: Track[]) => tracks.find(track => track.author === uid && track.status === 'making'))
    );
  }
}
