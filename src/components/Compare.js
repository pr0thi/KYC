import React, { useRef, useState, useEffect } from 'react';

const Compare = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [similarity, setSimilarity] = useState(null);

  // Initialize webcam on component mount
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => {
        console.error('Error accessing webcam:', err);
      });
  }, []);

  // Handle uploading image
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Calculate Mean Square Error (MSE) between two images
  const calculateMSE = (imageData1, imageData2) => {
    let sum = 0;
    for (let i = 0; i < imageData1.length; i += 4) {
      const diffR = imageData1[i] - imageData2[i];
      const diffG = imageData1[i + 1] - imageData2[i + 1];
      const diffB = imageData1[i + 2] - imageData2[i + 2];
      sum += diffR * diffR + diffG * diffG + diffB * diffB;
    }
    return sum / (imageData1.length / 4);
  };

  // Compare images
  useEffect(() => {
    if (isCapturing && videoRef.current && canvasRef.current && uploadedImage) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      // Draw live video frame on canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Load uploaded image onto canvas
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Compare images pixel by pixel
        const videoData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        const uploadedImageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

        // Calculate similarity
        const mse = calculateMSE(videoData, uploadedImageData);
        // Determine similarity threshold, you can adjust this value as needed
        const similarityThreshold = 10000;
        const isSimilar = mse < similarityThreshold;
        setSimilarity(isSimilar);
      };
      img.src = uploadedImage;
    }
  }, [isCapturing, uploadedImage]);

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <button onClick={() => setIsCapturing(true)}>Capture Image</button>
      <video ref={videoRef} mirror="false" width="400" height="300" autoPlay></video>
      <canvas ref={canvasRef} width="400" height="300"></canvas>
      {similarity !== null && (
        <p>{similarity ? "Images are similar" : "Images are not similar"}</p>
      )}
    </div>
  );
};

export default Compare;