import firebase from 'firebase/compat/app';
import {collection, addDoc, getDocs, doc, collectionGroup, query, where, getFirestore, setDoc} from "firebase/firestore";
import {getAuth, onAuthStateChanged, updateProfile} from "firebase/auth";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
require('firebase/auth')



const config = {
  apiKey: "AIzaSyDuKm9NkqgWWiVTB7hjzOtVaDIellzQIKA",
  authDomain: "laundry-e0bc0.firebaseapp.com",
  projectId: "laundry-e0bc0",
  storageBucket: "laundry-e0bc0.appspot.com",
  messagingSenderId: "750183114702",
  appId: "1:750183114702:web:95ec47b006e5bc5ca22d9f"
}

// Initialize Firebase
firebase.initializeApp(config)

export async function loginUser(username: string, password: string) {
  
  const email = `${username}@gmail.com`
  
  try { 
    const res = await firebase.auth().signInWithEmailAndPassword(email, password) 
    


    console.log(res)
    return true
  } catch(error) {
    console.log(error)
    return false
  }
}

export async function registerUser(username: string, password: string){
  const email = `${username}@gmail.com`
  try {
    const res = await firebase.auth().createUserWithEmailAndPassword 
    (username, password)
    console.log(res)
    return true
    
  } catch(error){
    console.log(error)
    return false
  }
}