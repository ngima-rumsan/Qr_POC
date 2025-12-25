import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonInput, 
  IonLabel, 
  IonItem, 
  IonButton, 
  IonText 
} from '@ionic/react';
import { useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

interface LocationState {
  qrPayload?: string;
}

const Registration: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState;
  const [schoolName, setSchoolName] = useState('');
  const [memberName, setMemberName] = useState('');
  const [error, setError] = useState('');
  const memberInputRef = useRef<HTMLIonInputElement>(null);

  useEffect(() => {
    if (state?.qrPayload) {
      try {
        const data = JSON.parse(state.qrPayload);
        setSchoolName(`School ${data.schoolId} Branch ${data.branchId}`);
        // Autofocus member name field
        setTimeout(() => memberInputRef.current?.setFocus(), 300);
      } catch (err) {
        console.error('Invalid QR payload', err);
        setError('Invalid QR code. Please scan a valid school QR code.');
      }
    }
  }, [state]);

  const handleRegister = () => {
    if (!memberName) {
      setError('Please enter member name.');
      return;
    }
    alert(`Registered ${memberName} to ${schoolName}`);
    // TODO: call registration API with QR token
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registration</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        <IonItem>
          <IonLabel position="stacked">School / Branch</IonLabel>
          <IonInput value={schoolName} readonly />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Member Name</IonLabel>
          <IonInput 
            ref={memberInputRef}
            value={memberName} 
            placeholder="Enter member name"
            onIonChange={e => setMemberName(e.detail.value!)} 
          />
        </IonItem>

        <IonButton 
          expand="full" 
          style={{ marginTop: '20px' }} 
          onClick={handleRegister}
        >
          Register
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Registration;
