import React, { useState } from 'react'
import { IonButton, IonRouterOutlet, IonCard, IonList, IonItem, IonAvatar, IonCardTitle, IonCardHeader, IonLabel, IonRow, IonCol, IonGrid, IonContent, IonButtons, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, IonBackButton, IonSearchbar, IonChip, IonItemDivider, IonAccordion, IonCardSubtitle, IonCardContent, IonText, IonInput,IonLoading } from '@ionic/react';
import { useEffect } from 'react';
import headerregist from '../images/SVG/headerregist.svg'
import footer from '../images/SVG/footer.svg'
import './Login.css'
import {Link} from 'react-router-dom'
import { registerUser } from '../firebaseconfig'
import { useHistory } from 'react-router';
import {Toast} from '@capacitor/toast'

const Register: React.FC = () => {
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [cpassword, setCPassword] = useState('')
   const [email, setEmail] = useState('')
   const [HP, setHP] = useState('')
   const history = useHistory()

   const[busy, setBusy] = useState<boolean>(false)
   

   async function register() {
    setBusy(true)
    if (password !== cpassword) {
        await Toast.show({
            text: 'Password does not match',
          });
    }
    if (username.trim() === '' || password.trim() === ''){
        await Toast.show({
            text: 'Fill the blanks',
          });
    }

    const res = await registerUser (username, password)
    if (res){
        await Toast.show({
            text: 'Successfully Registered',
          });
        history.replace('/navi/home')
    }
    setBusy(false)
   }

    return (
        <IonPage>
            {/* <IonHeader>
                <IonToolbar>
                <IonButtons slot='start'>
            <IonBackButton defaultHref='page'></IonBackButton>
          </IonButtons>
                    <IonTitle>LaundryIn</IonTitle>
                </IonToolbar>
            </IonHeader> */}
            <IonLoading message="Registering" duration={0} isOpen={busy} />
            <IonContent className="ion-text-center" color='primary'>
            <IonGrid className='headerregist'>
        
        <IonRow>
        <IonCol size-sm='8' offset-sm='3' size-md="6" offset-md="3">
        
        </IonCol>
        </IonRow>
          </IonGrid>
          <IonCard>
          <IonCardContent>
          <IonList>
              <IonInput placeholder="Email" 
                    onIonChange={(e: any) => setUsername(e.target.value)} 
                    />
                    <IonInput placeholder="Password" 
                    type="password"
                    onIonChange={(e: any) => setPassword(e.target.value)} 
                    />
                    <IonInput placeholder="Confirm Password" 
                    type="password"
                    onIonChange={(e: any) => setCPassword(e.target.value)} 
                    />
                    <IonInput placeholder="Username" 
                    onIonChange={(e: any) => setEmail(e.target.value)}/>
                    <IonInput placeholder="No. Telp" 
                    onIonChange={(e: any) => setHP(e.target.value)}/>
                    <IonButton expand="block" onClick={register}>Sign up</IonButton>
                    </IonList>
                    </IonCardContent>
                    </IonCard>

                    <p>
                        Already have an account? <Link to="/login" className='white'>Sign In</Link>
                    </p>
                    
                    <IonGrid className='footer'>
          </IonGrid>
                </IonContent>
            
        </IonPage>
    )
}

export default Register