import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeaderComponent } from './ui/header/header.component';
import { TracksComponent } from './ui/tracks/tracks.component';
import { TrackEditComponent } from './ui/track-edit/track-edit.component';
import { TrackDetailComponent } from './ui/track-detail/track-detail.component';
import { TrackWorkplaceComponent } from './ui/track-workplace/track-workplace.component';


const routes: Routes = [
  { path: '', component: TracksComponent},
  { path: 'v/:trackId', component: TrackDetailComponent},
  { path: 'edit/:trackId', component: TrackEditComponent},
  { path: 'workplace', component: TrackWorkplaceComponent},
  // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  TrackDetailComponent,
  TrackWorkplaceComponent,
  TracksComponent,
  TrackEditComponent,
  HeaderComponent
];
