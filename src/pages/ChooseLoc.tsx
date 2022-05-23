import { IonBackButton, IonCard, IonToast, IonFab, IonItem, IonGrid, IonButton, IonIcon, IonButtons, IonRow, IonCol, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonLabel, IonInput, IonSelect, IonSelectOption, IonFabButton, IonActionSheet, IonFooter, IonCardTitle, IonCardContent, IonCardSubtitle } from '@ionic/react';
import {arrowBack, cameraOutline} from 'ionicons/icons';
import { useState, useRef, useContext, useEffect } from 'react';
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';
import {Directory, Filesystem} from "@capacitor/filesystem";
import {Geolocation} from '@capacitor/geolocation';
import {GoogleMap, InfoWindow, LoadScript, Marker} from '@react-google-maps/api';
import {base64FromPath} from "@ionic/react-hooks/filesystem";
import LaundryContext from '../data/laundry-context';
import { useHistory } from 'react-router';

const ChooseLoc: React.FC = () => {

  const containerStyle = {
    width:'100%',
    height:'100%',
    margin:'auto'
  };
  const laundryCtx = useContext(LaundryContext);
  const history = useHistory();

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

  useEffect(()=>{
    let mounted = true;
    if (mounted){
      // getCurrentPosition();
      setLat(laundryCtx.location.latitude);
      setLng(laundryCtx.location.longitude);
    }
    
    return () =>{ mounted = false;  
    }
  }, [laundryCtx.location.latitude, laundryCtx.location.longitude])

  const selectPos = (e: google.maps.MapMouseEvent) => {
    if(e.latLng?.lat()){setLat(e.latLng?.lat());}
    if(e.latLng?.lng()){setLng(e.latLng?.lng());}
  }

  const [toastMessage, setToastMessage] = useState('');

  const chooseLocHandler = async () => {

    laundryCtx.chooseLocation(selectedLat, selectedLng);
    setToastMessage('Location selected');
    history.length > 0 ? history.goBack(): history.replace('/navi/home');
    console.log({laundryCtx});
    //check again if the path above is right

    
  };

  const cancelLocHandler = () => {
    history.length > 0 ? history.goBack(): history.replace('/navi/home');
  }

  return (
    <IonPage>
      <IonToast isOpen={!!toastMessage}
                    message={toastMessage}
                    duration={1500}
                    onDidDismiss={() => {setToastMessage('')}}/>
      <IonFab vertical="top" horizontal="start" slot="fixed">
      <IonFabButton onClick={cancelLocHandler}>
            <IonIcon icon={arrowBack}></IonIcon>
          </IonFabButton>
      </IonFab>
      
            <GoogleMap onClick={selectPos}
            mapContainerStyle={containerStyle}
            center={laundryCtx.location==={latitude: 0, longitude: 0}?{lat:selectedLat, lng:selectedLng}:{lat: laundryCtx.location.latitude, lng: laundryCtx.location.longitude}}
            zoom={18}><></>
            <Marker position={{lat: selectedLat, lng: selectedLng}}/>
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
     

     
    </IonPage>
  );
};

export default ChooseLoc;
