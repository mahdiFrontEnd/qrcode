import React, { useRef, useEffect, useState } from "react";

const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";
const CameraComponent = () => {
    const videoRef = useRef(null);
    const [error, setError] = useState(null);
    const [facingMode, setFacingMode] = React.useState(FACING_MODE_USER);

    useEffect(() => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                setError("Camera access denied or unavailable.");
                console.error(err);
            }
        };

        startCamera();

        // Cleanup function to stop camera when the component unmounts
        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject;
                const tracks = stream.getTracks();
                tracks.forEach((track) => track.stop());
            }
        };
    }, []);


    const handleClick = React.useCallback(() => {
        setFacingMode((prevState) =>
            prevState === FACING_MODE_USER
                ? FACING_MODE_ENVIRONMENT
                : FACING_MODE_USER
        );
    }, []);
    return (
        <div>
            {error ? (
                <p>{error}</p>
            ) : (
                <video ref={videoRef} autoPlay playsInline style={{width: "100%", maxHeight: "400px"}}/>
            )}
            <button onClick={handleClick}>Switch camera</button>

        </div>
    );
};

export default CameraComponent;
