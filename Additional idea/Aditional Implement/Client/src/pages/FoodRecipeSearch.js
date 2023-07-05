import React, { useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import './FoodRecipeSearch.css';

const FoodRecipeSearch = () => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showWebcam, setShowWebcam] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [recipeData, setRecipeData] = useState(null);
  const webcamRef = React.useRef(null);

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setShowWebcam(false);
    setShowUpload(true);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (capturedImage || uploadedImage) {
      const formData = new FormData();

      if (capturedImage) {
        const capturedFile = dataURLtoFile(capturedImage, 'captured.jpg');
        formData.append('image', capturedFile);
      } else if (uploadedImage) {
        formData.append('image', uploadedImage);
      }

      try {
        const response = await fetch('http://localhost:8501/predict', {
          method: 'POST',
          body: formData,
        });

        // Handle the response from the server
        if (response.ok) {
          // Send the predicted class value to the /food-recipes endpoint
          axios.get('http://localhost:3100/food-recipes', {
            params: {
              // foodId: result.predicted_class,
              foodId: 0,
            },
          })
            .then((response) => {
              // Handle the response from the /food-recipes endpoint
              setRecipeData(response.data); // Store the recipe data in state
            })
            .catch((error) => {
              // Error handling
              console.error('Error:', error);
            });
        } else {
          // Error handling
          console.error('Error:', response.statusText);
        }
      } catch (error) {
        // Error handling
        console.error('Error:', error);
      }
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setUploadedImage(reader.result);
      setShowWebcam(false);
      setShowUpload(false);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const retakeImage = () => {
    setCapturedImage(null);
    setUploadedImage(null);
    setShowWebcam(true);
    setShowUpload(false);
    setPrediction(null);
  };

  const handleWebcamClick = () => {
    if (!showWebcam) {
      setShowWebcam(true);
      setShowUpload(false);
      setPrediction(null);
    }
  };

  const handleUploadClick = () => {
    if (!showUpload) {
      setShowWebcam(false);
      setShowUpload(true);
      setPrediction(null);
    }
  };

  // Helper function to convert data URL to a File object
  function dataURLtoFile(dataURL, filename) {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        {showWebcam && (
          <div className="webcam-container">
            <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
            <button type="button" className='bg-primaryGreen text-white' onClick={captureImage} disabled={!!capturedImage || !!uploadedImage}>
              Capture
            </button>
          </div>
        )}
        {showUpload && (
          <div>
            <input type="file" onChange={handleImageUpload} id="file-input" disabled={!!capturedImage || !!uploadedImage} />
            <label htmlFor="file-input" className={`file-input-label ${capturedImage || uploadedImage ? 'hidden' : ''}`}>
              Upload Image Here
            </label>
          </div>
        )}
        {(capturedImage || uploadedImage) && (
          <div>
            {capturedImage && (
              <div>
                <img src={capturedImage} alt="Captured" />
              </div>
            )}
            {uploadedImage && (
              <div>
                <img src={uploadedImage} alt="Uploaded" />
              </div>
            )}
            <div>
              <button type="submit" className='bg-primaryGreen text-white'>Search</button>
              <button type="button" onClick={retakeImage} className='bg-primaryGreen text-white'>Retake</button>
            </div>
          </div>
        )}
      </form>
      <div className="button-group">
        <button
          type="button"
          className={`bg-primaryGreen text-white option-button ${showWebcam ? 'active' : ''} ${!showWebcam && !capturedImage && !uploadedImage ? 'disabled' : ''}`}
          onClick={handleWebcamClick}
        >
          Capture from Webcam
        </button>
        <button
          type="button"
          className={`bg-primaryGreen text-white option-button ${showUpload ? 'active' : ''} ${!showUpload && !capturedImage && !uploadedImage ? 'disabled' : ''}`}
          onClick={handleUploadClick}
        >
          Upload Image
        </button>
      </div>
      {prediction && (
        <div>
          <p>Predicted Class: {prediction.predicted_class}</p>
          <p>Confidence Level: {prediction.confidence_level}</p>
        </div>
      )}
      {recipeData && (
        <div className="recipe-details">
          <h2>{recipeData.Name}</h2>
          <h3>Ingredients:</h3>
          <ul>
            {recipeData.Ingredients && recipeData.Ingredients.split('\n').map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h3>Steps:</h3>
          <ol>
            {recipeData.Steps && recipeData.Steps.split('\n').map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      )}

    </div>
  );

};

export default FoodRecipeSearch;
