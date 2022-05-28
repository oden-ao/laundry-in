import { isPlatform } from '@ionic/core';
import { Redirect, Route } from 'react-router-dom';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useHistory } from 'react-router';

import { IonButton, IonAlert, IonRouterOutlet, IonCard, IonList, IonItem, IonAvatar, IonCardTitle, IonCardHeader, IonLabel, IonRow, IonCol, IonGrid, IonContent, IonButtons, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, IonBackButton, IonSearchbar, IonChip, IonItemDivider, IonCardContent, IonModal, IonInput, IonFooter } from '@ionic/react';
import { giftOutline, location, notificationsOutline, chevronDownOutline, lockClosedOutline, createOutline, addOutline, listOutline, informationOutline, helpOutline, informationCircleOutline, helpCircleOutline, documentTextOutline, addCircle, wallet, close } from 'ionicons/icons';
import {GoogleMap, InfoWindow, LoadScript, Marker} from '@react-google-maps/api';
import { useContext, useEffect, useState, useRef } from 'react';
import {collection, addDoc} from "firebase/firestore";
import LaundryContext from '../data/laundry-context';
import avatar1 from '../images/avatar1.svg';
import './Profile.css'
import {getAuth, onAuthStateChanged, updateProfile, updatePassword} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getDownloadURL, getStorage, ref, uploadBytes, UploadResult} from "firebase/storage";

const Profile: React.FC = () => {
  const laundryCtx = useContext(LaundryContext);
  const history = useHistory();
  const [isEditing, setIsEditing] = useState(false);
  const [startUpdatePassword, setIsUpdatingPassword] = useState(false);
  const [editingPassword, setIsEditingPassword] = useState(false);
  const nameRef = useRef<HTMLIonInputElement>(null);
  const passwordRef = useRef<HTMLIonInputElement>(null);
  const[selectedFile, setSelectedFile] = useState<File>();

  const [passwordStatus, setPasswordStatus] = useState<string>("");
  const [profileStatus, setProfileStatus] = useState<string>("");
  const [startUpdateProfile, setIsUpdatingProfile] = useState(false);

const[fileName, setFileName] = useState('');
const storage = getStorage();
const db = getFirestore();

  const auth = getAuth();
 const user = auth.currentUser;
 
if (user !== null) {
  const displayName = user.displayName;
  const email = user.email;
  const photoURL = user.photoURL;
  const emailVerified = user.emailVerified;
  const uid = user.uid;
}

const editHandler = () => {
  setIsEditing(true);
}

const stopEditHandler = () => {
  setIsEditing(false);
}

const fileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
  setSelectedFile(event.target!.files![0]);
  setFileName(event.target!.files![0].name);
};

const signOut = () => {
  firebase.auth().signOut().then(function() {
    history.replace("/login");
  }, function(error) {
    // An error happened.
  });
}



const insertHandler = async() => {
  if(fileName.length >= 1){
    const storageRef = ref(storage, fileName);
    uploadBytes(storageRef, selectedFile as Blob).then((snapshot:UploadResult) => {
        console.log('upload file success');
        getDownloadURL(ref(storage, fileName)).then((url:string)=>{
          confirmEditHandler(url);
        })
  
    })
  }
  else{
    editNameHandler();
  }
};

const confirmEditHandler = (url: string) =>{
  const enteredName = nameRef.current!.value;
  if(!enteredName) return;


    updateProfile(user!, {
      displayName: enteredName.toString(), photoURL: url
    }).then(() => {
      setIsEditing(false);
      setProfileStatus("Profile successfully updated!");
      setIsUpdatingProfile(true);
      // Profile updated!
      // ...
    }).catch((error) => {
      setIsEditing(false);
      setProfileStatus("Profile failed to update!");
      setIsUpdatingProfile(true);
      // An error occurred
      // ...
    });
  
}

const editNameHandler = () => {
  const enteredName = nameRef.current!.value;
  if(!enteredName) return;

  updateProfile(user!, {
    displayName: enteredName.toString()
  }).then(() => {
    setIsEditing(false);
    
    setProfileStatus("Profile successfully updated!");
      setIsUpdatingProfile(true);
    // Profile updated!
    // ...
  }).catch((error) => {
    setIsEditing(false);
    setProfileStatus("Profile failed to update!");
      setIsUpdatingProfile(true);
    // An error occurred
    // ...
  });
}

const updatePasswordHandler = () => {
  setIsEditingPassword(true);
}

const stopUpdatePasswordHandler = () => {
  setIsEditingPassword(false);
}


const confirmUpdatePasswordHandler = () => {
  const user = auth.currentUser;
  const newPassword = passwordRef.current!.value;
  if(!newPassword) return;

updatePassword(user!, newPassword.toString()).then(() => {
  // Update successful.
  setIsEditingPassword(false);
  setPasswordStatus("Password update success!")
  setIsUpdatingPassword(true);
}).catch((error) => {
  // An error ocurred
  // ...
  setIsEditingPassword(false);
  setPasswordStatus("An error has occured! Password update failed.");
  setIsUpdatingPassword(true);
});
}


  return (
    

    <IonPage>
      <IonHeader>
        <IonToolbar color='primary'>
          <IonTitle>My Profile</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonAlert isOpen={startUpdateProfile} 
            header= "Profile Update"
            message={profileStatus}
            buttons={[
                {text: 'Ok', role: 'confirm', handler: () => {setIsEditingPassword(false)}}
            ]}/>

      <IonAlert isOpen={startUpdatePassword} 
            header= "Password Update"
            message={passwordStatus}
            buttons={[
                {text: 'Ok', role: 'confirm', handler: () => {setIsEditingPassword(false)}}
            ]}/>


      <IonModal isOpen={isEditing}>
      <IonHeader>
        <IonToolbar color='primary'>
          <IonButtons slot='start'>
          <IonButton fill="clear" onClick={stopEditHandler}>
          <IonIcon icon={close} slot="icon-only"></IonIcon>
          </IonButton>
          </IonButtons>
          <IonTitle>Update Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
        
        <IonContent>
          <IonGrid>
            <IonRow>
              <IonCol>
              <br/>
          <IonItem>
            <IonLabel><b>Display Name</b></IonLabel>
            <IonInput type='text' ref={nameRef} value={user?.displayName}></IonInput>
          </IonItem>
          <br/>
              </IonCol>
            </IonRow>
            <IonRow className='ion-text-center'>
              <IonCol>
              <IonLabel><b>Profile Picture</b>
              </IonLabel><input type="file" onChange={fileChangeHandler}/><br/>
              </IonCol>
            </IonRow>
          </IonGrid>
         
        </IonContent>
        <IonFooter>
            <IonToolbar>
            <IonButton onClick={insertHandler} expand="block">Update Profile</IonButton>
            </IonToolbar>
          </IonFooter>
      </IonModal>

      <IonModal isOpen={editingPassword}>
      <IonHeader>
        <IonToolbar color='primary'>
          <IonButtons slot='start'>
          <IonButton fill="clear" onClick={stopUpdatePasswordHandler}>
          <IonIcon icon={close} slot="icon-only"></IonIcon>
          </IonButton>
          </IonButtons>
          <IonTitle>Update Password</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonGrid>
        <br/>
        <IonRow>
          <IonCol>
          <IonItem>
            <IonLabel><b>New Password</b></IonLabel>
            <IonInput type='text' ref={passwordRef}></IonInput>
          </IonItem>
          </IonCol>
        </IonRow>
      </IonGrid>
      <IonFooter>
            <IonToolbar>
            <IonButton onClick={confirmUpdatePasswordHandler} expand="block">Update Password</IonButton>
            </IonToolbar>
          </IonFooter>
      </IonModal>


      <IonContent>

        <IonGrid>
          <IonRow>
            <IonCol size-sm='8' offset-sm='2' size-md="6" offset-md="3">
            <IonCard>
              <IonCardHeader>
              <div className='edit'>
                <IonButton fill='clear' onClick={editHandler}><IonIcon icon={createOutline} slot='icon-only'></IonIcon></IonButton>
              </div>
              </IonCardHeader>
          
            <IonCardContent>
            <IonRow>
              <IonCol size='auto'>
                <IonAvatar><img src={user?.photoURL?user.photoURL:avatar1}/></IonAvatar>
              </IonCol>
              <IonCol size='auto'>
                <h1>{user?.displayName?user?.displayName:"User"}</h1>
                {user?.phoneNumber?user?.phoneNumber:"+62-123-456-78"} <br/>
                {user?.email}
              </IonCol>
              

              
            </IonRow>
            </IonCardContent>

              
          </IonCard>

          <IonCard color='primary'>
            <div className='coinbtn'>
            <IonButton className='btncolor' fill='clear'><IonIcon slot="icon-only" icon={addCircle}></IonIcon></IonButton>
            <IonButton className='btncolor' fill='clear'><IonIcon slot="icon-only" icon={wallet}></IonIcon></IonButton>
            </div>
            <IonCardHeader>
              Your Coins
            </IonCardHeader>
            <IonCardContent>
                <IonCardTitle>20,000 coins</IonCardTitle>
            </IonCardContent>
          </IonCard>

          <br/>

          <IonCard>
            <IonCardHeader>
            <IonCardTitle>Settings</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
            <IonList>
              <IonItem onClick={updatePasswordHandler}>
                <IonIcon icon={lockClosedOutline}></IonIcon>
                <IonLabel>Change Password</IonLabel>
              </IonItem>
              <IonItem>
                <IonIcon icon={documentTextOutline}></IonIcon>
                <IonLabel>Privacy Policy</IonLabel>
              </IonItem>
              <IonItem>
                <IonIcon icon={listOutline}></IonIcon>
                <IonLabel>Terms and Conditions</IonLabel>
              </IonItem>
              <IonItem>
                <IonIcon icon={informationCircleOutline}></IonIcon>
                <IonLabel>About</IonLabel>
              </IonItem>
              <IonItem>
                <IonIcon icon={helpCircleOutline}></IonIcon>
                <IonLabel>Help</IonLabel>
              </IonItem>
            </IonList>
            <IonRow className='ion-text-center'>
              <IonCol>
              <IonButton onClick={signOut}>Log Out</IonButton>
              </IonCol>
            
            </IonRow>

            
            </IonCardContent>
            
          </IonCard>
            </IonCol>
          </IonRow>
          

        </IonGrid>

       
       
      </IonContent>
    </IonPage>
  );
};

export default Profile;
