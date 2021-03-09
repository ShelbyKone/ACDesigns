// Firebase imports
import { firebase } from '@firebase/app'
import 'firebase/auth'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDTJteOkqCDzFRkT-Y2pa0HgxUGcY6XJCA",
    authDomain: "acdesigns-402c0.firebaseapp.com",
    projectId: "acdesigns-402c0",
    storageBucket: "acdesigns-402c0.appspot.com",
    messagingSenderId: "301766623526",
    appId: "1:301766623526:web:5a7fc721f186a542fd01e7",
    measurementId: "G-1CRF7M8JZF"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Utils
const auth = firebase.auth()

export {
    auth
} 