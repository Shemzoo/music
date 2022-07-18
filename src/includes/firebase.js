import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCtq4ODgw8KwOWM_n-v2VWi6r4oleakj6A',
  authDomain: 'music-39e7b.firebaseapp.com',
  projectId: 'music-39e7b',
  storageBucket: 'music-39e7b.appspot.com',
  appId: '1:476605611371:web:d0811da04d212834ed602e',
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

const usersCollection = db.collection('users');

export {
  auth,
  db,
  usersCollection,
  storage,
};
