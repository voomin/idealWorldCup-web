import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { TrackService } from 'src/app/services/track.service';
import { CardService } from 'src/app/services/card.service';
import { Card } from 'src/app/models/card';
import { PlayService } from 'src/app/services/play.service';
import { Play } from 'src/app/models/play';

@Component({
  selector: 'app-track-detail',
  templateUrl: './track-detail.component.html',
  styleUrls: ['./track-detail.component.css']
})
export class TrackDetailComponent implements OnInit {
  private trackId: string;
  track;
  play;
  constructor(
    private route: ActivatedRoute,
    private trackService: TrackService,
    private cardService: CardService,
    private playService: PlayService
  ) { }

  ngOnInit() {
    this.track = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.trackId = params.get('trackId');
        this.play = this.playService.getMyPlayTrack(this.trackId);
        return this.trackService.getTrack(this.trackId);
      }));
  }
  cardClick(card: Card, play: Play, cardIndex: number) {
    return this.playService.pickCard(card, play, cardIndex);
  }

}
