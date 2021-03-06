import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Switch } from 'react-router';
import Outlets from './pages/Outlets';
import Login from './pages/Login';
import Register from './pages/Register';
import Page from './pages/Page'





/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { useContext, useEffect } from 'react';
import ChooseLoc from './pages/ChooseLoc';
import Home from './pages/Home';
import ByUnit from './pages/ByUnit';
import ByKilo from './pages/ByKilo';
import ByOther from './pages/ByOther';
import NavigationBar from './pages/NavigationBar';
// import LaundryContext from './data/laundry-context';
import LaundryContextProvider from './data/LaundryContextProvider';
import NearbyOutlets from './pages/Nearby';
import CourierOutlets from './pages/Courier';

setupIonicReact();

const App: React.FC = () => {
  // const laundryCtx = useContext(LaundryContext);
return(
  <IonApp>
    <IonReactRouter>
    <LaundryContextProvider>
      <IonRouterOutlet>
      
    <Route path="/navi" component={NavigationBar}/>
    <Route path="/outlets" component={Outlets}/>
    <Route path="/nearby" component={NearbyOutlets}/>
    <Route path="/courier" component={CourierOutlets}/>
    <Route path="/location" component={ChooseLoc}/>
    <Route path="/unit"  component={ByUnit}/>
    <Route path="/other"  component={ByOther}/>
    <Route path="/kilo"  component={ByKilo}/>
    <Redirect exact from="/" to ="/navi/home" />
    
    <Route path="/" component={Page} exact />
        <Route path="/Login" component={Login} exact />
        <Route path="/Register" component={Register} exact />
      </IonRouterOutlet>
      </LaundryContextProvider>
    </IonReactRouter>
   
  </IonApp>
)};

export default App;
