// import React, {useState} from 'react';
// import {QrReader} from 'react-qr-reader';
//
// const QrCodeScanner2 = () => {
//     const [scanResult, setScanResult] = useState("");
//     const [cameraType, setCameraType] = useState(true);
//
//     return (
//         <div style={{textAlign: "center", width: "400px", marginTop: "20px"}}>
//             <QrReader
//                 onResult={(result, error) => {
//                     if (!!result) {
//                         setScanResult(result?.text);
//                     }
//
//                     if (!!error) {
//                         console.info(error);
//                     }
//                 }}
//                 style={{width: '100%'}}
//                 constraints={{
//                     video: { facingMode: cameraType ? "user" : "environment" },
//                     // facingMode: cameraType ? "user" : "environment",
//
//                 }}/>
//             <button onClick={() => {
//                 setCameraType(!cameraType)
//             }}>تغسییssر88 دوربین
//             </button>
//             <p>{scanResult}</p>
//         </div>
//     );
// };
//
// export default QrCodeScanner2;


import React, {useEffect, useState} from "react";
import {QrReader} from "react-qr-reader";

const QrCodeScanner2 = () => {
    const [devices, setDevices] = useState([]);
    const [selectedDeviceId, setSelectedDeviceId] = useState("");
    const [selectedDeviceNumber, setSelectedDeviceNumber] = useState(1);

    useEffect(() => {
        // Fetch available media devices
        navigator.mediaDevices.enumerateDevices().then((devices) => {
            const videoDevices = devices.filter((device) => device.kind === "videoinput");
            setDevices(videoDevices);
            if (videoDevices.length > 0) {
                setSelectedDeviceId(videoDevices[0].deviceId); // Default to the first device
            }
        });
    }, []);

    useEffect(() => {
        if (devices.length > 1) {
            setSelectedDeviceId(devices[selectedDeviceNumber].deviceId);
        }
    }, [devices, selectedDeviceNumber]);

    const switchCamera = () => {
        if (devices.length > 1) {
            setSelectedDeviceNumber(selectedDeviceNumber === 1 ? 0 : 1)
        }
    };

    return (
        <div>
            <h1>QR Code Scanner</h1>
            {selectedDeviceId && (
                <QrReader facingMode="rear"
                          constraints={{
                              // facingMode: 'environment',
                              facingMode: {exact: "environment"},
                              // video: {facingMode: "environment", deviceId: selectedDeviceId}
                          }}
                          onResult={(result, error) => {
                              if (result) {
                                  console.log("QR Code Scanned: ", result.text);
                              }
                              if (error) {
                                  console.error(error);
                              }
                          }}
                          style={{width: "100%"}}
                />
            )}
            <button onClick={switchCamera}>
                aaaaassssssssaaaa
            </button>
            <p>{selectedDeviceId}</p>
        </div>
    );
};

export default QrCodeScanner2;
