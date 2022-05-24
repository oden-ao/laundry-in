import React, { useState } from 'react'
import { IonButton, IonRouterOutlet, IonCard, IonList, IonItem, IonAvatar, IonCardTitle, IonCardHeader, IonLabel, IonRow, IonCol, IonGrid, IonContent, IonButtons, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, IonBackButton, IonSearchbar, IonChip, IonItemDivider, IonAccordion, IonCardSubtitle, IonCardContent, IonText, IonInput,IonLoading } from '@ionic/react';
import { useEffect } from 'react';
import headerregist from '../images/SVG/headerregist.svg'
import footer from '../images/SVG/footer.svg'
import './Login.css'
import {Link} from 'react-router-dom'
import { toast } from '../toast';
import { registerUser } from '../firebaseconfig'

const Register: React.FC = () => {
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [cpassword, setCPassword] = useState('')
   const [email, setEmail] = useState('')
   const [HP, setHP] = useState('')

   const[busy, setBusy] = useState<boolean>(false)

   async function register() {
    setBusy(true)
    if (password !== cpassword) {
        alert('Password not Match')
    }
    if (username.trim() === '' || password.trim() === ''){
        alert('Fill the blank')  
    }

    const res = await registerUser (username, password)
    if (res){
        alert('Successfully Registered')
    }
    setBusy(false)
   }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                <IonButtons slot='start'>
            <IonBackButton defaultHref='page'></IonBackButton>
          </IonButtons>
                    <IonTitle>LaundryIn</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonLoading message="Registering" duration={0} isOpen={busy} />
            <IonContent className="ion-text-center">
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
                    <IonButton onClick={register}>Daftar</IonButton>
                    </IonList>
                    </IonCardContent>
                    </IonCard>

                    <p>
                        Already Have an Account? <Link to="/login">Sign In</Link>
                    </p>
                    
                    <IonGrid className='footer'>
        
        <IonRow>
        <IonCol size-sm='8' offset-sm='2' size-md="6" offset-md="3">
        </IonCol>
        </IonRow>
          </IonGrid>
                </IonContent>
            
        </IonPage>
    )
}

export default Register