import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { TrackService } from 'src/app/services/track.service';
import { CardService } from 'src/app/services/card.service';
import { Card } from 'src/app/models/card';

@Component({
  selector: 'app-track-detail',
  templateUrl: './track-detail.component.html',
  styleUrls: ['./track-detail.component.css']
})
export class TrackDetailComponent implements OnInit {
  private trackId: string;
  track;
  cardList = [];
  constructor(
    private route: ActivatedRoute,
    private trackService: TrackService,
    private cardService: CardService,
  ) { }

  ngOnInit() {
    this.track = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.trackId = params.get('trackId');
        return this.trackService.getTrack(this.trackId);
      }));
  }

}
