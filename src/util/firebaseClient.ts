import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyBX6NDSG8HaDY71b-s94fkhFDTQPsOZvyY',
    authDomain: 'mokapio.firebaseapp.com',
    databaseURL: 'https://mokapio.firebaseio.com',
    projectId: 'mokapio',
    storageBucket: 'mokapio.appspot.com',
    messagingSenderId: '1061737271415',
    appId: '1:1061737271415:web:12f92b43f19e57bbe9b672',
    measurementId: 'G-6TR3CSXFG8',
};

let db: firebase.firestore.Firestore;

if (typeof window !== 'undefined' && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
}

export { firebase, db };
