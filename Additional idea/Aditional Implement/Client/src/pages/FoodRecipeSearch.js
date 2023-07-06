import React, { useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import './FoodRecipeSearch.css';

const FoodRecipeSearch = () => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showWebcam, setShowWebcam] = useState(false);
  const [showUpload, setShowUpload] = useState(true);
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
        const capturedFile = await fetch(capturedImage)
          .then((response) => response.blob())
          .then((blob) => new File([blob], 'captured.jpg', { type: 'image/jpeg' }));
        formData.append('image', capturedFile, 'captured.jpg');
      } else if (uploadedImage) {
        formData.append('image', uploadedImage, uploadedImage.name);
      }

      try {
        const response = await axios.post('http://localhost:8501/predict', formData);

        // Handle the response from the server
        if (response.status === 200) {
          const result = response.data;
          // Process the result
          console.log(result);
          // Send the predicted class value to the /food-recipes endpoint
          axios.get('http://localhost:3100/food-recipes', {
            params: {
              foodId: result.predicted_class,
            },
          })
            .then((response) => {
              console.log(response.data);
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

    if (file) {
      setUploadedImage(file);
      setShowWebcam(false);
      setShowUpload(false);
    }
  };

  const retakeImage = () => {
    setCapturedImage(null);
    setUploadedImage(null);
    setShowWebcam(true);
    setShowUpload(false);
  };

  const handleWebcamClick = () => {
    if (!showWebcam) {
      setShowWebcam(true);
      setShowUpload(false);
    }
  };

  const handleUploadClick = () => {
    if (!showUpload) {
      setShowWebcam(false);
      setShowUpload(true);
    }
  };

  return (
    <div>
      <div className="page-heading">
        <h1 className='heading'>Delicious Recipes</h1>
      </div>
      <p className="recipe-description">
        With Foodie Delights, finding delicious recipes is a breeze. Simply capture or upload an image, and our advanced technology will provide you with the best recipe match. Explore the recipe's name, ingredients, and step-by-step instructions in a visually appealing format. Enjoy aresponsive design for a seamless experience on any device. Unleash your inner chef and create culinary masterpieces with Foodie Delights. Happy cooking!
      </p>
      <form onSubmit={handleFormSubmit}>
        {showWebcam && (
          <div className="webcam-container">
            <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
            <button type="button" className="bg-primaryGreen text-white" onClick={captureImage} disabled={!!capturedImage || !!uploadedImage}>
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
                <img src={URL.createObjectURL(uploadedImage)} alt="Uploaded" />
              </div>
            )}
            <div>
              <button type="submit" className="bg-primaryGreen text-white">Search</button>
              <button type="button" onClick={retakeImage} className="bg-primaryGreen text-white">Retake</button>
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
      {recipeData && (
        <div className="recipe-details">
          <hr className="horizontal-line" />
          <h2 className="recipe-name">{recipeData.Name}</h2>

          <img src={recipeData.Image} alt={recipeData.Name} className="food-image" />

          <h3 className="section-title">Ingredients:</h3>
          <ul className="ingredient-list">
            {recipeData.Ingredients && recipeData.Ingredients.split('\n').map((ingredient, index) => (
              <li key={index} className="ingredient-item">{ingredient}</li>
            ))}
          </ul>
          <h3 className="section-title">Steps:</h3>
          <ul className="step-list">
            {recipeData.Steps && recipeData.Steps.split('\n').map((step, index) => {
              if (step.trim() === '') {
                return null; // Skip rendering empty steps
              }
              return (
                <li key={index} className="step-item">{step}</li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FoodRecipeSearch;
