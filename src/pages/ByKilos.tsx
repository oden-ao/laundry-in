import { isPlatform } from '@ionic/core';
import { Redirect, Route } from 'react-router-dom';
import { IonButton, IonCardSubtitle, IonToast, IonLoading, IonCardContent, IonRouterOutlet, IonCard, IonList, IonItem, IonAvatar, IonCardTitle, IonCardHeader, IonLabel, IonRow, IonCol, IonGrid, IonContent, IonButtons, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, IonBackButton, IonSearchbar, IonChip, IonItemDivider, IonListHeader, IonFooter, IonModal, IonDatetime, IonBackdrop, IonText } from '@ionic/react';
import { locationSharp, chevronDownOutline, arrowForward, arrowBack, arrowBackCircle, removeCircle, addCircle, cartOutline, close, warningOutline, chevronForward } from 'ionicons/icons';
import {GoogleMap, InfoWindow, LoadScript, Marker} from '@react-google-maps/api';
import {Geolocation} from '@capacitor/geolocation';
import { useContext, useEffect, useState, useRef } from 'react';
import { convertDistance, getDistance } from 'geolib';
import { Rating } from 'react-simple-star-rating'
import { format, parseISO, getDate, getMonth, getYear, formatISO, add, parse } from 'date-fns';
import { useHistory } from 'react-router-dom';

import shoe from '../images/SVG/shoes.svg'
import bagsimg from '../images/SVG/bags.svg'
import doll from '../images/SVG/doll.svg'

import LaundryContext from '../data/laundry-context';
import './ByUnit.css';

const ByKilos: React.FC = () => {

  const laundryCtx = useContext(LaundryContext);

  //map bs
  const containerStyle = {
    width:'100%',
    height:'100%',
    margin:'auto'
  };

  const containerCardStyle = {
    width:'100%',
    height: '150px',
    margin:'auto'
  };
 
  const history = useHistory();
  const [toastMessage, setToastMessage] = useState('');

  //map functionality
  const [selectedLat, setLat] = useState<number>(1);
  const [selectedLng, setLng] = useState<number>(1);


  // const getCurrentPosition = async () => {
  //   const coordinates = await Geolocation.getCurrentPosition({enableHighAccuracy:true});
  //   console.log('Current position:', coordinates);
  //   console.log('Lat:', coordinates.coords.latitude);
  //   console.log('Lng:', coordinates.coords.longitude);
  //   setLat(coordinates.coords.latitude);
  //   setLng(coordinates.coords.longitude);
  // };

  // useEffect(()=>{
  //   getCurrentPosition();
  // }, [history])

  useEffect(()=>{
    let mounted = true;
    if (mounted){
      laundryCtx.updateDistance(laundryCtx.location.latitude, laundryCtx.location.longitude);
      // getCurrentPosition();
    }
    return () =>{ mounted = false;  
    }
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
  
  const [shoes, setShoes] = useState<number>(0);
  const [bags, setBags] = useState<number>(0);
  const [dolls, setDolls] = useState<number>(0);
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
  const addKilo = () =>{
    setShoes(shoes + 1)
  }
  const removeKilo = () =>{
    if (shoes > 0){
      setShoes(shoes - 1)
    }
  }

  const addBags = () =>{
    setBags(bags + 1)
  }
  const removeBags = () =>{
    if (bags > 0){
      setBags(bags - 1)
    }
  }

  const addDolls = () =>{
    setDolls(dolls + 1)
  }
  const removeDolls = () =>{
    if (dolls > 0){
      setDolls(dolls - 1)
    }
  }

  const total = (shoes * 40000) + (bags * 50000) + (dolls * 35000);
  const quantity = shoes + bags + dolls;


  const placeOrderHandler = () =>{
    laundryCtx.addOrder(laundryCtx.orders.length + 1, "Other", formatDate(currDate) , formatDate(selectedDate), formatDate(selectedDate), total, chosenOutlet!.fee, total + chosenOutlet!.fee, (laundryCtx.location.latitude, laundryCtx.location.longitude).toString());
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
            <GoogleMap onClick={selectPos}
            mapContainerStyle={containerStyle}
            center={laundryCtx.location==={latitude: 0, longitude: 0}?{lat:selectedLat, lng:selectedLng}:{lat: laundryCtx.location.latitude, lng: laundryCtx.location.longitude}}
            zoom={18}><></>
            <Marker position={laundryCtx.location==={latitude: 0, longitude: 0}?{lat:selectedLat, lng:selectedLng}:{lat: laundryCtx.location.latitude, lng: laundryCtx.location.longitude}}/>
            </GoogleMap>
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
        <IonToolbar color='primary'>
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
             
             <IonCardHeader>
               
               <IonCardSubtitle>
               <IonIcon icon={locationSharp}></IonIcon>Your Current Location</IonCardSubtitle>


               <div className='locbtn'> <IonButton fill='clear' routerLink='/location'><IonIcon slot="icon-only" icon={chevronDownOutline}></IonIcon></IonButton></div>

               </IonCardHeader>
         <GoogleMap
         mapContainerStyle={containerCardStyle}
         center={laundryCtx.location==={latitude: 0, longitude: 0}?{lat:selectedLat, lng:selectedLng}:{lat: laundryCtx.location.latitude, lng: laundryCtx.location.longitude}}
         zoom={18}><></>
         <Marker position={laundryCtx.location==={latitude: 0, longitude: 0}?{lat:selectedLat, lng:selectedLng}:{lat: laundryCtx.location.latitude, lng: laundryCtx.location.longitude}}/>
         </GoogleMap>
           </IonCard>

              <IonCard>
                <IonCardContent>
                  <IonCardTitle>Your Order</IonCardTitle>
                  {shoes>0?<IonRow>
                    <IonCol>
                      Shoes x {shoes}
                    </IonCol>
                    <IonCol>
                      {(shoes * 40000).toLocaleString()} IDR
                    </IonCol>
                  </IonRow>:
                  <IonRow></IonRow>}
                  {bags>0?<IonRow>
                    <IonCol>
                      Bags x {bags}
                    </IonCol>
                    <IonCol>
                      {(bags * 50000).toLocaleString()} IDR
                    </IonCol>
                  </IonRow>:
                  <IonRow></IonRow>}
                  {dolls>0?<IonRow>
                    <IonCol>
                      Dolls x {dolls}
                    </IonCol>
                    <IonCol>
                      {(dolls * 35000).toLocaleString()} IDR
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
              <IonLabel>Delivery Fee: {chosenOutlet?.fee.toLocaleString()} IDR<br/></IonLabel>
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
                      {total.toLocaleString()} IDR
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
                      {chosenOutlet?.fee.toLocaleString()} IDR
                    </IonCol>
                  </IonRow>
                    
                  <IonRow>
                    <IonCol>
                      Total
                    </IonCol>
                    <IonCol>
                      {(total + chosenOutlet!.fee).toLocaleString()} IDR
                    </IonCol>
                  </IonRow>
                  </div>
                  }
                  
                </IonCardContent>
              </IonCard>

              
      </IonContent>
      <IonFooter> 

          
        {chosenOutlet==null?
        <IonToolbar>
        <IonButtons slot='start'>
        <IonButton fill='clear' disabled={true}><IonIcon slot='icon-only' icon={warningOutline}></IonIcon></IonButton>
      </IonButtons>
        <IonTitle>
          Order details incomplete
        </IonTitle>
        </IonToolbar>:
        <IonToolbar>
        <IonButton onClick={placeOrderHandler} expand='block'>Place Order</IonButton>
        </IonToolbar>
        }

      </IonFooter>
      </IonModal>

      <IonModal isOpen={selectOutlet}>
      <IonHeader>
        <IonToolbar color='primary'>
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
                  Delivery Fee: {outlet.fee.toLocaleString()} IDR
                  </IonLabel>
                  <br/>
                  <Rating readonly={true}
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
        <IonToolbar color='primary'>
        <IonButtons slot='start'>
            <IonBackButton defaultHref='/navi/home'></IonBackButton>
          </IonButtons>
          <IonTitle>Kilo</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonGrid>
          <IonCard>
            <IonCardHeader className='ion-text-center'><b>Kilos</b></IonCardHeader>
            <IonCardContent className='ion-text-center'>
            
            <IonCol className='ion-text-center' size='1.5'>
                  <IonButton onClick={removeKilo} fill="clear" className='arrows'><IonIcon slot='icon-only' icon={removeCircle}></IonIcon></IonButton>
                  </IonCol>
              <IonCol className='nowrap' size='1'>
                  {shoes}
                  </IonCol>
              <IonCol className='ion-text-center' size='1.5'>
                  <IonButton onClick={addKilo} fill="clear" className='arrows'><IonIcon slot='icon-only' icon={addCircle}></IonIcon></IonButton>
              </IonCol>
              
              <IonRow className='ion-text-left'>
                1. Estimate your kilos <br/>
                2. Our staff
              </IonRow>

            </IonCardContent>
          </IonCard>
        <IonRow>
          <IonCol className='ion-text-center'>
          <IonText>Kilos</IonText>
          </IonCol>
              
              </IonRow>
          <IonRow>
            <IonCol className='ion-text-center'>
            

            <IonCol className='ion-text-center' size='1.5'>
                  <IonButton onClick={removeKilo} fill="clear" className='arrows'><IonIcon slot='icon-only' icon={removeCircle}></IonIcon></IonButton>
                  </IonCol>
              <IonCol className='nowrap' size='1'>
                  {shoes}
                  </IonCol>
              <IonCol className='ion-text-center' size='1.5'>
                  <IonButton onClick={addKilo} fill="clear" className='arrows'><IonIcon slot='icon-only' icon={addCircle}></IonIcon></IonButton>
              </IonCol>
            
            </IonCol>
          </IonRow>

          <IonRow>
          <IonCol className='ion-text-center'>
          <IonText>Kilos</IonText>
          </IonCol>
              
              </IonRow>
          <IonRow>
            <IonCol className='ion-text-center'>
            

            <IonCol className='ion-text-center' size='1.5'>
                  <IonButton onClick={removeKilo} fill="clear" className='arrows'><IonIcon slot='icon-only' icon={removeCircle}></IonIcon></IonButton>
                  </IonCol>
              <IonCol className='nowrap' size='1'>
                  {shoes}
                  </IonCol>
              <IonCol className='ion-text-center' size='1.5'>
                  <IonButton onClick={addKilo} fill="clear" className='arrows'><IonIcon slot='icon-only' icon={addCircle}></IonIcon></IonButton>
              </IonCol>
            
            </IonCol>
          </IonRow>


          

        </IonGrid>
      </IonContent>



      <IonFooter>
        {shoes == 0 && bags == 0 && dolls == 0?
        <IonToolbar color='primary'>
          <IonTitle>No items added</IonTitle>
        </IonToolbar>:
        <IonToolbar color='primary'>
        <IonButtons slot='end'>
          <IonButton fill='clear' onClick={confirmOrderHandler}><IonIcon slot='icon-only' icon={chevronForward}></IonIcon></IonButton>
          </IonButtons>
          <IonTitle>IDR {total.toLocaleString()} | {quantity} items added</IonTitle>
        </IonToolbar>
        }
        
      </IonFooter>
    </IonPage>
  );
};

export default ByKilos;
