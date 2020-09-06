import firebase from 'firebase/app'
import 'firebase/firestore'
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAVP5din4DivnpQx0-Qs1xYyjqxj2gz8AU",
    authDomain: "crud-react-ef7db.firebaseapp.com",
    databaseURL: "https://crud-react-ef7db.firebaseio.com",
    projectId: "crud-react-ef7db",
    storageBucket: "crud-react-ef7db.appspot.com",
    messagingSenderId: "1044699494241",
    appId: "1:1044699494241:web:61fd15f6807b3f67907720"
  };
  // Initialize Firebase
  const fb = firebase.initializeApp(firebaseConfig);

  export const db = fb.firestore()

  //Guardo firebase initialize en una constante para poder exportarla