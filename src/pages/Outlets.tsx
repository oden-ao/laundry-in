import { isPlatform } from '@ionic/core';
import { Redirect, Route } from 'react-router-dom';
import { IonButton, IonCardContent, IonRouterOutlet, IonCard, IonList, IonItem, IonAvatar, IonCardTitle, IonCardHeader, IonLabel, IonRow, IonCol, IonGrid, IonContent, IonButtons, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, IonBackButton, IonSearchbar, IonChip, IonItemDivider } from '@ionic/react';
import { locationSharp, chevronDownOutline } from 'ionicons/icons';
import {GoogleMap, InfoWindow, LoadScript, Marker} from '@react-google-maps/api';
import { useContext, useEffect, useState } from 'react';
import { convertDistance, getDistance } from 'geolib';
import { Rating } from 'react-simple-star-rating'

import courier from '../images/SVG/delivery.svg'

import LaundryContext from '../data/laundry-context';
import './Outlets.css';

const Outlets: React.FC = () => {
  const google = window.google;
  
  const laundryCtx = useContext(LaundryContext);
  const [locName, setlocname] = useState<string>("tertiary");
  
  const [filterCourier, setfilterCourier] = useState(false);
  const [courierChip, setCourierChip] = useState<string>("");
  const [currOutlets, setOutlets] = useState(laundryCtx.outlets);

  const [sortNearby, setNearby] = useState(false);
  const [nearbyChip, setNearbyChip] = useState<string>("");

  const courierReady = laundryCtx.outlets.filter(outlet => outlet.courier === 'yes');
  const nearby = laundryCtx.outlets.sort((a,b) => a.distance - b.distance)

  const filterCourierHandler = () =>{
    
    if(filterCourier===false){
      setOutlets(courierReady);
      setfilterCourier(!filterCourier);
      setCourierChip("primary");
      console.log(filterCourier)
      console.log(currOutlets);
    }
    if(filterCourier===true){
      setOutlets(laundryCtx.outlets);
      setfilterCourier(!filterCourier);
      setCourierChip("");
      console.log(filterCourier)
      console.log(currOutlets);
    }
  }

  const sortNearbyHandler = () =>{
    
    if(sortNearby===false){
      setOutlets(nearby);
      setNearby(!sortNearby);
      setNearbyChip("primary");
    }
    if(sortNearby===true){
      setOutlets(laundryCtx.outlets);
      setNearby(!sortNearby);
      setNearbyChip("");
    }
  }

  const calcDistance = (outletlat: number, outletlng: number) =>{
    getDistance(
      { latitude: laundryCtx.location.latitude, longitude: laundryCtx.location.longitude },
      { latitude: outletlat , longitude: outletlng })
  }

  // var geocoder = new google.maps.Geocoder();
  // var latlng = new google.maps.LatLng(laundryCtx.location.latitude, laundryCtx.location.longitude);
  

  // const latlng = {
  //   lat: laundryCtx.location.latitude,
  //   lng: laundryCtx.location.longitude,
  // };

  // useEffect(()=>{
  //   new google.maps.Geocoder().geocode({ location: latlng }).then((response) => {
  //     const address = response.results[0].formatted_address;
  //     setlocname(address);
  //   });

  // //   geocoder.geocode({ location: latlng },  (results, status) =>{
  // //     if (status !== google.maps.GeocoderStatus.OK) {
  // //         alert(status);
  // //     }
  // //     // This is checking to see if the Geoeode Status is OK before proceeding
  // //     if (status == google.maps.GeocoderStatus.OK) {
  // //         console.log(results);
  // //         var address = (results[0].formatted_address);
  // //     }
  // // });


  useEffect(()=>{
  },[])


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='tertiary'>
        <IonButtons slot='start'>
            <IonBackButton defaultHref='/navi/home'></IonBackButton>
          </IonButtons>
          <IonTitle>Outlets</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
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
            <IonSearchbar>

            </IonSearchbar>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonChip onClick={filterCourierHandler} color={courierChip}>
                <IonLabel>Courier
                </IonLabel>
              </IonChip>
              <IonChip onClick={sortNearbyHandler} color={nearbyChip}>
                <IonLabel>Nearby
                </IonLabel>
              </IonChip>
            </IonCol>
          </IonRow>
          <IonRow>
          <IonItemDivider></IonItemDivider>
          </IonRow>
        </IonGrid>
       <IonList>
       {currOutlets.map(outlet => (
          <IonItem key={outlet.id}>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <img src={outlet.imageSrc} className="outlet_img"></img>
                 </IonCol>
                  <IonCol>
                  <IonLabel>
                   <h2><b>{outlet.name}</b></h2><br/>
                   {outlet.distance>1000?
      convertDistance( getDistance(
        { latitude: laundryCtx.location.latitude, longitude: laundryCtx.location.longitude },
        { latitude: outlet.llat , longitude: outlet.llng }, 1000), 'km'):
        outlet.distance } 
          
          { outlet.distance>=1000?
      " km":" m"} | {outlet.location}<br/>
                  {outlet.courier==="yes"?<IonLabel>Courier Ready <IonIcon icon={courier}></IonIcon></IonLabel>:<IonLabel/>}
                  </IonLabel>
                  
                  <Rating
                 ratingValue={outlet.rating}/>
                </IonCol>
              </IonRow>
              
              
            </IonGrid>
            
          
        </IonItem>
        ))}
       </IonList>
       
       
      </IonContent>
    </IonPage>
  );
};

export default Outlets;
