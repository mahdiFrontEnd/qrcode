import React, {useState} from 'react';
import {QrReader} from "react-qr-reader";

const QrCodeScanner2 = () => {
    const [scanResult, setScanResult] = useState("");

    const handleScan = (data) => {
        if (data) {
            setScanResult(data);
        }
    };

    const handleError = (err) => {
        console.error("QR Code Error: ", err);
    };

    return (
        <div style={{textAlign: "center", marginTop: "20px"}}>
            <h1>QR Code Scanner</h1>
            <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{width: "300px", margin: "0 auto"}}
            />
            <p>
                <strong>Scanned Result:</strong> {scanResult || "No result yet"}
            </p>
        </div>
    );
};

export default QrCodeScanner2;