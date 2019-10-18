const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const admin = require('firebase-admin');
admin.initializeApp();

const setCardCountInTrack = async (card) => {
  const db = admin.firestore();
  const cardRef = db.collection(`cards`);
  const snapshot = await cardRef.get();
  let cardCount = 0;
  snapshot.forEach((doc) => {
    const card = doc.data();
    cardCount += card.trackId===card.trackId?1:0;
  });
  console.log(`this track(${card.trackId})'s count is ${cardCount}`);
  return db.doc(`tracks/${card.trackId}`).set({ cardCount: cardCount },{merge: true});
};
exports.CardonCreate = functions.firestore.document(`cards/{cardId}`)
.onCreate((snap, context) => {
  const newCard = snap.data();
  setCardCountInTrack(newCard);
});
exports.CardonDelete = functions.firestore.document(`cards/{cardId}`)
.onDelete((snap, context) => {
  const delCard = snap.data();
  setCardCountInTrack(delCard);
});

