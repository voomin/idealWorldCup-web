import { Track } from './track';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified?: boolean;
  makingTrackID?: Track['id'];
}
