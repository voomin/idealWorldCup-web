import { Component, OnInit, Directive, Output, Input, EventEmitter, HostBinding, HostListener } from '@angular/core';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { UploadService } from 'src/app/services/upload.service';
import { Upload } from 'src/app/models/upload';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { TrackService } from 'src/app/services/track.service';
import { Track } from 'src/app/models/track';

@Component({
  selector: 'app-track-edit',
  templateUrl: './track-edit.component.html',
  styleUrls: ['./track-edit.component.css']
})
export class TrackEditComponent implements OnInit {
  faFileUpload = faFileUpload;
  files: any = [];
  public makingTrack;

  constructor(
    private uploadService: UploadService,
    private authService: AuthService,
    private trackService: TrackService,
  ) {

  }

  ngOnInit() {
    const userData: User = this.authService.getUserDataORNull();
    if (!userData) { return ; }
    this.makingTrack = this.trackService.getMakingTrack(userData.uid);
  }
  makingTrackCheck(){
    // const userData: User = this.authService.getUserDataORNull();
    // if (!userData) { return ; }

    // console.log(userData);

    // if (userData.makingTrackID) {
    //   this.track = this.trackService.getTrack(userData.makingTrackID);
    // } else {
    //   const track: Track = {
    //     author: userData.uid,
    //     title: '',
    //     info: '',
    //     like: 0,
    //     hate: 0,
    //     status: 'making',
    //     createdAt: new Date().getTime()
    //   };
    //   this.trackService.addTrack(track)
    //   .then((ref) => {
    //     this.authService.setMakingTrackId(ref.id);
    //   });
    // }
  }
  uploadFile(event) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.files.push(element.name)

      const currentUpload = new Upload(event[index]);
      this.uploadService.pushUpload(currentUpload);
    }  
  }
  deleteAttachment(index) {
    this.files.splice(index, 1)
  }

  @Output() onFileDropped = new EventEmitter<any>();
	
  @HostBinding('style.background-color') private background = '#f5fcff'
  @HostBinding('style.opacity') private opacity = '1'
	
  //Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#9ecbec';
    this.opacity = '0.8'
  }
	
  //Dragleave listener
  @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#f5fcff'
    this.opacity = '1'
  }
	
  //Drop listener
  @HostListener('drop', ['$event']) public ondrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#f5fcff'
    this.opacity = '1'
    let files = evt.dataTransfer.files;
    if (files.length > 0) {
      this.onFileDropped.emit(files)
    }
  }
}
