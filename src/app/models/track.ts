import { User } from './user';

export interface Track {
  id?: string;
  author: User['uid'];
  title: string;
  info: string;
  like: number;
  hate: number;
  createdAt: number;
  status: trackStatuses;
}
enum trackStatuses {
  making = 'making',
  show = 'show',
  hide = 'hide',
}