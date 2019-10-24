import { Card } from './card';

export interface Play {
  // type: PlayStatusType;
  trackId: string;
  author: string; 
  createdAt: number;
  nowRound?: number;
  totalRound?: number;
  nowStage?: number;
  totalStage?: number;
  pickList?: number[];
  cards?: Card[];
}

// export enum PlayStatusType {
//   track = 'track',
// }
