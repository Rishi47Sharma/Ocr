// Global variables
let videoStream = null;
let capturedImageDataURL = null;

// Function to start the camera stream
async function startCamera() {
  try {
    // Get user media (camera) stream
    const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });

    // Display the camera stream on the video element
    const videoElement = document.getElementById("video");
    videoElement.srcObject = mediaStream;
    videoStream = mediaStream;
  } catch (error) {
    console.error("Error accessing camera:", error);
  }
}

// Function to capture a photo from the camera stream
function capturePhoto() {
  const videoElement = document.getElementById("video");
  const canvas = document.createElement("canvas");
  canvas.width = videoElement.videoWidth;
  canvas.height = videoElement.videoHeight;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
  capturedImageDataURL = canvas.toDataURL("image/png");

  // Display the captured photo on the webpage
  const capturedImage = document.getElementById("capturedImage");
  capturedImage.src = capturedImageDataURL;
}

// Function to save the captured photo to localStorage
function savePhoto() {
  if (capturedImageDataURL) {
    // Save the captured image data URL to localStorage
    localStorage.setItem("capturedPhoto", capturedImageDataURL);
    alert("Photo saved to localStorage.");
  } else {
    alert("No photo captured. Please capture a photo first.");
  }
}

// Function to perform OCR on the captured image
async function performOCR() {
  if (capturedImageDataURL) {
    try {
      // Perform OCR using Tesseract.js
      const result = await Tesseract.recognize(
        capturedImageDataURL,
        "eng",
        { logger: info => console.log(info) } // Optional logger for Tesseract.js
      );

      // Display the OCR result on the webpage
      const ocrText = document.getElementById("ocrText");
      ocrText.textContent = result.data.text;
    } catch (error) {
      alert("Error performing OCR: " + error.message);
    }
  } else {
    alert("No photo captured. Please capture a photo first.");
  }
}

// Start the camera stream when the page loads
startCamera();
