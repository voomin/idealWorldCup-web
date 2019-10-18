import { Component, OnInit } from '@angular/core';
import { TrackService } from 'src/app/services/track.service';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.css']
})
export class TracksComponent implements OnInit {
  tracks;

  constructor(
    private trackService : TrackService,
  ) { }

  ngOnInit() {
    this.tracks = this.trackService.getShowTracks();
  }

}
