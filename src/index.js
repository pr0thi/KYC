import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Voice from './components/Voice';
import Webcam from './components/WebCam';
import WebVoice from './components/WebVoice';
import Speech from './components/Speech';
import Image from './components/Image';
import Compare from './components/Compare';
import Name from './components/Name';
import Aadhar from './components/Aadhar';
import Pan from './components/Pan';
import Salary from './components/Salary'
import Finish from './components/Finish';
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
  }, 
  {
    path:"/aadhar", 
    element:<Aadhar/>
  }, 
  {
    path:"/pan", 
    element:<Pan/>
  }, 
  {
    path:"/salary", 
    element:<Salary/>
  },
  {
    path:"/finish", 
    element: <Finish/>
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
