import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { faUser, faPlusSquare, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Track } from 'src/app/models/track';
import { TrackService } from 'src/app/services/track.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faUser = faUser;
  faPlusSquare = faPlusSquare;
  faEdit = faEdit;

  makingTrack: Observable<Track>;
  constructor(
    public authService: AuthService,
    public trackService: TrackService,
    ) { }

  ngOnInit() {
    this.makingTrack = this.trackService.getMakingTrack();
  }
  newTrackClick() { 
    
  }
  makingTrackClick() {

  }
}
