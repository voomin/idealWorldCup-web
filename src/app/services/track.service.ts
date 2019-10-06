import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Track } from '../models/track';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  tracksCollection: AngularFirestoreCollection<Track>;
  tracks: Observable<Track[]>;
  constructor(
    private _afs: AngularFirestore,
  ) { 
    this.tracksCollection = _afs.collection<Track>('tracks', ref => ref.orderBy('createdAt', 'desc'));
    this.tracks = this.tracksCollection.valueChanges();
  }
  public addTrack(track: Track) {
    return this.tracksCollection
      .add(track)
      .then(() => {
        return 'success';
      })
      .catch(err => {
        return err;
      });
  }
  public getTrack(id: string) {
    return this.tracks.pipe(
      map((tracks: Track[]) => tracks.find(track => track.id === id))
    );
  }
}
