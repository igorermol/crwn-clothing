import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAMGsuF-_-50tIZXzUjTA9InqXoQO8b0W4",
    authDomain: "crwn-db-b2179.firebaseapp.com",
    projectId: "crwn-db-b2179",
    storageBucket: "crwn-db-b2179.appspot.com",
    messagingSenderId: "103924643334",
    appId: "1:103924643334:web:829b66681d2ed2c19af587",
    measurementId: "G-5LNCNR9M24"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();
    
    if(!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }

    return userRef;

  }

 firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
