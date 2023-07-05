import React, { useState } from 'react';
import Webcam from 'react-webcam';
import './FoodRecipeSearch.css'; // Import the CSS file for styling

const FoodRecipeSearch = () => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showWebcam, setShowWebcam] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const webcamRef = React.useRef(null);

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setShowWebcam(false);
    setShowUpload(true);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Perform search or other actions based on the captured or uploaded image
  };

  const retakeImage = () => {
    setCapturedImage(null);
    setShowWebcam(true);
    setShowUpload(false);
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

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        {showWebcam && (
          <div className="webcam-container">
            <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
            <button type="button" className='bg-primaryGreen text-white' onClick={captureImage}>
              Capture
            </button>
          </div>
        )}
        {showUpload && (
          <div>
            <input type="file" onChange={handleImageUpload} id="file-input" />
            <label htmlFor="file-input" className="file-input-label">
              Upload Image
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
              <button type="button" className='bg-primaryGreen text-white' onClick={retakeImage}>Retake</button>
              <button type="submit" className='bg-primaryGreen text-white'>Search</button>
            </div>
          </div>
        )}
      </form>
      <div className="button-group">
        <button
          type="button"
          className={` bg-primaryGreen text-white option-button ${showWebcam ? 'active' : ''}`}
          onClick={() => {
            setShowWebcam(true);
            setShowUpload(false);
          }}
        >
          Capture from Webcam
        </button>
        <button
          type="button"
          className={`bg-primaryGreen text-white option-button ${showUpload ? 'active' : ''}`}
          onClick={() => {
            setShowWebcam(false);
            setShowUpload(true);
          }}
        >
          Upload Image
        </button>
      </div>
    </div>
  );
};

export default FoodRecipeSearch;
