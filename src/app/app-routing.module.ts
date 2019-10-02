import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeaderComponent } from './ui/header/header.component';
import { TracksComponent } from './ui/tracks/tracks.component';
import { TrackEditComponent } from './ui/track-edit/track-edit.component';


const routes: Routes = [
  { path: '', component: TracksComponent},
  { path: 'new-track', component: TrackEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  TracksComponent,
  TrackEditComponent,
  HeaderComponent
];
