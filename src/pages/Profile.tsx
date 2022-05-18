import { isPlatform } from '@ionic/core';
import { Redirect, Route } from 'react-router-dom';
import { IonButton, IonRouterOutlet, IonCard, IonList, IonItem, IonAvatar, IonCardTitle, IonCardHeader, IonLabel, IonRow, IonCol, IonGrid, IonContent, IonButtons, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, IonBackButton, IonSearchbar, IonChip, IonItemDivider, IonCardContent, IonModal, IonInput } from '@ionic/react';
import { giftOutline, location, notificationsOutline, chevronDownOutline, lockClosedOutline, createOutline, addOutline, listOutline, informationOutline, helpOutline, informationCircleOutline, helpCircleOutline, documentTextOutline, addCircle, wallet } from 'ionicons/icons';
import {GoogleMap, InfoWindow, LoadScript, Marker} from '@react-google-maps/api';
import { useContext, useEffect, useState, useRef } from 'react';
import LaundryContext from '../data/laundry-context';
import avatar1 from '../images/avatar1.svg';
import './Profile.css'

const Profile: React.FC = () => {
  const laundryCtx = useContext(LaundryContext);
  const [locName, setlocname] = useState<string>("default");
  const [isEditing, setIsEditing] = useState(false);
  const nameRef = useRef<HTMLIonInputElement>(null);
  const [username, setUsername] = useState<string>("Boba Fett");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='primary'>
          <IonTitle>My Profile</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonModal isOpen={isEditing}>
        <IonContent>
          <IonItem>
            <IonLabel>Name</IonLabel>
            <IonInput type='text' ref={nameRef} value={username}></IonInput>
          </IonItem>
        </IonContent>
      </IonModal>


      <IonContent>

        <IonGrid>
          <IonRow>
            <IonCol size-sm='8' offset-sm='2' size-md="6" offset-md="3">
            <IonCard>
          <div className='edit'>
                <IonButton fill='clear'><IonIcon icon={createOutline} slot='icon-only'></IonIcon></IonButton>
              </div>
            <IonCardContent>
            <IonRow>
              <IonCol size='auto'>
                <IonAvatar><img src={avatar1}/></IonAvatar>
              </IonCol>
              <IonCol size='auto'>
                <h1>Boba Fett</h1>
                +621234567 <br/>
                bobafett@tatooine.com
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
              <IonItem>
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
              <IonButton>Log Out</IonButton>
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
