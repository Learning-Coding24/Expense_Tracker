const firebaseConfig = {
  apiKey: "AIzaSyDgROSamBD6BTWRBpCN50IibLUU0EQzHvM",
  authDomain: "expense-tracker-v1-949e7.firebaseapp.com",
  projectId: "expense-tracker-v1-949e7",
  storageBucket: "expense-tracker-v1-949e7.firebasestorage.app",
  messagingSenderId: "997186820899",
  appId: "1:997186820899:web:9b8d0f129e3fc1f741ca96",
  measurementId: "G-FDQ30SR0RZ",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();

console.log("Firebase Initialized");
