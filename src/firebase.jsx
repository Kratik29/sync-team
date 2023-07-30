// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCAl5Q8A9ytyFtIxniAqlWoiIeRLutF2VU",
  authDomain: "sync-team-15a80.firebaseapp.com",
  projectId: "sync-team-15a80",
  storageBucket: "sync-team-15a80.appspot.com",
  messagingSenderId: "2811834907",
  appId: "1:2811834907:web:d5852640c102a222af3ebe",
  measurementId: "G-FMZ1Z667G8",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider };
export default db;
