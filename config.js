import * as firebase from 'firebase'
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyDyQNi2nT286Hp6fMX588FVH1SYpY32VoM",
  authDomain: "wily-app-de26e.firebaseapp.com",
  databaseURL: "https://wily-app-de26e.firebaseio.com",
  projectId: "wily-app-de26e",
  storageBucket: "wily-app-de26e.appspot.com",
  messagingSenderId: "407705909852",
  appId: "1:407705909852:web:5d053c3d9ef4c539004499"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var db = firebase.firestore();

  export default db;
