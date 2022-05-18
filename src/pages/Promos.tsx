import { isPlatform } from '@ionic/core';
import { Redirect, Route } from 'react-router-dom';
import { IonButton, IonRouterOutlet, IonCard, IonList, IonItem, IonAvatar, IonCardTitle, IonCardHeader, IonLabel, IonRow, IonCol, IonGrid, IonContent, IonButtons, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, IonBackButton, IonSearchbar, IonChip, IonItemDivider, IonCardContent } from '@ionic/react';
import { giftOutline, location, notificationsOutline, chevronDownOutline } from 'ionicons/icons';
import {GoogleMap, InfoWindow, LoadScript, Marker} from '@react-google-maps/api';
import { useContext, useEffect, useState } from 'react';
import LaundryContext from '../data/laundry-context';
import laundry1 from '../images/laundry1.jpg'

const Promos: React.FC = () => {
  const laundryCtx = useContext(LaundryContext);
  const [locName, setlocname] = useState<string>("default");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='primary'>
          <IonTitle>Promotions</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <IonGrid>
          <IonRow>
            <IonCol size-sm='8' offset-sm='2' size-md="6" offset-md="3">
              <IonCard>
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
            </IonCol>
          </IonRow>
        </IonGrid>

       
       
      </IonContent>
    </IonPage>
  );
};

export default Promos;
