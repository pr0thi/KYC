import React, { useState } from 'react';
import "../App.css";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Voice = () => {
    const [textToCopy, setTextToCopy] = useState("");
    const [isCopied, setIsCopied] = useState(false);
    const [spokenValues, setSpokenValues] = useState([]);

    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return null
    }

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
    };

    return (
        <>
            <div className="container">

                <div className="main-content" onClick={handleCopy}>
                    {transcript}
                </div>

                <div className="btn-style">
                    <button onClick={handleCopy}>
                        {isCopied ? 'Copied!' : 'Copy to clipboard'}
                    </button>
                    <button className="btn" onClick={startListening}>Start Listening</button>
                    <button className="btn" onClick={SpeechRecognition.stopListening}>Stop Listening</button>
                    <button className="btn" onClick={handleReset}>Reset</button>
                </div>
                {spokenValues}
            </div>
        </>
    );
};

export default Voice;