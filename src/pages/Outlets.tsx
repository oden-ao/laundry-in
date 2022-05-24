import { isPlatform } from '@ionic/core';
import { Redirect, Route } from 'react-router-dom';
import { IonButton, IonCardSubtitle, IonCardContent, IonRouterOutlet, IonCard, IonList, IonItem, IonAvatar, IonCardTitle, IonCardHeader, IonLabel, IonRow, IonCol, IonGrid, IonContent, IonButtons, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, IonBackButton, IonSearchbar, IonChip, IonItemDivider, IonModal, IonFooter } from '@ionic/react';
import { locationSharp, chevronDownOutline, close, phonePortrait, callOutline } from 'ionicons/icons';
import {GoogleMap, InfoWindow, LoadScript, Marker} from '@react-google-maps/api';
import { useContext, useEffect, useState } from 'react';
import { convertDistance, getDistance } from 'geolib';
import { Rating } from 'react-simple-star-rating'

import courier from '../images/SVG/delivery.svg'

import LaundryContext from '../data/laundry-context';
import './Outlets.css';

const Outlets: React.FC = () => {
  const google = window.google;
  const containerStyle = {
    width:'100%',
    height: '150px',
    margin:'auto'
  };

  const [selectedLat, setLat] = useState<number>(0);
  const [selectedLng, setLng] = useState<number>(0);
  
  
  const laundryCtx = useContext(LaundryContext);
  const [locName, setlocname] = useState<string>("primary");
  
  const [filterCourier, setfilterCourier] = useState(false);
  const [courierChip, setCourierChip] = useState<string>("");
  const [currOutlets, setOutlets] = useState(laundryCtx.outlets);

  const [sortNearby, setNearby] = useState(false);
  const [nearbyChip, setNearbyChip] = useState<string>("");

  const [sortBest, setBest] = useState(false);
  const [bestChip, setBestChip] = useState<string>("");


  const filterCourierHandler = () =>{
    
    if(filterCourier===false){
      setOutlets(currOutlets.filter(outlet => outlet.courier === 'yes'));
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
      setOutlets(currOutlets.sort((a,b) => a.distance - b.distance));
      setNearby(!sortNearby);
      setNearbyChip("primary");
      console.log(currOutlets.sort((a,b) => a.distance - b.distance));
    }
    if(sortNearby===true){
      setOutlets(currOutlets.sort((a,b) => a.id.localeCompare(b.id)));
      setNearby(!sortNearby);
      setNearbyChip("");
    }
  }

  const sortBestHandler = () =>{
    
    if(sortBest===false){
      setOutlets(currOutlets.sort((a,b) => b.rating - a.rating));
      setBest(!sortBest);
      setBestChip("primary");
    }
    if(sortBest===true){
      setOutlets(currOutlets.sort((a,b) => a.id.localeCompare(b.id)));
      setBest(!sortBest);
      setBestChip("");
    }
  }

  const [selectOutlet, setSelectOutlet] = useState(false);

  const chooseOutletHandler = (outletId: string) => {
    const outlet = laundryCtx.outlets.find(o=> o.id === outletId);
    setChosenOutlet(outlet);
    setSelectOutlet(true);
};

const closeOutletHandler = () => {
  setSelectOutlet(false);
};

const [chosenOutlet, setChosenOutlet] = useState<{
  imageSrc: string;
  name: string;
  location: string;
  address: string;
  phone: string;
  hours: string;
  llat: number;
  llng: number;
  id: string;
  courier: string;
  rating: number;
  distance: number;
  fee: number;} | null>();

  const [searchText, setSearchText] = useState('');


  useEffect(()=>{
    laundryCtx.updateDistance(laundryCtx.location.latitude, laundryCtx.location.longitude);
    const searchResult = laundryCtx.outlets.filter(outlet => outlet.name.includes(searchText));
    if(filterCourier == true){
      setOutlets(searchResult.filter(outlet => outlet.courier === 'yes'));
    } else
    setOutlets(searchResult);
  },[searchText]);


  return (
    <IonPage>

      <IonModal isOpen={selectOutlet}>
      <IonHeader>
        <IonToolbar color='primary'>
          <IonButtons slot='start'>
          <IonButton fill="clear" onClick={closeOutletHandler}>
          <IonIcon icon={close} slot="icon-only"></IonIcon>
          </IonButton>
          </IonButtons>
          <IonTitle>{chosenOutlet?.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <img src={chosenOutlet?.imageSrc}></img>
      <IonGrid>
        <IonRow>
        <IonCol size-sm='8' offset-sm='2' size-md="6" offset-md="3">
        <IonRow>
          <IonCol>
          <h2><b>{chosenOutlet?.name}</b></h2>
          <Rating readonly={true}
                 ratingValue={chosenOutlet?.rating?chosenOutlet!.rating:100}/>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            {chosenOutlet?.distance.toLocaleString()} meters away | {chosenOutlet?.location}<br/>
            {chosenOutlet?.address}<br/>
            {chosenOutlet?.hours}
            <br/><br/>
                  
                 
                 {chosenOutlet?.courier==="yes"?<IonLabel>Courier Ready <IonIcon icon={courier}></IonIcon></IonLabel>:<IonLabel>Courier unavailable</IonLabel>}<br/>
                 <IonIcon icon={callOutline}/>{chosenOutlet?.phone}<br/>

                 

                 
                 
          </IonCol>
        </IonRow>
        
        </IonCol>
        </IonRow>
      </IonGrid>
      
      </IonContent>
      <IonFooter>
                   <IonToolbar>
                   <IonButton expand='block'>Contact on WhatsApp</IonButton>
                   </IonToolbar>
      </IonFooter>
      </IonModal>

      <IonHeader>
        <IonToolbar color='primary'>
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
             
             <IonCardHeader>
               
               <IonCardSubtitle>
               <IonIcon icon={locationSharp}></IonIcon>Your Current Location</IonCardSubtitle>


               <div className='locbtn'> <IonButton fill='clear' routerLink='/location'><IonIcon slot="icon-only" icon={chevronDownOutline}></IonIcon></IonButton></div>

               </IonCardHeader>
         <GoogleMap
         mapContainerStyle={containerStyle}
         center={laundryCtx.location==={latitude: 0, longitude: 0}?{lat:selectedLat, lng:selectedLng}:{lat: laundryCtx.location.latitude, lng: laundryCtx.location.longitude}}
         zoom={18}><></>
         <Marker position={laundryCtx.location==={latitude: 0, longitude: 0}?{lat:selectedLat, lng:selectedLng}:{lat: laundryCtx.location.latitude, lng: laundryCtx.location.longitude}}/>
         </GoogleMap>
           </IonCard>

            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
            <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value!)}>

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
              <IonChip onClick={sortBestHandler} color={bestChip}>
                <IonLabel>Best rated
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
          <IonItem key={outlet.id} onClick={chooseOutletHandler.bind(null, outlet.id)}>
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
                  {outlet.courier==="yes"?<IonLabel>Courier Ready <IonIcon icon={courier}></IonIcon></IonLabel>:<br/>}
                  </IonLabel>
                  <br/>
                  <Rating readonly={true}
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
