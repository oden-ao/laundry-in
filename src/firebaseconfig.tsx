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
    const res = await firebase.auth().createUserWithEmailAndPassword(username, password)
    console.log(res)
    const auth = getAuth();
    const user = auth.currentUser;
    

    const addCoinsDoc = async () => {
      const db = getFirestore();
      try{
        const docRef = await setDoc(doc(db, user!.uid.toString(), "coins"),{
            coins: 0,
            redeemedGift: false
        });
        console.log("Document written")
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };

    const addPromosDoc = async () => {
      const db = getFirestore();
      try{
        const docRef = await setDoc(doc(db, user!.uid.toString(), "promos"),{
            freeDelivery: 3,
            tenDiscount: 5,
            otherDiscount: 0
        });
        console.log("Document written")
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };

    addCoinsDoc();
    addPromosDoc();

    return true
    
  } catch(error){
    console.log(error)
    return false
  }
}

export async function addUserInfo(username: string, phoneNumber: string){
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    


      const db = getFirestore();
      try{
        const docRef = await setDoc(doc(db, user!.uid.toString(), "info"),{
            username: username,
            phoneNumber: phoneNumber
        });
        console.log("Document written")
      } catch (e) {
        console.error("Error adding document: ", e);
      }

    return true
    
  } catch(error){
    console.log(error)
    return false
  }
}