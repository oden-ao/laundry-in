import { isPlatform } from '@ionic/core';
import { Redirect, Route } from 'react-router-dom';
import { IonButton, IonToast, IonLoading, IonCardContent, IonRouterOutlet, IonCard, IonList, IonItem, IonAvatar, IonCardTitle, IonCardHeader, IonLabel, IonRow, IonCol, IonGrid, IonContent, IonButtons, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, IonBackButton, IonSearchbar, IonChip, IonItemDivider, IonListHeader, IonFooter, IonModal, IonDatetime, IonBackdrop } from '@ionic/react';
import { locationSharp, chevronDownOutline, arrowForward, arrowBack, arrowBackCircle, removeCircle, addCircle, cartOutline, close } from 'ionicons/icons';
import {GoogleMap, InfoWindow, LoadScript, Marker} from '@react-google-maps/api';
import {Geolocation} from '@capacitor/geolocation';
import { useContext, useEffect, useState, useRef } from 'react';
import { convertDistance, getDistance } from 'geolib';
import { Rating } from 'react-simple-star-rating'
import { format, parseISO, getDate, getMonth, getYear, formatISO, add, parse } from 'date-fns';
import { useHistory } from 'react-router-dom';

import shirt from '../images/SVG/Shirt.svg'
import pantsimg from '../images/SVG/Pants.svg'
import blazer from '../images/SVG/Blazer.svg'
import courier from '../images/SVG/delivery.svg'

import LaundryContext from '../data/laundry-context';
import './ByUnit.css';

const ByUnit: React.FC = () => {

  const laundryCtx = useContext(LaundryContext);

  //map bs
  const containerStyle = {
    width:'100%',
    height:'100%',
    margin:'auto'
  };
 
  const history = useHistory();
  const [toastMessage, setToastMessage] = useState('');

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
  }, [])

  const selectPos = (e: google.maps.MapMouseEvent) => {
    if(e.latLng?.lat()){setLat(e.latLng?.lat());}
    if(e.latLng?.lng()){setLng(e.latLng?.lng());}
  }


  const chooseLocHandler = async () => {

    laundryCtx.chooseLocation(selectedLat, selectedLng);
    setChangeLoc(false);
    
  };

  const [changeLoc, setChangeLoc] = useState(false);

  const changeLocHandler = () =>{
    setChangeLoc(true);
  }
  const cancelLocHandler = () =>{
    setChangeLoc(false);
  }
  
  const [shirts, setShirts] = useState<number>(0);
  const [pants, setPants] = useState<number>(0);
  const [blazers, setBlazers] = useState<number>(0);
  const minDate = formatISO(add(new Date(), {days: 2}));

  const [selectedDate, setSelectedDate] = useState<string>(minDate);
  const [openDate, setOpenDate] = useState(false);

  const currDate = formatISO(new Date())
  
  const formatDate = (value: string) => {
    return format(parseISO(value), 'MMM dd yyyy kk:mm');
  };

  const [selectOutlet, setSelectOutlet] = useState(false);
  const [chosenOutlet, setChosenOutlet] = useState<{imageSrc: string,
    name: string,
    location: string,
    llat: number,
    llng: number,
    id: string,
    courier: string,
    rating: number,
    distance: number,
    fee: number} | null>();
    const [confirmScreen, setConfirmScreen] = useState(false);


  const selectOutletHandler = () => {
    setSelectOutlet(true);
};
const closeOutlet = () => {
  setSelectOutlet(false);
};

const confirmOrderHandler = () => {
  setConfirmScreen(true);
};

const closeOrderHandler = () => {
  setConfirmScreen(false);
};

  const chooseOutletHandler = (outletId: string) => {
    const outlet = laundryCtx.outlets.find(o=> o.id === outletId);
    setChosenOutlet(outlet);
    setSelectOutlet(false);
};

  const nearby = laundryCtx.outlets.filter(outlet => outlet.courier === 'yes').sort((a,b) => a.distance - b.distance)
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
  const quantity = shirts + pants + blazers;


  const placeOrderHandler = () =>{
    laundryCtx.addOrder(laundryCtx.orders.length + 1, formatDate(currDate) , formatDate(selectedDate), total, chosenOutlet!.fee, total + chosenOutlet!.fee);
    setConfirmScreen(false);
    setToastMessage('Order placed');
    history.length > 0 ? history.goBack(): history.replace('/navi/home');  
    // history.push('/navi/home');
    // history.goBack();
   }



  return (
    <IonPage>

          <IonToast isOpen={!!toastMessage}
                    message={toastMessage}
                    duration={1500}
                    onDidDismiss={() => {setToastMessage('')}}/>

      <IonModal isOpen={changeLoc}>
      <LoadScript googleMapsApiKey="AIzaSyCuO9hSvfXdsUG6UsVqo6q3ouqqhqN7f2A">
            <GoogleMap onClick={selectPos}
            mapContainerStyle={containerStyle}
            center={{lat:selectedLat, lng:selectedLng}}
            zoom={18}><></>
            <Marker position={{lat:selectedLat, lng:selectedLng}}/>
            </GoogleMap>
      </LoadScript>
      <IonGrid>
      <IonRow>
        <IonCol >
          <IonButton fill="clear" onClick={cancelLocHandler}>Cancel</IonButton>
        </IonCol>
        <IonCol >
          <IonButton onClick={chooseLocHandler}>Address Confirm</IonButton>
        </IonCol>
      </IonRow>
      </IonGrid>
      </IonModal>

      <IonModal isOpen={confirmScreen}>
      <IonHeader>
        <IonToolbar color='tertiary'>
          <IonButtons slot='start'>
          <IonButton fill="clear" onClick={closeOrderHandler}>
          <IonIcon icon={close} slot="icon-only"></IonIcon>
          </IonButton>
          </IonButtons>
          <IonTitle>Confirm Your Order</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
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
                    <div className='ion-text-end'> <IonButton fill='clear' onClick={changeLocHandler}><IonIcon slot="icon-only" icon={chevronDownOutline}></IonIcon></IonButton></div>
                  </IonRow>
                </IonGrid>
                </IonCardContent>
              </IonCard>

              <IonCard>
                <IonCardContent>
                  <IonCardTitle>Your Order</IonCardTitle>
                  {shirts>0?<IonRow>
                    <IonCol>
                      Shirts x {shirts}
                    </IonCol>
                    <IonCol>
                      {shirts * 15000} IDR
                    </IonCol>
                  </IonRow>:
                  <IonRow></IonRow>}
                  {pants>0?<IonRow>
                    <IonCol>
                      Pants x {pants}
                    </IonCol>
                    <IonCol>
                      {pants * 20000} IDR
                    </IonCol>
                  </IonRow>:
                  <IonRow></IonRow>}
                  {blazers>0?<IonRow>
                    <IonCol>
                      Blazers x {blazers}
                    </IonCol>
                    <IonCol>
                      {blazers * 30000} IDR
                    </IonCol>
                  </IonRow>:
                  <IonRow></IonRow>}
                </IonCardContent>
              </IonCard>

              <IonCard>
          {chosenOutlet == null?
          <IonCardContent>
            <IonCardTitle>No Outlet Chosen</IonCardTitle>
            <IonButton onClick={selectOutletHandler}>Choose Outlet</IonButton>
          </IonCardContent>
              :
              <IonCardContent>
                <IonCardTitle>Chosen Outlet</IonCardTitle>
                <IonLabel>Outlet: {chosenOutlet?.name} <br/></IonLabel>
              <IonLabel>Delivery Fee: {chosenOutlet?.fee} IDR<br/></IonLabel>
              <IonButton onClick={selectOutletHandler}>Change Outlet</IonButton>
              </IonCardContent>
              }
          </IonCard>

          <IonCard>
            <IonCardContent>
              <IonCardTitle>
                Preferred Delivery Time
              </IonCardTitle>
              {formatDate(selectedDate)} <br/>
              <IonButton id='open-date'>Change Time</IonButton><br/>
              Note: Orders take around a day to complete.
            </IonCardContent>
          </IonCard>
          <IonModal trigger='open-date' className='transparent' isOpen={openDate}>
              <IonDatetime min={minDate} hourValues="8,9,10,11,12,13,14,15,16,17,18" minuteValues="0,15,30,45" hourCycle='h23' showDefaultButtons={true} className='date' value={selectedDate} onIonChange={e => setSelectedDate(e.detail.value!)}>
              </IonDatetime>
              

          </IonModal>

              <IonCard>
                <IonCardContent>
                <IonCardTitle>
                    Payment Summary
                </IonCardTitle>
                  <IonRow>
                    <IonCol>
                      Price
                    </IonCol>
                    <IonCol>
                      {total} IDR
                    </IonCol>
                  </IonRow>
                  {chosenOutlet == null?
                  <div>Total price cannot be calculated, please choose an outlet.
                  </div>:
                  <div>
                    <IonRow>
                    <IonCol>
                      Delivery Fee
                    </IonCol>
                    <IonCol>
                      {chosenOutlet?.fee} IDR
                    </IonCol>
                  </IonRow>
                    
                  <IonRow>
                    <IonCol>
                      Total
                    </IonCol>
                    <IonCol>
                      {total + chosenOutlet!.fee} IDR
                    </IonCol>
                  </IonRow>
                  </div>
                  }
                  
                </IonCardContent>
              </IonCard>

              
      </IonContent>
      <IonFooter> 
        <IonToolbar>
        {chosenOutlet==null?<IonTitle>
          Order details incomplete.
        </IonTitle>:
        <IonButton onClick={placeOrderHandler} expand='block'>Place Order</IonButton>
        }
        </IonToolbar>
      </IonFooter>
      </IonModal>

      <IonModal isOpen={selectOutlet}>
      <IonHeader>
        <IonToolbar color='tertiary'>
          <IonButtons slot='start'>
          <IonButton fill="clear" onClick={closeOutlet}>
          <IonIcon icon={close} slot="icon-only"></IonIcon>
          </IonButton>
          </IonButtons>
          <IonTitle>Choose Outlet</IonTitle>
        </IonToolbar>
      </IonHeader>

        <IonContent>
          <IonGrid>
            <IonCol>
              <IonRow>
              <IonList>
       {nearby.map(outlet => (
          <IonItem key={outlet.id} onClick={chooseOutletHandler.bind(null, outlet.id)}>
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
                  Delivery Fee: {outlet.fee} IDR
                  </IonLabel>
                  
                  <Rating
                 ratingValue={outlet.rating}/>
                </IonCol>
              </IonRow>

        </IonItem>
        ))}
       </IonList>
              </IonRow>
            </IonCol>
          </IonGrid>
       
        </IonContent>
      </IonModal>

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
        {shirts == 0 && pants == 0 && blazers == 0?
        <IonToolbar color='tertiary'>
          <IonTitle>No items added</IonTitle>
        </IonToolbar>:
        <IonToolbar color='tertiary'>
        <IonButtons slot='end'>
          <IonButton fill='clear' onClick={confirmOrderHandler}><IonIcon slot='icon-only' icon={arrowForward}></IonIcon></IonButton>
          </IonButtons>
          <IonTitle>IDR {total} | {quantity} items added</IonTitle>
        </IonToolbar>
        }
        
      </IonFooter>
    </IonPage>
  );
};

export default ByUnit;
