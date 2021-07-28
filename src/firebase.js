import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDjDwpnCSAhRAZZ-fx2cM8wZfbHx3R8K7Y",
  authDomain: "discord-test-d9678.firebaseapp.com",
  projectId: "discord-test-d9678",
  storageBucket: "discord-test-d9678.appspot.com",
  messagingSenderId: "554927919510",
  appId: "1:554927919510:web:f05d01237ee4a7189e0db7"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
