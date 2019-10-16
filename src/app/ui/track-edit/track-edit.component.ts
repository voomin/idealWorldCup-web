import { Component, OnInit, Directive, Output, Input, EventEmitter, HostBinding, HostListener } from '@angular/core';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { Upload } from 'src/app/models/upload';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { TrackService } from 'src/app/services/track.service';
import { Track } from 'src/app/models/track';
import { CardService } from 'src/app/services/card.service';
import { Card } from 'src/app/models/card';
import { map } from 'rxjs/operators';
import * as _ from "lodash";


@Component({
  selector: 'app-track-edit',
  templateUrl: './track-edit.component.html',
  styleUrls: ['./track-edit.component.css']
})
export class TrackEditComponent implements OnInit {
  userData: User;
  faFileUpload = faFileUpload;
  dropzoneActive:boolean = false;
  
  files: any = [];
  public makingTrack;
  public makingCards;


  constructor(
    private authService: AuthService,
    private trackService: TrackService,
    private cardService: CardService,
  ) {

  }

  ngOnInit() {
    this.makingTrack = this.trackService.getMakingTrack()
      .pipe(map((track:Track) => {
        this.makingCards = this.cardService.getCardsinATrack(track.id);
        return track;
      }));

  }
  dropzoneState($event: boolean) {
    this.dropzoneActive = $event;
  }
  handleDrop(trackId: string, fileList: FileList) {
    let filesIndex = _.range(fileList.length);
    _.each(filesIndex, (index) => this.cardAdd(trackId, fileList[index]) );
  }
  uploadFile(trackId: string, event: any) {
    for (let index = 0; index < event.length; index++) { 
      this.cardAdd(trackId, event[index]);
    }
  }
  private cardAdd(trackId:string, file:File) {
    const currentUpload = new Upload(file);
    const card: Card = {
      title: currentUpload.file.name,
      trackId: trackId,
      uploadAt: new Date().getTime(),
      uploadUser: this.userData.uid,
      imgName: currentUpload.file.name,
      imgTotalSize: currentUpload.file.size,
    };
    this.cardService.addCard(card, currentUpload);
  }
  deleteAttachment(index) {
    this.files.splice(index, 1);
  }
  deleteCard(id: string) {
    return this.cardService.deleteCard(id);
  }
  cardTitleChange(id: string, event: any) {
    const changedCardTitle = event.target.value;
    return this.cardService.updateCardTitle(id, changedCardTitle);
  }
  trackTitleChange(id: string, event: any) {
    const changedTrackTitle = event.target.value;
    return this.trackService.updateTrackTitle(id, changedTrackTitle);
  }
  trackInfoChange(id: string, event: any) {
    const changedTrackInfo = event.target.value;
    return this.trackService.updateTrackInfo(id, changedTrackInfo);
  }
}
