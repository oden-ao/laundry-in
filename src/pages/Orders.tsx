import { isPlatform } from '@ionic/core';
import { Redirect, Route } from 'react-router-dom';
import { IonButton, IonRouterOutlet, IonCard, IonList, IonItem, IonAvatar, IonCardTitle, IonCardHeader, IonLabel, IonRow, IonCol, IonGrid, IonContent, IonButtons, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, IonBackButton, IonSearchbar, IonChip, IonItemDivider, IonAccordion, IonCardSubtitle, IonCardContent, IonText } from '@ionic/react';
import { giftOutline, location, notificationsOutline, chevronDownOutline, chatboxEllipsesOutline } from 'ionicons/icons';
import {GoogleMap, InfoWindow, LoadScript, Marker} from '@react-google-maps/api';
import { useContext, useEffect, useState } from 'react';
import LaundryContext from '../data/laundry-context';
import './Orders.css';
import kiloan from '../images/SVG/kiloan.svg'

const Orders: React.FC = () => {
  const laundryCtx = useContext(LaundryContext);
  const [locName, setlocname] = useState<string>("default");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='primary'>
          <IonTitle>Orders</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <IonGrid>
          
          {laundryCtx.orders.length ===0?
          <IonRow className='ion-text-center'>
          <IonCol>
            <br/>
            <IonText>
              <h3>You haven't placed any orders yet!</h3>
            </IonText>
            
          </IonCol>
          </IonRow>:
          <IonRow>
          <IonCol size-sm='8' offset-sm='2' size-md="6" offset-md="3">
          {laundryCtx.orders.sort((a,b) => b.num - a.num).map(order => (
            <IonCard key={order.num}>
              <div className='status'>
              <IonButton fill='clear'><IonIcon icon={chatboxEllipsesOutline} slot='icon-only'></IonIcon></IonButton>
            </div>
              <IonCardHeader>
                <IonCardTitle>ORDER NO # {order.num}</IonCardTitle>
                <IonCardSubtitle>Order Type: {order.type}</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <IonRow>
                  <IonCol>
                    Status
                  </IonCol>
                  <IonCol className='ion-text-end'>
                    IN PROGRESS
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol>
                    Date & Time
                  </IonCol>
                  <IonCol className='ion-text-end'>
                    {order.date}
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol>
                    Delivery Time
                  </IonCol>
                  <IonCol className='ion-text-end'>
                  {order.deliverydate}
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol>
                    Address
                  </IonCol>
                  <IonCol className='ion-text-end'>
                  Ruko Pascal Timur No. 8 Lt.2, Gading Serpong
                  </IonCol>
                </IonRow>

                <IonItemDivider></IonItemDivider>

                <IonRow>
                  <IonCol>
                    Sub Total
                  </IonCol>
                  <IonCol className='ion-text-end'>
                  IDR {order.price.toLocaleString()}
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol>
                    Delivery
                  </IonCol>
                  <IonCol className='ion-text-end'>
                  IDR {order.delivery.toLocaleString()}
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol>
                    <h1>Total</h1>
                  </IonCol>
                  <IonCol className='ion-text-end'>
                  <h1>IDR {order.total.toLocaleString()}</h1>
                  </IonCol>
                </IonRow>
                
              </IonCardContent>
            </IonCard>
          ))}

          </IonCol>
                    </IonRow>
              }
            


        </IonGrid>

       
       
      </IonContent>
    </IonPage>
  );
};

export default Orders;
