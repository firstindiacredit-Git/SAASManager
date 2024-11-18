import React, { useState, useRef } from "react";
import { Back } from "./back";

const OnlineScreenrecoder = () => {
  const [recording, setRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const videoRef = useRef(null);
  const [fileName, setFileName] = useState("screen-record");

  const startCapture = async () => {
    setRecording(true);
    try {
      const displayMediaOptions = {
        video: true,
        audio: true,
      };
      const stream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
      videoRef.current.srcObject = stream;
      videoRef.current.autoplay = true;
      videoRef.current.muted = true;

      const options = { mimeType: "video/webm; codecs=vp8" };
      const mediaRecorder = new MediaRecorder(stream, options);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks([event.data]);
          const blob = new Blob([event.data], { type: "video/webm" });
          videoRef.current.src = URL.createObjectURL(blob);
          videoRef.current.muted = false;
        }
      };

      stream.getVideoTracks()[0].onended = () => stopCapture();
      mediaRecorder.start();
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  const stopCapture = () => {
    setRecording(false);
    if (videoRef.current.srcObject) {
      let tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const saveRecording = () => {
    if (recordedChunks.length === 0) return;
    const blob = new Blob(recordedChunks, { type: "video/webm" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = `${fileName}.webm`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const shareRecording = () => {
    if (recordedChunks.length === 0) return;
    const blob = new Blob(recordedChunks, { type: "video/webm" });
    const file = new File([blob], `${fileName}.webm`, { type: "video/webm" });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      navigator
        .share({
          files: [file],
          title: fileName,
          text: `${fileName}.webm`,
          url: window.location.href,
        })
        .then(() => console.log("Share was successful."))
        .catch((error) => console.error("Sharing failed", error));
    } else {
      console.error("Your system does not support sharing files.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
        <div className="flex items-center space-x-4 mb-6">
          <Back />
          <h1 className="text-xl font-semibold text-gray-800">
            Online Screen Recorder
          </h1>
        </div>

        <div className="space-y-4">
          <button
            type="button"
            className={`w-full py-3 text-white font-semibold rounded ${
              recording ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
            }`}
            onClick={recording ? stopCapture : startCapture}
          >
            {recording ? "Stop" : "Record"}
          </button>

          <video
            ref={videoRef}
            className="w-full rounded shadow border border-gray-200"
            controls
            autoPlay
          ></video>

          <div>
            <label
              htmlFor="filename"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Enter file name
            </label>
            <input
              type="text"
              id="filename"
              className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="screen-record"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              className="flex-1 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
              onClick={saveRecording}
            >
              Save
            </button>
            <button
              type="button"
              className="flex-1 py-3 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
              onClick={shareRecording}
            >
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineScreenrecoder;
