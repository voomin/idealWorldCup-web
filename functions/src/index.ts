import * as functions from 'firebase-functions';
import { Card } from '../../src/app/models/card';

const admin = require('firebase-admin');
admin.initializeApp();


export const CardonCreate = functions.firestore.document(`cards/{cardId}`)
.onCreate(async (snap, context) => {
  const newCard: Card = <Card>snap.data();
  const db = admin.firestore();
  // const batch = db.batch();
  const cardRef = db.collection(`cards`);
  const cards = await cardRef.get();
  const cardCount = cards.filter((card:Card) => card.trackId === newCard.trackId).length;
  // .then((querySnapshot: any) => querySnapshot.filter((card: Card)=> card.trackId === newCard.trackId).length);
  console.log(cardCount);
});
