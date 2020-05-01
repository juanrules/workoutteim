import firebase from "firebase";

const config = {
  apiKey: "AIzaSyAuB3z6ymq0uAV66iC9Lv-jFE1PjzfRTMY",
  authDomain: "workoutteim.firebaseapp.com",
  databaseURL: "https://workoutteim.firebaseio.com",
  projectId: "workoutteim",
  storageBucket: "workoutteim.appspot.com",
  messagingSenderId: "325192817037",
  appId: "1:325192817037:web:f58c26cffe960e8c8a85c4",
  measurementId: "G-V899QQB62X",
};
firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.database();
