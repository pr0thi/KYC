import React, { useEffect, useState } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import './Speech.css'; // Import CSS file

const Speech = (props) => {
  const [text, setText] = useState(props.data);
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [voiceIndex, setVoiceIndex] = useState(null);
  const onEnd = () => {
    // You could do something here after speaking has finished
  };
  const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis({
    onEnd,
  });

  const defaultVoiceIndex = voices.findIndex(voice => voice.lang === 'hi-IN' && voice.name.includes('Google Hindi')); // Find index of Google Hindi voice
  const voice = voices[voiceIndex] || null;

  const styleFlexRow = { display: 'flex', flexDirection: 'row' };
  const styleContainerRatePitch = {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 12,
  };

  useEffect(() => {
    // Speak the text when the component mounts
    speak({ text: props.data, voice, rate, pitch });
  },[]); 

  return (
    <>
      <div className="form-container">
        {!supported && (
          <p>
            Oh no, it looks like your browser doesn&#39;t support Speech
            Synthesis.
          </p>
        )}
        {supported && (
          <React.Fragment>
            <label htmlFor="voice" className="voice-label">Voice</label>
            <select
              id="voice"
              name="voice"
              value={voiceIndex || defaultVoiceIndex}
              className="voice-select"
              onChange={(event) => {
                setVoiceIndex(event.target.value);
              }}
            >
              <option value="">Default</option>
              {voices.map((option, index) => (
                <option key={option.voiceURI} value={index}>
                  {`${option.lang} - ${option.name}`}
                </option>
              ))}
            </select>
            <div className="control-group" style={styleContainerRatePitch}>
              <div style={styleFlexRow}>
                <label htmlFor="rate" className="control-label">Rate: </label>
                <div className="rate-value">{rate}</div>
              </div>
              <input
                type="range"
                min="0.5"
                max="2"
                defaultValue="1"
                step="0.1"
                id="rate"
                className="range-input"
                onChange={(event) => {
                  setRate(event.target.value);
                }}
              />
            </div>
            <div className="control-group" style={styleContainerRatePitch}>
              <div style={styleFlexRow}>
                <label htmlFor="pitch" className="control-label">Pitch: </label>
                <div className="pitch-value">{pitch}</div>
              </div>
              <input
                type="range"
                min="0"
                max="2"
                defaultValue="1"
                step="0.1"
                id="pitch"
                className="range-input"
                onChange={(event) => {
                  setPitch(event.target.value);
                }}
              />
            </div>
            <div className="control-group" style={styleContainerRatePitch}>
              <label className="message-label">Message: {props.data}</label>
              {speaking ? (
                <button type="button" className="stop-button" onClick={cancel}>
                  Stop
                </button>
              ) : (
                <button
                  type="btn"
                  className="speak-button"
                  onClick={() => speak({ text: props.data, voice, rate, pitch })}
                >
                  Listen
                </button>
              )}
            </div>
          </React.Fragment>
        )}
      </div>
    </>
  );
};

export default Speech;
