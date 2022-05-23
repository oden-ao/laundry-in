import { isPlatform } from '@ionic/core';
import { Redirect, Route } from 'react-router-dom';
import { IonButton, IonRouterOutlet, IonCard, IonList, IonItem, IonAvatar, IonCardTitle, IonCardHeader, IonLabel, IonRow, IonCol, IonGrid, IonContent, IonButtons, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, IonBackButton, IonSearchbar, IonChip, IonItemDivider, IonCardContent, IonText, IonCardSubtitle } from '@ionic/react';
import { giftOutline, location, notificationsOutline, chevronDownOutline, locationOutline, locationSharp, gift, notifications } from 'ionicons/icons';
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
import header from '../images/SVG/Header.svg'
import LaundryContext from '../data/laundry-context';

import './Home.css'

const Home: React.FC = () => {
  const google = window.google;
  const containerStyle = {
    width:'100%',
    height: '150px',
    margin:'auto'
  };
  
  const laundryCtx = useContext(LaundryContext);
  const [locName, setlocname] = useState<string>("default");

  //map functionality
  const [selectedLat, setLat] = useState<number>(0);
  const [selectedLng, setLng] = useState<number>(0);


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

  useEffect(()=>{
    getCurrentPosition();
  },[selectedLat, selectedLng]);

  return (
    <IonPage>
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
              <div className='user'>Boba Fett</div>
            </IonCol>
            <IonCol>
            <div className='topbtn'>
              <IonButton fill="clear"><IonIcon className='white' slot='icon-only' icon={gift}></IonIcon></IonButton>
              <IonButton fill="clear"><IonIcon className='white' slot='icon-only' icon={notifications}></IonIcon></IonButton>
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
