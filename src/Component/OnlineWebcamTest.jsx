// import React, { useState, useEffect, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import { Back } from './back';

// const OnlineWebcamTest = () => {
//     const [videoTracks, setVideoTracks] = useState(null);
//     const [audioTracks, setAudioTracks] = useState(null);
//     const [alertVisible, setAlertVisible] = useState(false);
//     const [selectedCameraIndex, setSelectedCameraIndex] = useState(0);
//     const [selectedMicIndex, setSelectedMicIndex] = useState(0);
//     const [cameraOptions, setCameraOptions] = useState([]);
//     const [micOptions, setMicOptions] = useState([]);
//     const videoRef = useRef(null);
//     const imageRef = useRef(null);
//     const micCanvasRef = useRef(null);
//     const [cameraSettings, setCameraSettings] = useState({
//         name: '',
//         resolution: '',
//         width: '',
//         height: '',
//         aspectRatio: '',
//         brightness: '',
//         contrast: '',
//         facingMode: '',
//         frameRate: '',
//         saturation: '',
//         sharpness: ''
//     });
//     const [micSettings, setMicSettings] = useState({
//         name: '',
//         autoGainControl: '',
//         channels: '',
//         echoCancellation: '',
//         latency: '',
//         noiseSuppression: '',
//         sampleRate: '',
//         sampleSize: ''
//     });

//     useEffect(() => {
//         initPolyfill();
//         initDeviceSelection();
//     }, []);

//     const initPolyfill = () => {
//         if (navigator.mediaDevices === undefined) {
//             navigator.mediaDevices = {};
//         }
//         if (navigator.mediaDevices.getUserMedia === undefined) {
//             navigator.mediaDevices.getUserMedia = function (constraints) {
//                 const getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
//                 if (!getUserMedia) {
//                     return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
//                 }
//                 return new Promise((resolve, reject) => {
//                     getUserMedia.call(navigator, constraints, resolve, reject);
//                 });
//             };
//         }
//     };

//     const initDeviceSelection = () => {
//         if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
//             console.log('enumerateDevices() not supported.');
//             return;
//         }

//         navigator.mediaDevices.enumerateDevices()
//             .then(devices => {
//                 const cams = [];
//                 const mics = [];
//                 let camIndex = 0;
//                 let micIndex = 0;

//                 devices.forEach(device => {
//                     if (device.kind === 'videoinput') {
//                         cams.push(`Camera #${++camIndex}`);
//                     } else if (device.kind === 'audioinput') {
//                         mics.push(`Microphone #${++micIndex}`);
//                     }
//                 });

//                 setCameraOptions(cams);
//                 setMicOptions(mics);
//             })
//             .catch(err => {
//                 console.log(err.name + ': ' + err.message);
//             });
//     };

//     const initVideo = () => {
//         stopVideo();

//         const constraints = {
//             audio: {
//                 echoCancellation: true,
//                 noiseSuppression: true,
//                 autoGainControl: true
//             },
//             video: {
//                 width: { ideal: 1000 },
//                 height: { ideal: 500 },
//                 facingMode: "user"
//             }
//         };

//         navigator.mediaDevices.getUserMedia(constraints)
//             .then(stream => {
//                 const videoTrackList = stream.getVideoTracks();
//                 const audioTrackList = stream.getAudioTracks();

//                 setVideoTracks(videoTrackList);
//                 setAudioTracks(audioTrackList);
                
//                 if (videoRef.current) {
//                     videoRef.current.srcObject = stream;
//                     videoRef.current.play()
//                         .then(() => {
//                             // Wait a brief moment for the stream to initialize
//                             setTimeout(() => {
//                                 if (videoTrackList && videoTrackList.length > 0) {
//                                     const videoTrack = videoTrackList[0];
//                                     const settings = videoTrack.getSettings();
//                                     console.log('Video Settings:', settings); // For debugging
                                    
//                                     setCameraSettings({
//                                         name: videoTrack.label || 'Unknown',
//                                         resolution: `${settings.width || 0}x${settings.height || 0}`,
//                                         width: settings.width || 'N/A',
//                                         height: settings.height || 'N/A',
//                                         aspectRatio: settings.aspectRatio || 'N/A',
//                                         brightness: settings.brightness || 'N/A',
//                                         contrast: settings.contrast || 'N/A',
//                                         facingMode: settings.facingMode || 'N/A',
//                                         frameRate: Math.round(settings.frameRate) || 'N/A',
//                                         saturation: settings.saturation || 'N/A',
//                                         sharpness: settings.sharpness || 'N/A'
//                                     });
//                                 }

//                                 if (audioTrackList && audioTrackList.length > 0) {
//                                     const audioTrack = audioTrackList[0];
//                                     const settings = audioTrack.getSettings();
//                                     console.log('Audio Settings:', settings); // For debugging
                                    
//                                     setMicSettings({
//                                         name: audioTrack.label || 'Unknown',
//                                         autoGainControl: settings.autoGainControl ? 'Yes' : 'No',
//                                         channels: settings.channelCount || 'N/A',
//                                         echoCancellation: settings.echoCancellation ? 'Yes' : 'No',
//                                         latency: settings.latency || 'N/A',
//                                         noiseSuppression: settings.noiseSuppression ? 'Yes' : 'No',
//                                         sampleRate: settings.sampleRate || 'N/A',
//                                         sampleSize: settings.sampleSize || 'N/A'
//                                     });
//                                 }
//                             }, 500);
//                         });
//                 }
//             })
//             .catch(err => {
//                 console.error('Error accessing media devices:', err);
//                 setAlertVisible(true);
//             });
//     };

//     const stopVideo = () => {
//         if (videoTracks) {
//             videoTracks.forEach(track => track.stop());
//         }
//     };

//     const getImage = () => {
//         const canvas = document.createElement('canvas');
//         canvas.width = videoRef.current.videoWidth;
//         canvas.height = videoRef.current.videoHeight;
//         const context = canvas.getContext('2d');
//         context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
//         imageRef.current.src = canvas.toDataURL('image/png');
//     };

//     const downloadImage = () => {
//         const link = document.createElement('a');
//         link.download = 'captured-image.png';
//         link.href = imageRef.current.src;
//         link.click();
//     };

//     return (
//         <>
//             <div id="mytask-layout">
                
//                 <div className="main px-lg-4 px-md-4">
                    
//                     <div className="body d-flex py-lg-3 py-md-2 flex-column">
//                         <div className="d-flex align-items-center gap-3">
//                             <Back/>
//                             <h4 className="mb-0 fw-bold">Online Webcam Test</h4>
//                         </div>
//                         <div id="wrapper">
//                             <div id="doc">
//                                 <form id="mform">
//                                     <div className="form-group mt-4">
//                                         <label htmlFor="camsel" className='fw-bold'>Select camera</label>
//                                         <select
//                                             id="camsel"
//                                             title="Camera select"
//                                             className="form-control mt-1"
//                                             onChange={e => setSelectedCameraIndex(e.target.selectedIndex)}
//                                         >
//                                             {cameraOptions.map((cam, index) => (
//                                                 <option key={index} value={index}>{cam}</option>
//                                             ))}
//                                         </select>
//                                     </div>
//                                     <div className="form-group mt-2">
//                                         <label htmlFor="micsel" className='fw-bold'>Select microphone</label>
//                                         <select
//                                             id="micsel"
//                                             title="Microphone select"
//                                             className="form-control mt-1"
//                                             onChange={e => setSelectedMicIndex(e.target.selectedIndex)}
//                                         >
//                                             {micOptions.map((mic, index) => (
//                                                 <option key={index} value={index}>{mic}</option>
//                                             ))}
//                                         </select>
//                                     </div>
//                                     <div className="form-group mt-3">
//                                         <button type="button" id="testbtn" title="Test webcam" className="btn btn-lg btn-block btn-primary" onClick={initVideo}>
//                                             Test Webcam
//                                         </button>
//                                     </div>
//                                     {alertVisible && (
//                                         <div className="alert alert-warning" role="alert">
//                                             Camera/mic permission denied!<br />
//                                             Enable camera/mic by clicking the video icon on the browser's address bar and press the <i>Test Webcam</i> button or reload page.
//                                         </div>
//                                     )}
//                                     <div id="videodiv" className="form-group mt-4">
//                                         <video id="vid" ref={videoRef} autoPlay playsInline></video>
//                                         <img id="imgid" ref={imageRef} src="" alt="" />
//                                     </div>
//                                     <div id="bar" className="btn-group mt-3">
//                                         <button type="button" id="getimgbtn" title="Pause/Play" className="btn btn-secondary" onClick={getImage}>
//                                             <i className="bi bi-pause"></i><i class="bi bi-play-fill"></i>
//                                         </button>
//                                         <button type="button" id="downimgbtn" title="Save image" className="btn btn-secondary" onClick={downloadImage}>
//                                             <i class="bi bi-download"></i>
//                                         </button>
//                                         {/* <button type="button" id="full" title="Fullscreen" className="btn btn-secondary mr-2">
//                                             <img src="expand.png" loading="lazy" width="24" height="24" alt="" />
//                                         </button> */}
//                                     </div>
//                                     <div className="form-group mt-4">
//                                         <canvas id="miccan" className="visualizer" height="60" ref={micCanvasRef}></canvas>
//                                     </div>
//                                     <div className="row mt-4">
//                                         <div className="col-md-6">
//                                             <h5>Camera Settings</h5>
//                                             <table className="table table-bordered">
//                                                 <tbody>
//                                                     {Object.entries(cameraSettings).map(([key, value]) => (
//                                                         <tr key={key}>
//                                                             <td>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</td>
//                                                             <td>{value}</td>
//                                                         </tr>
//                                                     ))}
//                                                 </tbody>
//                                             </table>
//                                         </div>
//                                         <div className="col-md-6">
//                                             <h5>Microphone Settings</h5>
//                                             <table className="table table-bordered">
//                                                 <tbody>
//                                                     {Object.entries(micSettings).map(([key, value]) => (
//                                                         <tr key={key}>
//                                                             <td>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</td>
//                                                             <td>{value}</td>
//                                                         </tr>
//                                                     ))}
//                                                 </tbody>
//                                             </table>
//                                         </div>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default OnlineWebcamTest;




import React, { useState, useEffect, useRef } from 'react';
import { Back } from './back';

const OnlineWebcamTest = () => {
    const [videoTracks, setVideoTracks] = useState(null);
    const [audioTracks, setAudioTracks] = useState(null);
    const [alertVisible, setAlertVisible] = useState(false);
    const [selectedCameraIndex, setSelectedCameraIndex] = useState(0);
    const [selectedMicIndex, setSelectedMicIndex] = useState(0);
    const [cameraOptions, setCameraOptions] = useState([]);
    const [micOptions, setMicOptions] = useState([]);
    const videoRef = useRef(null);
    const imageRef = useRef(null);
    const micCanvasRef = useRef(null);
    const [cameraSettings, setCameraSettings] = useState({});
    const [micSettings, setMicSettings] = useState({});

    useEffect(() => {
        initPolyfill();
        initDeviceSelection();
    }, []);

    const initPolyfill = () => {
        if (!navigator.mediaDevices) {
            navigator.mediaDevices = {};
        }
        if (!navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia = function (constraints) {
                const getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
                if (!getUserMedia) {
                    return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
                }
                return new Promise((resolve, reject) => {
                    getUserMedia.call(navigator, constraints, resolve, reject);
                });
            };
        }
    };

    const initDeviceSelection = () => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
            console.log('enumerateDevices() not supported.');
            return;
        }

        navigator.mediaDevices.enumerateDevices().then((devices) => {
            const cams = [];
            const mics = [];
            devices.forEach((device) => {
                if (device.kind === 'videoinput') {
                    cams.push(device.label || `Camera ${cams.length + 1}`);
                } else if (device.kind === 'audioinput') {
                    mics.push(device.label || `Microphone ${mics.length + 1}`);
                }
            });

            setCameraOptions(cams);
            setMicOptions(mics);
        });
    };

    const initVideo = () => {
        stopVideo();
        const constraints = {
            audio: true,
            video: true,
        };

        navigator.mediaDevices
            .getUserMedia(constraints)
            .then((stream) => {
                const videoTrackList = stream.getVideoTracks();
                const audioTrackList = stream.getAudioTracks();
                setVideoTracks(videoTrackList);
                setAudioTracks(audioTrackList);

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                }
            })
            .catch((err) => {
                console.error('Error accessing media devices:', err);
                setAlertVisible(true);
            });
    };

    const stopVideo = () => {
        if (videoTracks) {
            videoTracks.forEach((track) => track.stop());
        }
    };

    const getImage = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        imageRef.current.src = canvas.toDataURL('image/png');
    };

    const downloadImage = () => {
        const link = document.createElement('a');
        link.download = 'captured-image.png';
        link.href = imageRef.current.src;
        link.click();
    };

    return (
        <div className="flex flex-col gap-4 p-6 bg-gray-100">
            <div className="flex items-center gap-4">
                <Back />
                <h4 className="text-xl font-bold">Online Webcam Test</h4>
            </div>

            <div className="bg-white shadow rounded p-6">
                <div className="mb-4">
                    <label htmlFor="camsel" className="block text-sm font-medium">
                        Select Camera
                    </label>
                    <select
                        id="camsel"
                        className="w-full mt-2 p-2 border border-gray-300 rounded"
                        onChange={(e) => setSelectedCameraIndex(e.target.selectedIndex)}
                    >
                        {cameraOptions.map((cam, index) => (
                            <option key={index}>{cam}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="micsel" className="block text-sm font-medium">
                        Select Microphone
                    </label>
                    <select
                        id="micsel"
                        className="w-full mt-2 p-2 border border-gray-300 rounded"
                        onChange={(e) => setSelectedMicIndex(e.target.selectedIndex)}
                    >
                        {micOptions.map((mic, index) => (
                            <option key={index}>{mic}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <button
                        type="button"
                        onClick={initVideo}
                        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Test Webcam
                    </button>
                </div>

                {alertVisible && (
                    <div className="p-4 bg-yellow-100 border border-yellow-400 rounded">
                        <p>Camera/mic permission denied! Reload the page or enable permissions.</p>
                    </div>
                )}

                <div className="relative">
                    <video ref={videoRef} className="w-full max-w-lg mx-auto border rounded" autoPlay></video>
                    <img ref={imageRef} className="w-full max-w-lg mx-auto mt-4 border rounded" alt="" />
                </div>

                <div className="flex gap-2 mt-4">
                    <button
                        type="button"
                        onClick={getImage}
                        className="p-2 bg-gray-700 text-white rounded hover:bg-gray-800"
                    >
                        Capture Image
                    </button>
                    <button
                        type="button"
                        onClick={downloadImage}
                        className="p-2 bg-gray-700 text-white rounded hover:bg-gray-800"
                    >
                        Download Image
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OnlineWebcamTest;
