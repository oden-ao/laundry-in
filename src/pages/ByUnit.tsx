import { isPlatform } from '@ionic/core';
import { Redirect, Route } from 'react-router-dom';
import { IonButton, IonCardContent, IonRouterOutlet, IonCard, IonList, IonItem, IonAvatar, IonCardTitle, IonCardHeader, IonLabel, IonRow, IonCol, IonGrid, IonContent, IonButtons, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, IonBackButton, IonSearchbar, IonChip, IonItemDivider, IonListHeader, IonFooter } from '@ionic/react';
import { locationSharp, chevronDownOutline, arrowForward, arrowBack, arrowBackCircle, removeCircle, addCircle, cartOutline } from 'ionicons/icons';
import {GoogleMap, InfoWindow, LoadScript, Marker} from '@react-google-maps/api';
import { useContext, useEffect, useState } from 'react';
import { convertDistance, getDistance } from 'geolib';
import { Rating } from 'react-simple-star-rating'

import shirt from '../images/SVG/Shirt.svg'
import pantsimg from '../images/SVG/Pants.svg'
import blazer from '../images/SVG/Blazer.svg'

import LaundryContext from '../data/laundry-context';
import './ByUnit.css';

const ByUnit: React.FC = () => {
  
  const laundryCtx = useContext(LaundryContext);
  const [shirts, setShirts] = useState<number>(0);
  const [pants, setPants] = useState<number>(0);
  const [blazers, setBlazers] = useState<number>(0);

  useEffect(()=>{
  },[])
  
  const addShirt = () =>{
    setShirts(shirts + 1)
  }
  const removeShirt = () =>{
    if (shirts > 0){
      setShirts(shirts - 1)
    }
  }

  const addPants = () =>{
    setPants(pants + 1)
  }
  const removePants = () =>{
    if (pants > 0){
      setPants(pants - 1)
    }
  }

  const addBlazers = () =>{
    setBlazers(blazers + 1)
  }
  const removeBlazers = () =>{
    if (blazers > 0){
      setBlazers(blazers - 1)
    }
  }

  const total = (shirts * 15000) + (pants * 20000) + (blazers * 30000);
  const quantity = shirts + pants + blazers ;



  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='tertiary'>
        <IonButtons slot='start'>
            <IonBackButton defaultHref='/navi/home'></IonBackButton>
          </IonButtons>
          <IonTitle>Unit</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              
              <IonList>
                <IonListHeader>
                Select clothes by unit
                </IonListHeader>

                <IonItem>
                <IonCol>
                  <img src={shirt}/>
                  </IonCol>
                  <IonCol>
                  <b>Shirts</b>
                  </IonCol>
                  <IonCol>
                  IDR 15.000
                  </IonCol>
                  <IonCol className='ion-text-center' size='1.5'>
                  <IonButton onClick={removeShirt} fill="clear" className='arrows'><IonIcon slot='icon-only' icon={removeCircle}></IonIcon></IonButton>
                  </IonCol>
                  <IonCol className='nowrap' size='1'>
                  {shirts}
                  </IonCol>
                  <IonCol className='ion-text-center' size='1.5'>
                  <IonButton onClick={addShirt} fill="clear" className='arrows'><IonIcon slot='icon-only' icon={addCircle}></IonIcon></IonButton>
                  </IonCol>
                </IonItem>

                <IonItem>
                <IonCol>
                  <img src={pantsimg}/>
                  </IonCol>
                  <IonCol>
                  <b>Pants</b>
                  </IonCol>
                  <IonCol>
                  IDR 20.000
                  </IonCol>
                  <IonCol className='ion-text-center' size='1.5'>
                  <IonButton onClick={removePants} fill="clear" className='arrows'><IonIcon slot='icon-only' icon={removeCircle}></IonIcon></IonButton>
                  </IonCol>
                  <IonCol className='nowrap' size='1'>
                  {pants}
                  </IonCol>
                  <IonCol className='ion-text-center' size='1.5'>
                  <IonButton onClick={addPants} fill="clear" className='arrows'><IonIcon slot='icon-only' icon={addCircle}></IonIcon></IonButton>
                  </IonCol>
                </IonItem>

                <IonItem>
                <IonCol>
                  <img src={blazer}/>
                  </IonCol>
                  <IonCol>
                  <b>Blazers</b>
                  </IonCol>
                  <IonCol>
                  IDR 30.000
                  </IonCol>
                  <IonCol className='ion-text-center' size='1.5'>
                  <IonButton onClick={removeBlazers} fill="clear" className='arrows'><IonIcon slot='icon-only' icon={removeCircle}></IonIcon></IonButton>
                  </IonCol>
                  <IonCol className='nowrap' size='1'>
                  {blazers}
                  </IonCol>
                  <IonCol className='ion-text-center' size='1.5'>
                  <IonButton onClick={addBlazers} fill="clear" className='arrows'><IonIcon slot='icon-only' icon={addCircle}></IonIcon></IonButton>
                  </IonCol>
                </IonItem>

              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>
       
      </IonContent>
      <IonFooter>
        <IonToolbar color='tertiary'>
        <IonButtons slot='end'>
          <IonButton fill='clear'><IonIcon slot='icon-only' icon={arrowForward}></IonIcon></IonButton>
          </IonButtons>
          <IonTitle>IDR {total} | {quantity} items added</IonTitle>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default ByUnit;
