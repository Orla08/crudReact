import firebase from "firebase/app";
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAVfE2zZqv-S6I6S5ZSHt7OANTT8bAO0J0",
    authDomain: "crud-c77e3.firebaseapp.com",
    projectId: "crud-c77e3",
    storageBucket: "crud-c77e3.appspot.com",
    messagingSenderId: "877380720649",
    appId: "1:877380720649:web:dbfc9259355503f0e380d8"
  };


export const firebaseApp = firebase.initializeApp(firebaseConfig) //Inicialzar base de datos con la constante que entrega firebase


