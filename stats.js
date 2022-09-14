/*
Firebase Firecloud Database
*/
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, onSnapshot, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDbmErDqM2Bqm13cLpHl55EdOj9-zUVm-w",
    authDomain: "shuffle-game.firebaseapp.com",
    projectId: "shuffle-game",
    storageBucket: "shuffle-game.appspot.com",
    messagingSenderId: "523377019008",
    appId: "1:523377019008:web:a9aa02378daed93e1e3e65"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
export const colRef = collection(db, "stats");

onSnapshot(colRef, (snapshot) => {
    let books = []
    snapshot.docs.forEach(doc => {
        books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books)
});

function testf() {
    console.log('testf()');
}