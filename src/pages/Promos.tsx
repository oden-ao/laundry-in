import { isPlatform } from '@ionic/core';
import { Redirect, Route } from 'react-router-dom';
import { IonButton, IonModal, IonFooter, IonRouterOutlet, IonCard, IonList, IonItem, IonAvatar, IonCardTitle, IonCardHeader, IonLabel, IonRow, IonCol, IonGrid, IonContent, IonButtons, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, IonBackButton, IonSearchbar, IonChip, IonItemDivider, IonCardContent, IonToast } from '@ionic/react';
import { giftOutline, location, notificationsOutline, chevronDownOutline, close } from 'ionicons/icons';
import {GoogleMap, InfoWindow, LoadScript, Marker} from '@react-google-maps/api';
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import LaundryContext from '../data/laundry-context';
import laundry1 from '../images/laundry1.jpg'
import laundry2 from '../images/laundry2.jpg'
import laundry3 from '../images/laundry3.png'

import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import {getAuth, onAuthStateChanged, updateProfile, updatePassword} from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import {getDownloadURL, getStorage, ref, uploadBytes, UploadResult} from "firebase/storage";

const Promos: React.FC = () => {
  const [freeDelivery, setFreeDelivery] = useState(false);
  const [tenDiscount, setTenDiscount] = useState(false);
  const [otherDiscount, setOtherDiscount] = useState(false);
  const [coins, setCoins] = useState(0);

  const openDelivery = () => {
    setFreeDelivery(true);
  }
  const closeDelivery = () => {
    setFreeDelivery(false);
  }

  const openTen = () => {
    setTenDiscount(true);
  }
  const closeTen = () => {
    setTenDiscount(false);
  }

  const openOther = () => {
    setOtherDiscount(true);
  }
  const closeOther = () => {
    setOtherDiscount(false);
  }

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    getCoins();
  }, [coins, otherDiscount]);
  

  async function getCoins() {
    const db = getFirestore();
    const docRef = doc(db, user!.uid.toString(), "coins");
    const docSnap = await getDoc(docRef);
    const coins = docSnap.get("coins");
    console.log("Getting coins");
    setCoins(coins);
  }

  const spendCoins = async () => {
    const db = getFirestore();
    const coinsRef = doc(db, user!.uid, "coins")
    const docSnap = await getDoc(coinsRef);
    const coins = docSnap.get("coins");
    await updateDoc(coinsRef, {
     coins: coins - 150})
  }

  const redeemPromo = async () => {
    const db = getFirestore();
    const promoRef = doc(db, user!.uid, "promos")
    const docSnap = await getDoc(promoRef);
    const otherPromo = docSnap.get("otherDiscount");
    await updateDoc(promoRef, {
     otherDiscount: otherPromo + 1 })
  }
  const [toastMessage, setToastMessage] = useState('');
  const history = useHistory();

  const redeemPromoHandler = () => {
    if(coins>=150){
      spendCoins();
    redeemPromo();
    setToastMessage("Promo redeemed");
    setOtherDiscount(false);
    }
  }

  return (
    <IonPage>

<IonToast isOpen={!!toastMessage}
                    message={toastMessage}
                    duration={1500}
                    onDidDismiss={() => {setToastMessage('')}}/>

      <IonModal isOpen={freeDelivery}>
      <IonHeader>
        <IonToolbar color='primary'>
          <IonButtons slot='start'>
          <IonButton fill="clear" onClick={closeDelivery}>
          <IonIcon icon={close} slot="icon-only"></IonIcon>
          </IonButton>
          </IonButtons>
          <IonTitle>Free Delivery</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <img src={laundry1}></img>
      <IonGrid>
      <IonRow>
        <IonCol>
          <h2><b>Free Delivery</b></h2> <br/>
          <b>Promo Period: 25 May - 30 June 2022</b><br/><br/>
          Free delivery for all orders with no minimum! No coins nor claiming required! Simply choose this promo on your checkout and you're all set.
          <br/><br/>Three usages per user.
        </IonCol>
      </IonRow>
      </IonGrid>
      
      </IonContent>
     
      <IonFooter>
                   <IonToolbar>
                   <IonButton color='success' expand='block'>Already Redeemed</IonButton>
                   </IonToolbar>
      </IonFooter>
      </IonModal>


      <IonModal isOpen={tenDiscount}>
      <IonHeader>
        <IonToolbar color='primary'>
          <IonButtons slot='start'>
          <IonButton fill="clear" onClick={closeTen}>
          <IonIcon icon={close} slot="icon-only"></IonIcon>
          </IonButton>
          </IonButtons>
          <IonTitle>10% Discount</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <img src={laundry2}></img>
      <IonGrid>
      <IonRow>
        <IonCol>
          <h2><b>10% Discount</b></h2> <br/>
          <b>Promo Period: 25 May - 30 June 2022</b><br/><br/>
          Ten percent off all orders with a minimum of 50,000 IDR per transaction. No coins nor claiming required! Simply choose this promo on your checkout and you're all set.
          <br/><br/>Five usages per user.
        </IonCol>
      </IonRow>
      </IonGrid>
      
      </IonContent>
     
      <IonFooter>
                   <IonToolbar>
                   <IonButton color='success' expand='block'>Already Redeemed</IonButton>
                   </IonToolbar>
      </IonFooter>
      </IonModal>


      <IonModal isOpen={otherDiscount}>
      <IonHeader>
        <IonToolbar color='primary'>
          <IonButtons slot='start'>
          <IonButton fill="clear" onClick={closeOther}>
          <IonIcon icon={close} slot="icon-only"></IonIcon>
          </IonButton>
          </IonButtons>
          <IonTitle>35% Discount</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <img src={laundry3}></img>
      <IonGrid>
      <IonRow>
        <IonCol>
          <h2><b>35% Discount for Other</b></h2> <br/>
          <b>Promo Period: 25 May - 30 June 2022</b><br/><br/>
          Thirty five percent discount for orders with the "Other" type. Has a minimum of 75,000 IDR per transaction.
          <br/>This promo is redeemable with coins. Redeem it and then use it during your check out.
          <br/><br/>One usage per redeem. Can be repeatedly redeemed as long as the promotion lasts.
        </IonCol>
      </IonRow>
      </IonGrid>
      
      </IonContent>
     
      <IonFooter>
        {coins>=150?<IonToolbar>
                   <IonCol className='ion-text-center'>You currently have <b>{coins} coins</b>.</IonCol>
                   <IonButton expand='block' onClick={redeemPromoHandler}>150 Coins</IonButton>
                   </IonToolbar>:
                   <IonToolbar>
                   <IonCol className='ion-text-center'>You currently have <b>{coins} coins</b>. Coins insufficient.</IonCol>
                   <IonButton color='danger' expand='block'>150 Coins</IonButton>
                   </IonToolbar>}
                   
      </IonFooter>
      </IonModal>



      <IonHeader>
        <IonToolbar color='primary'>
          <IonTitle>Promotions</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <IonGrid>
          <IonRow>
            <IonCol size-sm='8' offset-sm='2' size-md="6" offset-md="3">
              <IonCard onClick={openDelivery}>
              <img src={laundry1}/>
                  <IonCardHeader>
                    <IonCardTitle>
                      Free Delivery
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    Promo Period 25 May - 30 June 2022
                  </IonCardContent>

              </IonCard>


              <IonCard onClick={openTen}>
              <img src={laundry2}/>
                  <IonCardHeader>
                    <IonCardTitle>
                      10% Discount
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    Promo Period 25 May - 30 June 2022
                  </IonCardContent>

              </IonCard>

              <IonCard onClick={openOther}>
              <img src={laundry3}/>
                  <IonCardHeader>
                    <IonCardTitle>
                      35% Discount For Other Type
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    Promo Period 25 May - 30 June 2022
                  </IonCardContent>

              </IonCard>

            </IonCol>
          </IonRow>
        </IonGrid>

       
       
      </IonContent>
    </IonPage>
  );
};

export default Promos;
