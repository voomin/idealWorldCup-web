import { Track } from './track';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified?: boolean;
  signAt?: number;
  lastLoginAt?: number;
}