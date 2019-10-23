const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();



const mixArray = (arr) => {
  let oldArr = [...arr];
  let newArr = [];
  const random = (max) => Math.floor(Math.random() * max);
  while(oldArr.length !== 0) {
    const obj = oldArr.splice(random(oldArr.length), 1)[0];
    newArr.push(obj);
  }
  return newArr;
}
const maxStage = (num) => {
  let max = Math.floor(num/2);
  const t = (temp) => Math.pow(2,temp)<=num?temp:t(--temp);
  return Math.pow(2,t(max));
}
const setCardCountInTrack = async (card) => {
  const db = admin.firestore();
  const cardRef = db.collection(`cards`);
  const snapshot = await cardRef.get();
  let cardCount = 0;
  snapshot.forEach((doc) => {
    const tempCard = doc.data();
    cardCount += tempCard.trackId === card.trackId?1:0;
  });
  console.log(`this track(${card.trackId})'s count is ${cardCount}`);
  return db.doc(`tracks/${card.trackId}`).set({ cardCount: cardCount },{merge: true});
};
exports.CardonCreate = functions.firestore.document(`cards/{cardId}`)
.onCreate(async (snap, context) => {
  const newCard = snap.data();
  return setCardCountInTrack(newCard);
});
exports.CardonDelete = functions.firestore.document(`cards/{cardId}`)
.onDelete(async (snap, context) => {
  const delCard = snap.data();
  return setCardCountInTrack(delCard);
});
exports.PlayonCreate = functions.firestore.document(`plays/{trackId}`)
.onCreate(async (snap, context) => {
  let cards = [];
  let totalStage = 0;
  let nowStage = 0;

  const play = snap.data();
  // const type = play.type;
  const trackId = play.trackId;

  const db = admin.firestore();
  const qryCards = await db.collection(`cards`).get();
  
  qryCards.forEach((doc) => {
    const tempCard = doc.data();
    if(tempCard.trackId !== trackId) { return ; }
    cards.push(tempCard);
  });
  
  cards = mixArray(cards);
  totalStage = maxStage(cards.length);
  nowStage = totalStage;

  return snap.ref.set({
    cards: cards,
    totalStage: totalStage,
    nowStage: nowStage,
  },{merge:true});
});
