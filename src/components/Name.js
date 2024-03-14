import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import "../App.css";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Speech from './Speech';
import "./Name.css"

const Name = () => {


    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [capturing, setCapturing] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();


    const [textToCopy, setTextToCopy] = useState("");
    const [isCopied, setIsCopied] = useState(false);
    const [spokenValues, setSpokenValues] = useState([]);




    const handleStartRecording = useCallback(() => {
        setCapturing(true);
        mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
            mimeType: "video/webm"
        });
        mediaRecorderRef.current.addEventListener(
            "dataavailable",
            handleDataAvailable
        );
        mediaRecorderRef.current.start();
        SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    }, [webcamRef, setCapturing, mediaRecorderRef]);

    const handleDataAvailable = useCallback(({ data }) => {
        if (data.size > 0) {
            setRecordedChunks(prev => prev.concat(data));
        }
    }, [setRecordedChunks]);

    const handleStopRecording = useCallback(() => {
        mediaRecorderRef.current.stop();
        setCapturing(false);
        SpeechRecognition.stopListening();
    }, [mediaRecorderRef, setCapturing]);

    const handleDownload = useCallback(() => {
        if (recordedChunks.length) {
            const blob = new Blob(recordedChunks, {
                type: "video/webm"
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            a.href = url;
            a.download = "react-webcam-stream-capture.webm";
            a.click();
            window.URL.revokeObjectURL(url);
            setRecordedChunks([]);
        }
    }, [recordedChunks]);

    const handleCopy = () => {
        setTextToCopy(transcript);
        setIsCopied(true);
        // Add the transcript to the array of spoken values
        setSpokenValues(prevValues => [...prevValues, transcript]);
        console.log(textToCopy);

    };

    const handleReset = () => {

        setIsCopied(false);
        setSpokenValues([]);
        setRecordedChunks([]);
        setTextToCopy([]);
        setCapturing([]);
    };

    if (!browserSupportsSpeechRecognition) {
        return null
    }

    return (
        <>
            <Speech data="Please speak out your name as per government ID by tapping the Start Recording button. if you wish to hear this prompt again tap on speak"/>
            <div className='container-av'>
                <Webcam audio={false} ref={webcamRef} mirrored={true} />
                {capturing ? (
                    <button className="btn" onClick={handleStopRecording}>Stop Recording</button>
                ) : (
                    <button className="btn" onClick={handleStartRecording}>Start Recording</button>
                )}
                {recordedChunks.length > 0 && (
                    <button className="btn" onClick={handleDownload}>Download</button>
                )}
                <div className="container">
                    <div className="main-content" onClick={handleCopy}>
                        {transcript}
                    </div>
                    <div className="btn-style">
                        <button className="btn" onClick={handleCopy}>Copy to clipboard</button>
                        <button className="btn" onClick={handleStartRecording}>Start Recording</button>
                        <button className="btn" onClick={handleStopRecording}>Stop Recording</button>
                        <button className="btn" onClick={handleReset}>Reset</button>
                    </div>
                </div>
            </div>
            <div>
                {spokenValues.map((value, index) => (
                    <div key={index}>{value}</div>
                ))}
            </div>
        </>
    );
};

export default Name;
