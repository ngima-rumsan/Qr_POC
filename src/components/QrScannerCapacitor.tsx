import { forwardRef, useImperativeHandle } from 'react';
import { useHistory } from 'react-router-dom';
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint } from '@capacitor/barcode-scanner';

export interface QrScannerHandle {
  startScan: () => Promise<void>; // no return value, navigation happens internally
}

const QrScannerCapacitor = forwardRef<QrScannerHandle>((_, ref) => {
  const history = useHistory();

  useImperativeHandle(ref, () => ({
    startScan
  }));

  const startScan = async (): Promise<void> => {
    try {
      const result = await CapacitorBarcodeScanner.scanBarcode({
        hint: CapacitorBarcodeScannerTypeHint.QR_CODE
      });

      if (result.ScanResult) {
        // Navigate to registration and pass QR payload
        history.push('/registration', { qrPayload: result.ScanResult });
      }
    } catch (err) {
      console.error('Scan failed', err);
    }
  };

  return null; // Native scanner is fullscreen
});

export default QrScannerCapacitor;
