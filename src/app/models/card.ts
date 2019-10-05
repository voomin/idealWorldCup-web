import { Track } from './track';

export interface Card {
  id: string;
  name: string;
  trackId: Track['id'];
  photoURL: string;
}
