import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { TrackService } from 'src/app/services/track.service';

@Component({
  selector: 'app-track-workplace',
  templateUrl: './track-workplace.component.html',
  styleUrls: ['./track-workplace.component.css']
})
export class TrackWorkplaceComponent implements OnInit {
  faPlus = faPlus;
  makingTracks;
  showTracks;

  newTrackPress: boolean = false;
  constructor(
    private trackService: TrackService
  ) { }

  ngOnInit() {
    this.makingTracks = this.trackService.getMakingTracks();
    this.showTracks = this.trackService.getShowTracks();
  }
  newTrackClick() {
    if(!this.newTrackPress) {
      this.trackService.addNewTrack().then(() => {
        this.newTrackPress = false;
      })
    }
    this.newTrackPress = true;
  }
}
