import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router-dom';
import Registration from './pages/Registration';
import QrLoginPageCapacitor from './pages/QrLoginPageCapacitor';

import '@ionic/react/css/core.css';

const App: React.FC = () => (
  <IonApp>
  <IonReactRouter>
    <IonRouterOutlet id="main-content">
      <Route exact path="/" component={QrLoginPageCapacitor} />
      <Route path="/registration" component={Registration} />
    </IonRouterOutlet>
  </IonReactRouter>
</IonApp>
);

export default App;
