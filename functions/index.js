const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

// const setCardCountInTrack = async (card) => {
//   const db = admin.firestore();
//   const cardRef = db.collection(`cards`);
//   const snapshot = await cardRef.get();
//   let cardCount = 0;
//   snapshot.forEach((doc) => {
//     const card = doc.data();
//     cardCount += card.trackId===card.trackId?1:0;
//   });
//   console.log(`this track(${card.trackId})'s count is ${cardCount}`);
//   return db.doc(`tracks/${card.trackId}`).set({ cardCount: cardCount },{merge: true});
// };
exports.CardonCreate = functions.firestore.document(`cards/{cardId}`)
.onCreate(async (snap, context) => {
  const newCard = snap.data();
  // setCardCountInTrack(newCard);
  const db = admin.firestore();
  const trackRef = db.doc(`tracks/${newCard.trackId}`);
  const snapshot = await trackRef.get();
  const track = snapshot.data();
  const beforeCardCount = track.cardCount?track.cardCount:0;
  return trackRef.set({ cardCount:beforeCardCount + 1 },{merge: true});
});
exports.CardonDelete = functions.firestore.document(`cards/{cardId}`)
.onDelete(async (snap, context) => {
  const delCard = snap.data();
  // setCardCountInTrack(delCard);
  const db = admin.firestore();
  const trackRef = db.doc(`tracks/${delCard.trackId}`);
  const snapshot = await trackRef.get();
  const track = snapshot.data();
  const beforeCardCount = track.cardCount?track.cardCount:0;
  return trackRef.set({ cardCount:beforeCardCount - 1 },{merge: true});
});

