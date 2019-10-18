const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const admin = require('firebase-admin');
admin.initializeApp();


exports.CardonCreate = functions.firestore.document(`cards/{cardId}`)
.onCreate(async (snap, context) => {
  const newCard = snap.data();
  const db = admin.firestore();
  // const batch = db.batch();
  const cardRef = db.collection(`cards`);
  const cards = await cardRef.get();
  const cardCount = cards.filter((card) => card.trackId === newCard.trackId).length;
  // .then((querySnapshot: any) => querySnapshot.filter((card: Card)=> card.trackId === newCard.trackId).length);
  console.log(`this track(${newCard.trackId})'s count is ${cardCount}`);
  db.document(`tracks/${newCard.trackId}`).set({ cardCount: cardCount },{merge: true});
});