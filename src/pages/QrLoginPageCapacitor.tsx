import React, { useRef } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonContent,
  IonButton,
  IonIcon,
  IonFooter
} from '@ionic/react';
import { cameraOutline, imageOutline } from 'ionicons/icons';
import QrScannerCapacitor, { QrScannerHandle } from '../components/QrScannerCapacitor';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { useHistory } from 'react-router-dom';
import QrGenerator from '../components/QrGenerator';

const QrLoginPageCapacitor: React.FC = () => {
  const scannerRef = useRef<QrScannerHandle>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const history = useHistory();

  // Camera scan
  const handleScanClick = async () => {
    if (!scannerRef.current) return;
    try {
      await scannerRef.current.startScan();
    } catch (err) {
      console.error('Scan failed', err);
    }
  };

  // Gallery upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const codeReader = new BrowserMultiFormatReader();
        const result = await codeReader.decodeFromImageUrl(reader.result as string);
        history.push('/registration', { qrPayload: result.getText() });
      } catch (err) {
        console.error('Failed to decode QR from image', err);
        alert('Invalid QR code. Please select a valid image.');
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>QR Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <div style={{ maxWidth: 400, margin: '0 auto', paddingTop: 60, textAlign: 'center' }}>
          <h1 style={{ fontWeight: 600, fontSize: '2rem', marginBottom: 30 }}>
            Scan the QR code
          </h1>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
            <IonButton
              expand="block"
              size="large"
              color="primary"
              onClick={handleScanClick}
              style={{ height: 60, fontSize: '1.1rem' }}
            >
              <IonIcon slot="start" icon={cameraOutline} />
              Scan QR Code
            </IonButton>

            <IonButton
              expand="block"
              size="large"
              color="secondary"
              onClick={() => fileInputRef.current?.click()}
              style={{ height: 60, fontSize: '1.1rem' }}
            >
              <IonIcon slot="start" icon={imageOutline} />
              Upload QR Image
            </IonButton>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            hidden
            accept="image/*"
            onChange={handleFileUpload}
          />

          {/* Native Capacitor QR Scanner */}
          <QrScannerCapacitor ref={scannerRef} />
        </div>

        <h2>QR Generator using qrcode library</h2>
        <QrGenerator />
      </IonContent>

      
    </IonPage>
  );
};

export default QrLoginPageCapacitor;
