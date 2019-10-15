import { Track } from './track';

export interface Card {
  id?: string;
  title: string;
  trackId: string;
  photoURL?: string;
  imgName?: string;
  imgTotalSize?: number;
  imgUploadedSize?: number;
}
