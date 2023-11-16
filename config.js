
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCs2VFKMA0PKFt6eVTQy8-NtGFcLanmK5s",
  authDomain: "lost-e3f4a.firebaseapp.com",
  projectId: "lost-e3f4a",
  storageBucket: "lost-e3f4a.appspot.com",
  messagingSenderId: "982302640174",
  appId: "1:982302640174:web:117ca307a0c16644da77bf",
  measurementId: "G-H34L1CFDEJ"
    
}

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

export {firebase}