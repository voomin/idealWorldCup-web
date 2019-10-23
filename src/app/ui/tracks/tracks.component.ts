import { Component, OnInit } from '@angular/core';
import { TrackService } from 'src/app/services/track.service';
import { PlayService } from 'src/app/services/play.service';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.css']
})
export class TracksComponent implements OnInit {
  tracks;

  constructor(
    private trackService: TrackService,
    private playService: PlayService, 
  ) { }

  ngOnInit() {
    this.tracks = this.trackService.getShowTracks();
  }

  trackClick(trackId: string) {
    this.playService.initPlayTrack(trackId);
  }

}
