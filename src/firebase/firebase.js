import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import {getFirestore} from "firebase/firestore"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBu2Hr_AntqbVW7l1aDuV5Uyn7Y3YJ-lwQ",
  authDomain: "chatapp-b7e18.firebaseapp.com",
  projectId: "chatapp-b7e18",
  storageBucket: "chatapp-b7e18.firebasestorage.app",
  messagingSenderId: "1068417066734",
  appId: "1:1068417066734:web:da3a8adf1870c27f4c35ff",
  measurementId: "G-VHDPPP3HY1",
  databaseURL: "https://chatapp-b7e18-default-rtdb.firebaseio.com/"
};

//initialize firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);