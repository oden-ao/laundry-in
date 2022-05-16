import { IonButton, IonTabs, IonIcon, IonTabBar, IonTabButton, IonLabel, IonCard, IonCardContent, IonContent, IonHeader, IonPage, IonRouterOutlet, IonTitle, IonToolbar } from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';
import { Switch } from 'react-router';
import {homeOutline, listOutline, personOutline, pricetagOutline} from 'ionicons/icons';
import Home from './Home';
import Orders from './Orders';
import Promos from './Promos';
import Profile from './Profile';

const NavigationBar: React.FC = () => {
    return(
        <IonTabs>
            <IonRouterOutlet>
                <Redirect exact path="/navi" to="/navi/home"/>
                <Route exact path="/navi/home" component={Home}/>
                <Route exact path="/navi/orders" component={Orders}/>
                <Route exact path="/navi/promos" component={Promos}/>
                <Route exact path="/navi/profile" component={Profile}/>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
          <IonTabButton tab='home' href="/navi/home">
            <IonIcon icon={homeOutline}/>
          </IonTabButton>
          <IonTabButton tab="orders" href='/navi/orders'>
            <IonIcon icon={listOutline}/>
          </IonTabButton>
          <IonTabButton tab="promos" href='/navi/promos'>
            <IonIcon icon={pricetagOutline}/>
          </IonTabButton>
          <IonTabButton tab="profile" href='/navi/profile'>
            <IonIcon icon={personOutline}/>
          </IonTabButton>
        </IonTabBar>
        </IonTabs>
    )
}

export default NavigationBar;