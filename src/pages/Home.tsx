import { isPlatform } from '@ionic/core';
import { Redirect, Route } from 'react-router-dom';
import { IonButton, IonModal, IonRouterOutlet, IonCard, IonToast, IonList, IonItem, IonAvatar, IonCardTitle, IonCardHeader, IonLabel, IonRow, IonCol, IonGrid, IonContent, IonButtons, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, IonBackButton, IonSearchbar, IonChip, IonItemDivider, IonCardContent, IonText, IonCardSubtitle } from '@ionic/react';
import { giftOutline, location, notificationsOutline, chevronDownOutline, locationOutline, locationSharp, gift, notifications, close } from 'ionicons/icons';
import {Geolocation} from '@capacitor/geolocation';
import {GoogleMap, InfoWindow, LoadScript, Marker} from '@react-google-maps/api';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {getAuth, onAuthStateChanged} from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

import { Swiper, SwiperSlide} from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

import { useContext, useEffect, useState } from 'react';
import laundry1 from '../images/laundry1.jpg'
import kiloan from '../images/SVG/kiloan.svg'
import unit from '../images/SVG/satuan.svg'
import other from '../images/SVG/other.svg'
import all from '../images/SVG/all outlets.svg'
import nearby from '../images/SVG/nearby.svg'
import courier from '../images/SVG/delivery.svg'
import header from '../images/SVG/Header.svg'
import LaundryContext from '../data/laundry-context';

import laundry2 from '../images/laundry2.jpg'
import laundry3 from '../images/laundry3.png'

import './Home.css'

const Home: React.FC = () => {
  const google = window.google;
  const containerStyle = {
    width:'100%',
    height: '150px',
    margin:'auto'
  };

 const auth = getAuth();
 const user = auth.currentUser;
if (user !== null) {
  const displayName = user.displayName;
  const email = user.email;
  const photoURL = user.photoURL;
  const emailVerified = user.emailVerified;
  const uid = user.uid;
}

  
  const laundryCtx = useContext(LaundryContext);

  //map functionality
  const [selectedLat, setLat] = useState<number>(0);
  const [selectedLng, setLng] = useState<number>(0);

  const [redeemed, setRedeemed] = useState(false);

  async function getRedeem() {
    const db = getFirestore();
    const docRef = doc(db, user!.uid.toString(), "coins");
    const docSnap = await getDoc(docRef);
    const redeemStatus = docSnap.get("redeemedGift");
    setRedeemed(redeemStatus);
  }

  async function updateRedeem() {
    const db = getFirestore();
    const docRef = doc(db, user!.uid.toString(), "coins");
    const docSnap = await getDoc(docRef);
    const redeemStatus = docSnap.get("redeemedGift");
    await updateDoc(docRef, {
      redeemedGift: true })
  }

  async function getInfo() {
    const db = getFirestore();
    const docRef = doc(db, user!.uid.toString(), "info");
    const docSnap = await getDoc(docRef);
    const username = docSnap.get("username");
    setUsername(username);
    console.log("Username get");
  }

  const getCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition({enableHighAccuracy:true});
    console.log('Current position:', coordinates);
    console.log('Lat:', coordinates.coords.latitude);
    console.log('Lng:', coordinates.coords.longitude);
    setLat(coordinates.coords.latitude);
    setLng(coordinates.coords.longitude);
    console.log('SelectedLat:', selectedLat);
    console.log('SelectedLng:', selectedLng);
    laundryCtx.chooseLocation(selectedLat, selectedLng);
  };

  const [username, setUsername] = useState('User');

  useEffect(()=>{
    getCurrentPosition();
    getInfo();
    getRedeem();
  },[selectedLat, selectedLng, username, redeemed]);

  const [openGift, setOpenGift] = useState(false);

  const openGiftHandler = () =>{
    setOpenGift(true);
  }

  const closeGiftHandler = () =>{
    setOpenGift(false);
  }

  const [toastMessage, setToastMessage] = useState('');
  const redeem = async () => {
    const db = getFirestore();
    const promoRef = doc(db, user!.uid, "coins")
    const docSnap = await getDoc(promoRef);
    const currPromo = docSnap.get("coins");
    await updateDoc(promoRef, {
     coins: currPromo + 100 })
  }

  const redeemGiftHandler = () =>{
    setRedeemed(true);
    setOpenGift(false);
    updateRedeem();
    redeem();
    setOpenGift(false);
    setToastMessage("Gift redeemed!");
  }

  const [openNotif, setOpenNotif] = useState(false);
  const openNotifHandler = () =>{
    setOpenNotif(true);
  }

  const closeNotifHandler = () =>{
    setOpenNotif(false);
  }

  return (
    <IonPage>

<IonToast isOpen={!!toastMessage}
                    message={toastMessage}
                    duration={1500}
                    onDidDismiss={() => {setToastMessage('')}}/>

<IonModal isOpen={openGift}>
      <IonHeader>
        <IonToolbar color='primary'>
          <IonButtons slot='start'>
          <IonButton fill="clear" onClick={closeGiftHandler}>
          <IonIcon icon={close} slot="icon-only"></IonIcon>
          </IonButton>
          </IonButtons>
          <IonTitle>Gifts</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonGrid>
        {redeemed == false?<IonItem onClick={redeemGiftHandler}>
            <IonLabel>
              <b>Free 100 Coins</b><br/>
                Welcome to LaundryIn!<br/>
                Click this gift to redeem your free 100 coins!
                <br/>
                
            </IonLabel>
          </IonItem>:
          <IonRow>
           <IonCol className='ion-text-center'>
             <br/>
             You have no gifts waiting to be redeemed.
           </IonCol>
         </IonRow>
          }
          
      </IonGrid>
      
      </IonContent>
      </IonModal>

      <IonModal isOpen={openNotif}>
      <IonHeader>
        <IonToolbar color='primary'>
          <IonButtons slot='start'>
          <IonButton fill="clear" onClick={closeNotifHandler}>
          <IonIcon icon={close} slot="icon-only"></IonIcon>
          </IonButton>
          </IonButtons>
          <IonTitle>Notifications</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonGrid>
          <IonRow>
           <IonCol className='ion-text-center'>
             <br/>
             You have no notifications.
           </IonCol>
         </IonRow>
          
      </IonGrid>
      
      </IonContent>
      </IonModal>

      <IonContent>
      
              <IonGrid className='header'>
        
          <IonRow>
          <IonCol size-sm='8' offset-sm='2' size-md="6" offset-md="3">
          
            <IonGrid>
            
            <IonRow>
            <IonCol>
            <div className='title'>
            <h1>LaundryIn</h1>
            </div>
              <IonText className='white'>Hola! Welcome back,</IonText><br/>
              <div className='user'>{user?.displayName?user?.displayName:username}</div>
            </IonCol>
            <IonCol>
            <div className='topbtn'>
              <IonButton onClick={openGiftHandler} fill="clear"><IonIcon className='white' slot='icon-only' icon={gift}></IonIcon></IonButton>
              <IonButton onClick={openNotifHandler} fill="clear"><IonIcon className='white' slot='icon-only' icon={notifications}></IonIcon></IonButton>
      </div>
            </IonCol>
          </IonRow>
          

          
          <IonRow>
            <IonCol>

              <IonCard>
             
                <IonCardHeader>
                  
                  <IonCardSubtitle>
                  <IonIcon icon={locationSharp}></IonIcon>Your Current Location</IonCardSubtitle>


                  <div className='locbtn'> <IonButton fill='clear' routerLink='/location'><IonIcon slot="icon-only" icon={chevronDownOutline}></IonIcon></IonButton></div>

                  </IonCardHeader>
              <LoadScript googleMapsApiKey="AIzaSyCuO9hSvfXdsUG6UsVqo6q3ouqqhqN7f2A">
            <GoogleMap
            mapContainerStyle={containerStyle}
            center={laundryCtx.location==={latitude: 0, longitude: 0}?{lat:selectedLat, lng:selectedLng}:{lat: laundryCtx.location.latitude, lng: laundryCtx.location.longitude}}
            zoom={18}><></>
            <Marker position={laundryCtx.location==={latitude: 0, longitude: 0}?{lat:selectedLat, lng:selectedLng}:{lat: laundryCtx.location.latitude, lng: laundryCtx.location.longitude}}/>
            </GoogleMap>
      </LoadScript>
              </IonCard>

              {/* <IonCard>
                <IonCardContent>
                <IonGrid>
                  <IonRow>
                    <IonCol size='2'>
                    <img src={locationSharp}/>
                    </IonCol>
                    <IonCol>
                    
                    <IonLabel>
                    Your current location <br/>
                    {laundryCtx.location.latitude}, {laundryCtx.location.longitude}
                    </IonLabel>
                    
                    </IonCol>
                    <div className='ion-text-end'> <IonButton fill='clear' routerLink='/location'><IonIcon slot="icon-only" icon={chevronDownOutline}></IonIcon></IonButton></div>
                  </IonRow>
                </IonGrid>
                </IonCardContent>
              </IonCard> */}

            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonLabel><b>By Type</b></IonLabel>
            </IonCol>
          </IonRow>
          <IonRow className='ion-text-center'>
            <IonCol>
              <IonCard routerLink='/kilo'>
                <IonCardContent>
                  <IonIcon icon={kiloan} size="large"></IonIcon>
                </IonCardContent>
              </IonCard>
              Kilos
            </IonCol>
            <IonCol>
            <IonCard routerLink='/unit'>
                <IonCardContent>
                  <IonIcon icon={unit} size="large"></IonIcon>
                </IonCardContent>
              </IonCard>
              Unit
            </IonCol>
            <IonCol>
            <IonCard routerLink='/other'>
                <IonCardContent>
                <IonIcon icon={other} size="large"></IonIcon>
                </IonCardContent>
              </IonCard>
              Other Type
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonLabel><b>Browse Outlets</b></IonLabel>
            </IonCol>
          </IonRow>
          <IonRow className='ion-text-center'>
            <IonCol>
            <IonCard routerLink='/outlets'>
                <IonCardContent>
                <IonIcon icon={all} size="large"></IonIcon>
                </IonCardContent>
              </IonCard>
              All
            </IonCol>
            <IonCol>
            <IonCard routerLink='/nearby'>
                <IonCardContent>
                <IonIcon icon={nearby} size="large"></IonIcon>
                </IonCardContent>
              </IonCard>
              Nearby
            </IonCol>
            <IonCol>
            <IonCard routerLink='/courier'>
                <IonCardContent>
                <IonIcon icon={courier} size="large"></IonIcon>
                </IonCardContent>
              </IonCard>
              Courier
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonLabel><b>Special Promo</b></IonLabel>
            </IonCol>
          </IonRow>
          <IonRow className='ion-text-center'>
            <IonCol>
            <Swiper modules={[Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}>
                        <SwiperSlide>
                            <IonCard className='promo' routerLink='/navi/promos'>
                              <img src={laundry1}/>
                            <div className='overlay'><b>Free Delivery</b><br/>25 May - 30 June 2022</div>
                            </IonCard>
                        </SwiperSlide>
                        <SwiperSlide>
                        <IonCard className='promo' routerLink='/navi/promos'>
                              <img src={laundry2}/>
                            <div className='overlay'><b>10% Discount</b><br/>25 May - 30 June 2022</div>
                            </IonCard>
                        </SwiperSlide>
                        <SwiperSlide>
                        <IonCard className='promo' routerLink='/navi/promos'>
                              <img src={laundry3}/>
                            <div className='overlay'><b>35% Discount</b><br/>25 May - 30 June 2022</div>
                            </IonCard>
                        </SwiperSlide>
                        </Swiper>

            </IonCol>
          </IonRow>
            </IonGrid>
          
          </IonCol>

          </IonRow>
         
         

        </IonGrid>

       
       
      </IonContent>
    </IonPage>
  );
};

export default Home;
