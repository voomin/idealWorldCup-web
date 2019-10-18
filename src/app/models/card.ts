export interface Card {
  id?: string;
  title: string;
  trackId: string;
  uploadAt: number;
  uploadUser: string;
  photoURL?: string;
  imgName?: string;
  imgTotalSize?: number;
  imgUploadedSize?: number;
}
