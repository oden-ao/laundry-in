import React, { useState } from 'react'
import { IonButton, IonRouterOutlet, IonCard, IonList, IonItem, IonAvatar, IonCardTitle, IonCardHeader, IonLabel, IonRow, IonCol, IonGrid, IonContent, IonButtons, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, IonBackButton, IonSearchbar, IonChip, IonItemDivider, IonAccordion, IonCardSubtitle, IonCardContent, IonText, IonInput, IonToast, IonLoading } from '@ionic/react';
import { useEffect } from 'react';
import headerlogin from '../images/SVG/headerlogin.svg'
import footer from '../images/SVG/footer.svg'
import {Link} from 'react-router-dom'
import { loginUser } from '../firebaseconfig'
import './Login.css'
import { useHistory } from 'react-router';

const Page: React.FC = () => {
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
    const history = useHistory()
    const[busy, setBusy] = useState<boolean>(false)

   async function login() {
       setBusy(true)
       const res = await loginUser(username, password)
       if(!res) {
           alert('Wrong Credentials')
       } else {
           history.replace('/navi/home')
           alert('Successful Login')
       }
       setBusy(false)
   }

    return (
        <IonPage>
            {/* <IonHeader>
                <IonToolbar>
                <IonButtons slot='start'>
          </IonButtons>
                    <IonTitle>LaundryIn</IonTitle>
                </IonToolbar>
            </IonHeader> */}
            <IonLoading message="Please wait.." duration={0} isOpen={busy} />
            <IonContent className="ion-text-center" color='primary'>
            <IonGrid className='headerlogin'>
        
        {/* <IonRow>
        <IonCol size-sm='8' offset-sm='3' size-md="6" offset-md="3">
        
        </IonCol>
        </IonRow> */}
          </IonGrid>
          <IonCard>
          <IonCardContent>
          <IonList>
          <IonInput placeholder="Username" 
                    onIonChange={(e: any) => setUsername(e.target.value)} 
                    />
                    <IonInput 
                    type="password"
                    placeholder="Password" 
                    onIonChange={(e: any) => setPassword(e.target.value)} 
                    />
                    <IonButton onClick={login}>Login</IonButton>
                    </IonList>
                    </IonCardContent>
                    </IonCard>

                    <p>
                        Don't Have an Acccount? <Link to="/register" className='white'>Sign Up</Link>
                    </p>
            
                    <IonGrid className='footer'>
          </IonGrid>
                
            </IonContent>
            
        </IonPage>
    )
}

export default Page