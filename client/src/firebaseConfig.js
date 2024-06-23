import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDvlLwsv7pON_hBeT8llZMDyolgaV0Lzmo",
    authDomain: "mobitect-a7ace.firebaseapp.com",
    projectId: "mobitect-a7ace",
    storageBucket: "mobitect-a7ace.appspot.com",
    messagingSenderId: "1001204304703",
    appId: "1:1001204304703:web:6a57b07243106464e4618a",
    measurementId: "G-Q7QQN9ZF69"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
