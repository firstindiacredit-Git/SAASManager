// import React, { useState, useRef, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Back } from './back';

// const TextToSpeech = () => {
//     const [text, setText] = useState('');
//     const [isPaused, setIsPaused] = useState(false);
//     const speechSynthesis = window.speechSynthesis;
//     const utteranceRef = useRef(null);
//     const [copySuccess, setCopySuccess] = useState(false);
//     const [selectedVoice, setSelectedVoice] = useState(null);
//     const [availableVoices, setAvailableVoices] = useState([]);
//     const [rate, setRate] = useState(1);
//     const [currentTime, setCurrentTime] = useState(0);
//     const [duration, setDuration] = useState(0);
//     const timeIntervalRef = useRef(null);

//     useEffect(() => {
//         const loadVoices = () => {
//             const voices = speechSynthesis.getVoices();
//             setAvailableVoices(voices);
//             setSelectedVoice(voices[0]);
//         };

//         loadVoices();
//         speechSynthesis.onvoiceschanged = loadVoices;
//     }, []);

//     const formatTime = (seconds) => {
//         const minutes = Math.floor(seconds / 60);
//         const remainingSeconds = Math.floor(seconds % 60);
//         return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
//     };

//     const handleSpeak = () => {
//         if (text && selectedVoice) {
//             utteranceRef.current = new SpeechSynthesisUtterance(text);
//             utteranceRef.current.voice = selectedVoice;
//             utteranceRef.current.rate = rate;

//             const estimatedDuration = (text.length * 100) / (rate * 1000);
//             setDuration(estimatedDuration);
//             setCurrentTime(0);

//             utteranceRef.current.onstart = () => {
//                 timeIntervalRef.current = setInterval(() => {
//                     if (speechSynthesis.speaking && !speechSynthesis.paused) {
//                         setCurrentTime(prev => Math.min(prev + 0.1, estimatedDuration));
//                     }
//                 }, 100);
//             };

//             utteranceRef.current.onend = () => {
//                 clearInterval(timeIntervalRef.current);
//                 setCurrentTime(0);
//             };

//             utteranceRef.current.onpause = () => {
//                 clearInterval(timeIntervalRef.current);
//             };

//             utteranceRef.current.onresume = () => {
//                 timeIntervalRef.current = setInterval(() => {
//                     if (speechSynthesis.speaking && !speechSynthesis.paused) {
//                         setCurrentTime(prev => Math.min(prev + 0.1, estimatedDuration));
//                     }
//                 }, 100);
//             };

//             speechSynthesis.speak(utteranceRef.current);
//         }
//     };

//     const handlePause = () => {
//         if (speechSynthesis.speaking) {
//             speechSynthesis.pause();
//             setIsPaused(true);
//         }
//     };

//     const handleResume = () => {
//         if (isPaused) {
//             speechSynthesis.resume();
//             setIsPaused(false);
//         }
//     };

//     const handleStop = () => {
//         speechSynthesis.cancel();
//         setIsPaused(false);
//         setCurrentTime(0);
//         clearInterval(timeIntervalRef.current);
//     };

//     const handleFileUpload = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = (e) => {
//                 setText(e.target.result);
//             };
//             reader.readAsText(file);
//         }
//     };

//     const handleCopyText = () => {
//         navigator.clipboard.writeText(text)
//             .then(() => {
//                 setCopySuccess(true);
//                 setTimeout(() => setCopySuccess(false), 2000);
//             })
//             .catch((err) => {
//                 console.error('Failed to copy text: ', err);
//             });
//     };

//     useEffect(() => {
//         return () => {
//             if (timeIntervalRef.current) {
//                 clearInterval(timeIntervalRef.current);
//             }
//         };
//     }, []);

//     const audioControlStyles = {
//         audioPlayerControls: {
//             background: '#f8f9fa',
//             padding: '10px',
//             borderRadius: '8px'
//         },
//         timeDisplay: {
//             fontFamily: 'monospace',
//             fontSize: '14px',
//             minWidth: '45px'
//         }
//     };

//     return (
//         <>
//             <div id="mytask-layout">
                
//                 <div className="main px-lg-4 px-md-4">
                    
//                     <div className="body d-flex py-lg-3 py-md-2 flex-column">
//                         <div className="d-flex align-items-center gap-3">
//                             <Back/>
//                             <h4 className="mb-0 fw-bold">Text To Speech</h4>
//                         </div>
                        
//                         <div className="container mt-4">
//                             <div className="row">
//                                 <div className="col-12">
//                                     <input
//                                         type="file"
//                                         className="form-control mb-3"
//                                         accept=".txt"
//                                         onChange={handleFileUpload}
//                                     />
//                                     <textarea
//                                         className="form-control mb-3"
//                                         rows="5"
//                                         value={text}
//                                         onChange={(e) => setText(e.target.value)}
//                                         placeholder="Type or upload text here..."
//                                     />
                                    
//                                     <div className="btn-group">
//                                         <button className="btn btn-secondary me-2" onClick={handleCopyText}>
//                                             <i className="bi bi-clipboard"></i> Copy Text
//                                         </button>
//                                         {copySuccess && <span className="text-success">Text copied!</span>}
//                                     </div>
                                    
//                                     <div className="form-group mt-3 d-flex align-items-center gap-2">
//                                         <label className="text-nowrap fw-bold">Select Voice:</label>
//                                         <select 
//                                             className="form-select"
//                                             onChange={(e) => setSelectedVoice(availableVoices[e.target.value])}
//                                         >
//                                             {availableVoices.map((voice, index) => (
//                                                 <option key={index} value={index}>
//                                                     {voice.name} ({voice.lang})
//                                                 </option>
//                                             ))}
//                                         </select>
//                                     </div>
                                    
//                                     <div className="form-group mt-3 d-flex align-items-center gap-3">
//                                         <label className="fw-bold text-nowrap">Speech Rate: </label>
//                                         <input
//                                             type="range"
//                                             className="form-range"
//                                             min="0.5"
//                                             max="2"
//                                             step="0.1"
//                                             value={rate}
//                                             onChange={(e) => setRate(parseFloat(e.target.value))}
//                                         />
//                                         <span className="fw-bold border bg-primary text-white rounded-2 p-1">{rate}</span>
//                                     </div>
                                    
//                                     <div className="audio-player-controls mt-3" style={audioControlStyles.audioPlayerControls}>
//                                         <div className="d-flex align-items-center gap-2">
//                                             <span style={audioControlStyles.timeDisplay}>{formatTime(currentTime)}</span>
//                                             <input
//                                                 type="range"
//                                                 className="form-range flex-grow-1"
//                                                 min="0"
//                                                 max={duration}
//                                                 step="0.1"
//                                                 value={currentTime}
//                                                 style={{ cursor: 'pointer' }}
//                                                 onChange={(e) => {
//                                                     setCurrentTime(parseFloat(e.target.value));
//                                                 }}
//                                             />
//                                             <span style={audioControlStyles.timeDisplay}>{formatTime(duration)}</span>
//                                         </div>
//                                     </div>
                                    
//                                     <div className="btn-group d-flex justify-content-center mt-3">
//                                         <button className="btn btn-primary" onClick={handleSpeak}>
//                                             <i className="bi bi-play-fill"></i> Speak
//                                         </button>
//                                         <button className="btn btn-warning" onClick={isPaused ? handleResume : handlePause}>
//                                             {isPaused ? 
//                                                 <><i className="bi bi-play-fill"></i> Resume</> : 
//                                                 <><i className="bi bi-pause-fill"></i> Pause</>
//                                             }
//                                         </button>
//                                         <button className="btn btn-danger" onClick={handleStop}>
//                                             <i className="bi bi-stop-fill"></i> Stop
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };
// export default TextToSpeech;



import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Back } from './back';

const TextToSpeech = () => {
    const [text, setText] = useState('');
    const [isPaused, setIsPaused] = useState(false);
    const speechSynthesis = window.speechSynthesis;
    const utteranceRef = useRef(null);
    const [copySuccess, setCopySuccess] = useState(false);
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [availableVoices, setAvailableVoices] = useState([]);
    const [rate, setRate] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const timeIntervalRef = useRef(null);

    useEffect(() => {
        const loadVoices = () => {
            const voices = speechSynthesis.getVoices();
            setAvailableVoices(voices);
            setSelectedVoice(voices[0]);
        };

        loadVoices();
        speechSynthesis.onvoiceschanged = loadVoices;
    }, []);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handleSpeak = () => {
        if (text && selectedVoice) {
            utteranceRef.current = new SpeechSynthesisUtterance(text);
            utteranceRef.current.voice = selectedVoice;
            utteranceRef.current.rate = rate;

            const estimatedDuration = (text.length * 100) / (rate * 1000);
            setDuration(estimatedDuration);
            setCurrentTime(0);

            utteranceRef.current.onstart = () => {
                timeIntervalRef.current = setInterval(() => {
                    if (speechSynthesis.speaking && !speechSynthesis.paused) {
                        setCurrentTime(prev => Math.min(prev + 0.1, estimatedDuration));
                    }
                }, 100);
            };

            utteranceRef.current.onend = () => {
                clearInterval(timeIntervalRef.current);
                setCurrentTime(0);
            };

            utteranceRef.current.onpause = () => {
                clearInterval(timeIntervalRef.current);
            };

            utteranceRef.current.onresume = () => {
                timeIntervalRef.current = setInterval(() => {
                    if (speechSynthesis.speaking && !speechSynthesis.paused) {
                        setCurrentTime(prev => Math.min(prev + 0.1, estimatedDuration));
                    }
                }, 100);
            };

            speechSynthesis.speak(utteranceRef.current);
        }
    };

    const handlePause = () => {
        if (speechSynthesis.speaking) {
            speechSynthesis.pause();
            setIsPaused(true);
        }
    };

    const handleResume = () => {
        if (isPaused) {
            speechSynthesis.resume();
            setIsPaused(false);
        }
    };

    const handleStop = () => {
        speechSynthesis.cancel();
        setIsPaused(false);
        setCurrentTime(0);
        clearInterval(timeIntervalRef.current);
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setText(e.target.result);
            };
            reader.readAsText(file);
        }
    };

    const handleCopyText = () => {
        navigator.clipboard.writeText(text)
            .then(() => {
                setCopySuccess(true);
                setTimeout(() => setCopySuccess(false), 2000);
            })
            .catch((err) => {
                console.error('Failed to copy text: ', err);
            });
    };

    useEffect(() => {
        return () => {
            if (timeIntervalRef.current) {
                clearInterval(timeIntervalRef.current);
            }
        };
    }, []);

    return (
        <>
            <div id="mytask-layout" className="p-4">
                <div className="main px-4">
                    <div className="body flex flex-col py-4 gap-4">
                        <div className="flex items-center gap-4">
                            <Back />
                            <h4 className="font-bold text-xl">Text To Speech</h4>
                        </div>

                        <div className="container mt-4">
                            <input
                                type="file"
                                className="block w-full px-3 py-2 border border-gray-300 rounded mb-4"
                                accept=".txt"
                                onChange={handleFileUpload}
                            />
                            <textarea
                                className="block w-full px-3 py-2 border border-gray-300 rounded mb-4"
                                rows="5"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Type or upload text here..."
                            />

                            <div className="flex items-center gap-4 mb-4">
                                <button
                                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                                    onClick={handleCopyText}
                                >
                                    Copy Text
                                </button>
                                {copySuccess && <span className="text-green-600">Text copied!</span>}
                            </div>

                            <div className="flex items-center gap-4 mb-4">
                                <label className="font-bold">Select Voice:</label>
                                <select
                                    className="px-3 py-2 border border-gray-300 rounded"
                                    onChange={(e) => setSelectedVoice(availableVoices[e.target.value])}
                                >
                                    {availableVoices.map((voice, index) => (
                                        <option key={index} value={index}>
                                            {voice.name} ({voice.lang})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex items-center gap-4 mb-4">
                                <label className="font-bold">Speech Rate:</label>
                                <input
                                    type="range"
                                    className="flex-grow"
                                    min="0.5"
                                    max="2"
                                    step="0.1"
                                    value={rate}
                                    onChange={(e) => setRate(parseFloat(e.target.value))}
                                />
                                <span className="px-2 py-1 bg-blue-600 text-white rounded">{rate}</span>
                            </div>

                            <div className="flex items-center gap-4 mb-4">
                                <span>{formatTime(currentTime)}</span>
                                <input
                                    type="range"
                                    className="flex-grow"
                                    min="0"
                                    max={duration}
                                    step="0.1"
                                    value={currentTime}
                                    onChange={(e) => setCurrentTime(parseFloat(e.target.value))}
                                />
                                <span>{formatTime(duration)}</span>
                            </div>

                            <div className="flex justify-center gap-4 mt-4">
                                <button
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    onClick={handleSpeak}
                                >
                                    Speak
                                </button>
                                <button
                                    className={`px-4 py-2 rounded ${
                                        isPaused
                                            ? 'bg-green-600 text-white hover:bg-green-700'
                                            : 'bg-yellow-600 text-white hover:bg-yellow-700'
                                    }`}
                                    onClick={isPaused ? handleResume : handlePause}
                                >
                                    {isPaused ? 'Resume' : 'Pause'}
                                </button>
                                <button
                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                    onClick={handleStop}
                                >
                                    Stop
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TextToSpeech;
