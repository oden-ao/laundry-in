import { isPlatform } from '@ionic/core';
import { Redirect, Route } from 'react-router-dom';
import { IonButton, IonModal, IonFooter, IonRouterOutlet, IonCard, IonList, IonItem, IonAvatar, IonCardTitle, IonCardHeader, IonLabel, IonRow, IonCol, IonGrid, IonContent, IonButtons, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, IonBackButton, IonSearchbar, IonChip, IonItemDivider, IonCardContent } from '@ionic/react';
import { giftOutline, location, notificationsOutline, chevronDownOutline, close } from 'ionicons/icons';
import {GoogleMap, InfoWindow, LoadScript, Marker} from '@react-google-maps/api';
import { useContext, useEffect, useState } from 'react';
import LaundryContext from '../data/laundry-context';
import laundry1 from '../images/laundry1.jpg'
import laundry2 from '../images/laundry2.jpg'
import laundry3 from '../images/laundry3.png'

const Promos: React.FC = () => {
  const [freeDelivery, setFreeDelivery] = useState(false);
  const [tenDiscount, setTenDiscount] = useState(false);
  const [otherDiscount, setOtherDiscount] = useState(false);

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

  return (
    <IonPage>

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
          <b>Promo Period: 01 March - 15 March 2022</b><br/><br/>
          Free delivery for all orders with no minimum! No coins required! Simply choose this promo on your checkout and you're all set.
          <br/>Three usages per user.
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
                    Promo Period 01 March - 15 March 2022
                  </IonCardContent>

              </IonCard>


              <IonCard>
              <img src={laundry2}/>
                  <IonCardHeader>
                    <IonCardTitle>
                      10% Discount
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    Promo Period 11 April - 25 April 2022
                  </IonCardContent>

              </IonCard>

              <IonCard>
              <img src={laundry3}/>
                  <IonCardHeader>
                    <IonCardTitle>
                      35% Discount For Other Type
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    Promo Period 11 April - 25 April 2022
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
