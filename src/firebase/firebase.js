import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

const firebaseConfigtemp = {
  apiKey: "AIzaSyBbcpzdeejTiEsV2VSvd__BSPInlXykbKM",
  authDomain: "expensify-dev-c7264.firebaseapp.com",
  databaseURL: "https://expensify-dev-c7264.firebaseio.com",
  projectId: "expensify-dev-c7264",
  storageBucket: "expensify-dev-c7264.appspot.com",
  messagingSenderId: "244849625705",
  appId: "1:244849625705:web:6bd15e92ce8d28552330f8"
};
const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfigtemp);
const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export { firebase, googleAuthProvider, database as default };
// database.ref().set({
//   name: "Akmal Anvarov",
//   age: 29,
//   single: true,
//   location: {
//     city: "tashkent",
//     country: "uzbekistan",
//   },
//   job: "lobotryas",
// });
// const note = [
//   {
//     id: "1",
//     title: "first note",
//     body: "some note",
//   },
//   {
//     id: "2",
//     title: "second note",
//     body: "some second note",
//   },
//   {
//     id: "3",
//     title: "third note",
//     body: "some third note",
//   },
// ];

// database.ref("expenses").on("child_removed", (snapshot) =>{
//     console.log(snapshot.key, snapshot.val());
// })

// database.ref("expenses").on("child_changed", (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// })
// database.ref("expenses").push(note[0]);
// database.ref("expenses").push(note[1]);
// database.ref("expenses").push(note[2]);

// database.ref().set(note);
// database.ref("expenses").on(
//   "value",
//   (snapshot) => {
//     const expenses = [];
//     snapshot.forEach((childSnapshot) => {
//       expenses.push({ id: childSnapshot.key, ...childSnapshot.val() });
//     });
//     console.log(expenses)
//   },
//   (e) => console.log(e, "error")
// );
