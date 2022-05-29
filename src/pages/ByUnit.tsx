import { isPlatform } from '@ionic/core';
import { Redirect, Route } from 'react-router-dom';
import { IonButton, IonCardSubtitle, IonToast, IonLoading, IonCardContent, IonRouterOutlet, IonCard, IonList, IonItem, IonAvatar, IonCardTitle, IonCardHeader, IonLabel, IonRow, IonCol, IonGrid, IonContent, IonButtons, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, IonBackButton, IonSearchbar, IonChip, IonItemDivider, IonListHeader, IonFooter, IonModal, IonDatetime, IonBackdrop } from '@ionic/react';
import { locationSharp, chevronDownOutline, arrowForward, arrowBack, arrowBackCircle, removeCircle, addCircle, cartOutline, close, warningOutline, chevronForward } from 'ionicons/icons';
import {GoogleMap, InfoWindow, LoadScript, Marker} from '@react-google-maps/api';
import {Geolocation} from '@capacitor/geolocation';
import { useContext, useEffect, useState, useRef } from 'react';
import { convertDistance, getDistance } from 'geolib';
import { Rating } from 'react-simple-star-rating'
import { format, parseISO, getDate, getMonth, getYear, formatISO, add, parse } from 'date-fns';
import { useHistory } from 'react-router-dom';

import {collection, addDoc, getDocs, updateDoc, getDoc, doc, collectionGroup, query, where, getFirestore} from "firebase/firestore";
import {getAuth, onAuthStateChanged, updateProfile} from "firebase/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import shirt from '../images/SVG/Shirt.svg'
import pantsimg from '../images/SVG/Pants.svg'
import blazer from '../images/SVG/Blazer.svg'
import courier from '../images/SVG/delivery.svg'

import LaundryContext from '../data/laundry-context';
import './ByUnit.css';

const ByUnit: React.FC = () => {

  const laundryCtx = useContext(LaundryContext);

  //firebase
  const db = getFirestore();
  

  const auth = getAuth();
  const user = auth.currentUser;
 if (user !== null) {
   const displayName = user.displayName;
   const email = user.email;
   const photoURL = user.photoURL;
   const emailVerified = user.emailVerified;
   const uid = user.uid;
 }

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
  const minDate = formatISO(add(new Date(), {days: 1}));
  

  const [selectedPickupDate, setSelectedPickupDate] = useState<string>(minDate);
  const minDeliveryDate = formatISO(add(parseISO(selectedPickupDate), {days: 2}));
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState<string>(minDeliveryDate);



  const currDate = formatISO(new Date())
  
  const formatDate = (value: string) => {
    return format(parseISO(value), 'MMM dd yyyy kk:mm');
  };

  //promos

  const [freeDelivery, setFreeDelivery] = useState(3);
  const [tenDiscount, setTenDiscount] = useState(3);
  const [otherDiscount, setOtherDiscount] = useState(3);

  const [chosenPromo, setChosenPromo] = useState(false);
  const [promoDesc, setPromoDesc] = useState('No promos chosen.');
  const [promoCut, setPromoCut] = useState(0);

  const [openPromos, setOpenPromos] = useState(false);

  const openPromosHandler = () =>{
    setOpenPromos(true);
  }

  const closePromosHandler = () =>{
    setOpenPromos(false);
  }

  async function getPromos() {
    const db = getFirestore();
    const docRef = doc(db, user!.uid.toString(), "promos");
    const docSnap = await getDoc(docRef);
    const freeDelivery = docSnap.get("freeDelivery");
    const tenDiscount = docSnap.get("tenDiscount");
    setFreeDelivery(freeDelivery);
    setTenDiscount(tenDiscount);
  }

  const chooseFreeDelivery = () =>{
    setChosenPromo(true);
    setPromoDesc("Free Delivery");
    setPromoCut(chosenOutlet!.fee);
    setOpenPromos(false);
  }

  const chooseTenDiscount = () =>{
    setChosenPromo(true);
    setPromoDesc("10% Discount");
    setPromoCut(total * 10/100);
    setOpenPromos(false);
  }

  const cancelPromo = () =>{
    setChosenPromo(false);
    setPromoDesc("No Promos Chosen.");
    setPromoCut(0);
  }

  const promoFree = async (promo:string) => {
    const db = getFirestore();
    const promoRef = doc(db, user!.uid, "promos")
    const docSnap = await getDoc(promoRef);
    const currPromo = docSnap.get(promo);
    if (promo === "otherDiscount"){
      const data = {otherDiscount: currPromo-1}
      await updateDoc(promoRef, data)
    }
    else if (promo === "tenDiscount"){
      const data = {tenDiscount: currPromo-1}
      await updateDoc(promoRef, data)
    }
    else if (promo === "freeDelivery"){
      const data = {freeDelivery: currPromo-1}
      await updateDoc(promoRef, data)
    }
    
    
  }


  useEffect(()=>{
    let mounted = true;
    if (mounted){
      laundryCtx.getRating();
      laundryCtx.updateDistance(laundryCtx.location.latitude, laundryCtx.location.longitude);
      getPromos();
      // getCurrentPosition();
    }
    return () =>{ mounted = false;  
    }
  }, [laundryCtx.orders])

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

  


  //context
  const placeOrderHandler = () =>{
    laundryCtx.addOrder(laundryCtx.orders.length + 1, "Unit", formatDate(currDate) ,formatDate(selectedPickupDate), formatDate(selectedDeliveryDate), total, chosenOutlet!.fee, total + chosenOutlet!.fee, (String(laundryCtx.location.latitude), String(laundryCtx.location.longitude)));
    // setConfirmScreen(false);
    // setToastMessage('Order placed');
    // history.length > 0 ? history.goBack(): history.replace('/navi/home');  
    // history.push('/navi/home');
    // history.goBack();
   }

   //firebase
   const addOrder = async () => {
    if(promoDesc == "Free Delivery"){
      promoFree("freeDelivery");
    }
    else if(promoDesc == "10% Discount"){
      promoFree("tenDiscount");
    }
     const querySnapshot = await getDocs(query(collection(db, user!.uid.toString(), "orders", "orders")));
    try{
      const docRef = await addDoc(collection(db, user!.uid.toString(), "orders", "orders"),{
            num: querySnapshot.size + 1,
            type: "Unit",
            date: formatDate(currDate),
            pickupdate: formatDate(selectedPickupDate),
            deliverydate: formatDate(selectedDeliveryDate),
            price: total,
            delivery: chosenOutlet!.fee,
            discount: promoCut,
            total: total + chosenOutlet!.fee - promoCut,
            address: (String(laundryCtx.location.latitude), String(laundryCtx.location.longitude))
      });
      console.log("Document written with ID: ", docRef.id)
      placeOrderHandler();
      setConfirmScreen(false);
    setToastMessage('Order placed');
    addCoins(total);
    addCoinHistory(total);
    
    
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    history.length > 0 ? history.goBack(): history.replace('/navi/home');
  };

  const addCoins = async (total: number) => {
    const db = getFirestore();
    const coinRef = doc(db, user!.uid, "coins")
    const docSnap = await getDoc(coinRef);
    const currCoins = docSnap.get("coins");
    await updateDoc(coinRef, {
     coins: currCoins + (total/1000) })
  }

  const addCoinHistory = async (total: number) => {
    const db = getFirestore();
    const querySnapshot = await getDocs(query(collection(db, user!.uid.toString(), "orders", "orders")));
    const docRef = await addDoc(collection(db, user!.uid.toString(), "coins", "coinsHistory"),{
      num: querySnapshot.size + 1,
      date: formatDate(currDate),
      coins: total/1000
});

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
            <IonCard>
          <IonCardContent>
          <IonCardSubtitle>Your current location</IonCardSubtitle>
          {selectedLat}, {selectedLng}
          <IonGrid>
        
        <IonRow>
          <IonCol>
            <IonButton fill="clear" onClick={cancelLocHandler}>Cancel</IonButton>
          </IonCol>
          <IonCol >
            <IonButton onClick={chooseLocHandler}>Address Confirm</IonButton>
          </IonCol>
        </IonRow>
        </IonGrid>
          </IonCardContent>
          
        </IonCard>
      </IonModal>

      <IonModal isOpen={openPromos}>
      <IonHeader>
        <IonToolbar color='primary'>
          <IonButtons slot='start'>
          <IonButton fill="clear" onClick={closePromosHandler}>
          <IonIcon icon={close} slot="icon-only"></IonIcon>
          </IonButton>
          </IonButtons>
          <IonTitle>Choose A Promo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonList>
        {freeDelivery > 0?
        <IonItem onClick={chooseFreeDelivery}>
        <IonLabel>
          <b>Free Delivery</b><br/>
          No minimum order<br/>
          Usages left: {freeDelivery}
        </IonLabel>
      </IonItem>:<IonLabel></IonLabel>
        }

        {tenDiscount > 0 && total >= 50000?
        <IonItem onClick={chooseTenDiscount}>
          <IonLabel>
          <b>10% Discount</b><br/>
          Minimum order of 50.000 IDR<br/>
          Usages left: {tenDiscount}
        </IonLabel>
        </IonItem>:
        <IonItem color='danger'>
        <IonLabel>
        <b>10% Discount</b><br/>
        Minimum order of 50.000 IDR<br/>
        Usages left: {tenDiscount}<br/>
        <i>Order minimum not met!</i>
      </IonLabel>
      </IonItem>}
        
      </IonList>
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


               <div className='locbtn'> <IonButton fill='clear' onClick={changeLocHandler}><IonIcon slot="icon-only" icon={chevronDownOutline}></IonIcon></IonButton></div>

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
                  {shirts>0?<IonRow>
                    <IonCol>
                      Shirts x {shirts}
                    </IonCol>
                    <IonCol>
                      {(shirts * 15000).toLocaleString()} IDR
                    </IonCol>
                  </IonRow>:
                  <IonRow></IonRow>}
                  {pants>0?<IonRow>
                    <IonCol>
                      Pants x {pants}
                    </IonCol>
                    <IonCol>
                      {(pants * 20000).toLocaleString()} IDR
                    </IonCol>
                  </IonRow>:
                  <IonRow></IonRow>}
                  {blazers>0?<IonRow>
                    <IonCol>
                      Blazers x {blazers}
                    </IonCol>
                    <IonCol>
                      {(blazers * 30000).toLocaleString()} IDR
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
                Preferred Pickup Time
              </IonCardTitle>
              {formatDate(selectedPickupDate)} <br/>
              <IonButton id='open-pickupdate'>Change Time</IonButton><br/>
            
            </IonCardContent>
          </IonCard>
          <IonModal trigger='open-pickupdate' className='transparent'>
              <IonDatetime min={minDate} hourValues="8,9,10,11,12,13,14,15,16,17,18" minuteValues="0,15,30,45" hourCycle='h23' showDefaultButtons={true} className='date' value={selectedPickupDate} onIonChange={e => setSelectedPickupDate(e.detail.value!)}>
              </IonDatetime>
          </IonModal>

          <IonCard>
            <IonCardContent>
              <IonCardTitle>
                Preferred Delivery Time
              </IonCardTitle>
              {formatDate(selectedDeliveryDate)} <br/>
              <IonButton id='open-deliverydate'>Change Time</IonButton><br/>
              Note: Orders take around a day to complete.<br/>
              {selectedDeliveryDate < minDeliveryDate?"Please pick a valid delivery date!":""}
            </IonCardContent>
          </IonCard>
          <IonModal trigger='open-deliverydate' className='transparent'>
              <IonDatetime min={minDeliveryDate} hourValues="8,9,10,11,12,13,14,15,16,17,18" minuteValues="0,15,30,45" hourCycle='h23' showDefaultButtons={true} className='date' value={selectedDeliveryDate} onIonChange={e => setSelectedDeliveryDate(e.detail.value!)}>
              </IonDatetime>
          </IonModal>


          {chosenOutlet?<IonCard>
            <IonCardContent>
              <IonCardTitle>
                Promo
              </IonCardTitle>
              {freeDelivery > 0 && tenDiscount > 0?
                <div>
                  <IonLabel>{promoDesc}</IonLabel><br/>
                  <IonCol>
                  <IonButton onClick={openPromosHandler}>Change Promo</IonButton>
                  </IonCol>
                  {chosenPromo?<IonCol><IonButton color='danger' onClick={cancelPromo}>
                  Remove Promo
                </IonButton></IonCol>:""}
                </div>
                :
                <IonLabel>No promos available for this order.</IonLabel>}
                
            </IonCardContent>
          </IonCard>:
          <IonLabel></IonLabel>}
          

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

                  {chosenPromo?
                   <IonRow>
                   <IonCol>
                     Discount
                   </IonCol>
                   <IonCol>
                     -{promoCut.toLocaleString()} IDR
                   </IonCol>
                 </IonRow>:""
                  }
                 
                    
                  <IonRow>
                    <IonCol>
                      Total
                    </IonCol>
                    <IonCol>
                      {(total + chosenOutlet!.fee - promoCut).toLocaleString()} IDR
                    </IonCol>
                  </IonRow>
                  </div>
                  }
                  
                </IonCardContent>
              </IonCard>

              
      </IonContent>
      <IonFooter> 

          
        {chosenOutlet==null || selectedDeliveryDate < minDeliveryDate?
        <IonToolbar>
        <IonButtons slot='start'>
        <IonButton fill='clear' disabled={true}><IonIcon slot='icon-only' icon={warningOutline}></IonIcon></IonButton>
      </IonButtons>
        <IonTitle>
          Order details incomplete
        </IonTitle>
        </IonToolbar>:
        <IonToolbar>
          <IonCol className='ion-text-center'>You will earn <b>{total/1000} coins</b> from this order.</IonCol>
          
        <IonButton onClick={addOrder} expand='block'>Place Order</IonButton>
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
                <IonCol  className='ion-text-center'>
                  <img src={shirt}/>
                  </IonCol>
                  <IonCol>
                  <b>Shirts</b>
                  </IonCol>
                  <IonCol>
                  IDR 15,000
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
                <IonCol  className='ion-text-center'>
                  <img src={pantsimg}/>
                  </IonCol>
                  <IonCol>
                  <b>Pants</b>
                  </IonCol>
                  <IonCol>
                  IDR 20,000
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
                <IonCol  className='ion-text-center'>
                  <img src={blazer}/>
                  </IonCol>
                  <IonCol>
                  <b>Blazers</b>
                  </IonCol>
                  <IonCol>
                  IDR 30,000
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

export default ByUnit;
