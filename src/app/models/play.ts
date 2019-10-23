import { Card } from './card';

export interface Play {
  // type: PlayStatusType;
  trackId: string;
  author: string; 
  createdAt: number;
  nowStage?: number;
  TotalStage?: number;
  pickList?: number[];
  cards?: Card[];
}

// export enum PlayStatusType {
//   track = 'track',
// }
