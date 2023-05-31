import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyDUsOGg8ovsbw0T5nGC5R4ynCJ6Q6R86GI",
    authDomain: "crwn-db-92c64.firebaseapp.com",
    projectId: "crwn-db-92c64",
    storageBucket: "crwn-db-92c64.appspot.com",
    messagingSenderId: "446177239272",
    appId: "1:446177239272:web:2ad46bdba40747c198e95d",
    measurementId: "G-MR0C9CZ4YN"
};

export const creatUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = await userRef.get();
    
    if(!snapshot.exists){
        const { displayName, email } = userAuth;
        const createdAt = new Date()

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData,
            })
        } catch(error) {
            console.log('error creating user', error.message)
        }
    };

    return userRef;
}

firebase.initializeApp(config);

export const auth  = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;