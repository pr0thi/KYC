import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Voice from './components/Voice';
import Webcam from './components/WebCam';
import WebVoice from './components/WebVoice';
import Speech from './components/Speech';
import Image from './components/Image';
import Compare from './components/Compare';
import Name from './components/Name';
const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path:"/voice",
    element:<Voice/>
  }, 
  {
    path:"/video", 
    element:<Webcam/>
  }, 
  {
    path:"/webvoice", 
    element:<WebVoice/>
  }, 
  {
    path:"/speech", 
    element:<Speech/>
  }, 
  {
    path:"/image", 
    element:<Image/>
  }, 
  {
    path:"/compare", 
    element:<Compare/>
  }, 
  {
    path:"/name", 
    element:<Name/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={appRouter}>
      <App />
    </RouterProvider>
  </React.StrictMode>,
);
reportWebVitals();
