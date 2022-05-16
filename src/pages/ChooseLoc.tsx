import { IonBackButton, IonToast, IonFab, IonItem, IonGrid, IonButton, IonIcon, IonButtons, IonRow, IonCol, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonLabel, IonInput, IonSelect, IonSelectOption, IonFabButton, IonActionSheet } from '@ionic/react';
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

  const [toastMessage, setToastMessage] = useState('');

  const chooseLocHandler = async () => {

    laundryCtx.chooseLocation(selectedLat, selectedLng);
    setToastMessage('Location selected');
    history.length > 0 ? history.goBack(): history.replace('/outlets');
    console.log({laundryCtx});
    //check again if the path above is right

    
  };

  return (
    <IonPage>
      <IonToast isOpen={!!toastMessage}
                    message={toastMessage}
                    duration={1500}
                    onDidDismiss={() => {setToastMessage('')}}/>
      <IonFab vertical="top" horizontal="start" slot="fixed">
      <IonFabButton routerLink='/navi/home'>
            <IonIcon icon={arrowBack}></IonIcon>
          </IonFabButton>
      </IonFab>
      
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
          <IonButton fill="clear" onClick={chooseLocHandler}>Cancel</IonButton>
        </IonCol>
        <IonCol >
          <IonButton onClick={chooseLocHandler}>Address Confirm</IonButton>
        </IonCol>
      </IonRow>
      </IonGrid>

     
    </IonPage>
  );
};

export default ChooseLoc;
