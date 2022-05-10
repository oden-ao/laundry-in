import { isPlatform } from '@ionic/core';
import { Redirect, Route } from 'react-router-dom';
import { IonButton, IonRouterOutlet, IonCard, IonList, IonItem, IonAvatar, IonCardTitle, IonCardHeader, IonLabel, IonRow, IonCol, IonGrid, IonContent, IonButtons, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, IonBackButton, IonSearchbar, IonChip, IonItemDivider, IonCardContent } from '@ionic/react';
import { giftOutline, location, notificationsOutline, chevronDownOutline, locationOutline, locationSharp } from 'ionicons/icons';
import {Geolocation} from '@capacitor/geolocation';
import {GoogleMap, InfoWindow, LoadScript, Marker} from '@react-google-maps/api';

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
import LaundryContext from '../data/laundry-context';

import './Home.css'

const Home: React.FC = () => {
  const google = window.google;
  
  const laundryCtx = useContext(LaundryContext);
  const [locName, setlocname] = useState<string>("default");

  //map functionality
  const [selectedLat, setLat] = useState<number>(1);
  const [selectedLng, setLng] = useState<number>(1);


  const getCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition({enableHighAccuracy:true});
    console.log('Current position:', coordinates);
    console.log('Lat:', coordinates.coords.latitude);
    console.log('Lng:', coordinates.coords.longitude);
    setLat(coordinates.coords.latitude);
    setLng(coordinates.coords.longitude);
  };

  useEffect(()=>{
    getCurrentPosition();
    laundryCtx.chooseLocation(selectedLat, selectedLng);
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='tertiary'>
          <IonTitle>LaundryIn</IonTitle>
          <IonButtons slot='end'>
            <IonButton slot="icon-only"><IonIcon icon={giftOutline}></IonIcon></IonButton>
            <IonButton slot="icon-only"><IonIcon icon={notificationsOutline}></IonIcon></IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <IonGrid>
          <IonRow>
          <IonCol size-sm='8' offset-sm='2' size-md="6" offset-md="3">
            <IonGrid>
            <IonRow>
            <IonCol>
              <h3>Hola! Welcome back,</h3>
              <h1>Boba Fett</h1>
            </IonCol>
          </IonRow>


          
          <IonRow>
            <IonCol>

              <IonCard>
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
              </IonCard>

            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonLabel>By Type</IonLabel>
            </IonCol>
          </IonRow>
          <IonRow className='ion-text-center'>
            <IonCol>
              <IonCard>
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
            <IonCard>
                <IonCardContent>
                <IonIcon icon={other} size="large"></IonIcon>
                </IonCardContent>
              </IonCard>
              Other Type
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonLabel>Browse Outlets</IonLabel>
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
            <IonCard>
                <IonCardContent>
                <IonIcon icon={nearby} size="large"></IonIcon>
                </IonCardContent>
              </IonCard>
              Nearby
            </IonCol>
            <IonCol>
            <IonCard>
                <IonCardContent>
                <IonIcon icon={courier} size="large"></IonIcon>
                </IonCardContent>
              </IonCard>
              Courier
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonLabel>Special Promo</IonLabel>
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
                            <IonCard className='promo'>
                              <img src={laundry1}/>
                            <div className='overlay'><b>Free Delivery</b><br/>15 May-15 June 2022</div>
                            </IonCard>
                        </SwiperSlide>
                        <SwiperSlide>
                        <IonCard className='promo'>
                              <img src={laundry1}/>
                            <div className='overlay'><b>Free Delivery</b><br/>15 May-15 June 2022</div>
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
