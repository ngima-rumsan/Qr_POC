import QRCode from 'qrcode';
import { useState } from 'react';

const QrGenerator: React.FC = () => {
  const [qr, setQr] = useState('');

  const generateQr = async () => {
    const payload = JSON.stringify({
      schoolId: '12345',
      branchId: '67890',
      exp: Date.now() + 1000 * 60 * 60 * 24,
      nonce: 'random-uuid'
    });

    try {
      const qrDataUrl = await QRCode.toDataURL(payload);
      setQr(qrDataUrl);
    } catch (err) {
      console.error('QR generation error', err);
    }
  };

  return (
    <div>
      <button onClick={generateQr}>Generate QR</button>
      {qr && <img src={qr} alt="QR Code" style={{ marginTop: '10px', width: '250px' }} />}
    </div>
  );
};

export default QrGenerator;
