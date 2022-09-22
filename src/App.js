import imageToUse from "./images/horse.jpeg";
import videoToUse from "./images/horse.mp4";
import aalib from "aalib.js";
import "./App.css";
import { useEffect } from "react";

// tutorial: https://www.cssscript.com/convert-images-videos-ascii-art-aalib-js/
// - note the tutorial didn't quite work for the video,
// I had to use .map and .subscribe instead of .pipe and .end

// Call this function on load with the <img id={imageId}> added to the DOM
function initImage(imageToUse, imageId) {
  aalib.read.image
    .fromURL(imageToUse)
    .map(aalib.filter.contrast(0.9))
    .map(aalib.aa({ width: 530, height: 160 }))
    .map(aalib.filter.brightness(10))
    .map(aalib.render.html({ el: document.getElementById(imageId) }))
    .subscribe();
}

// Call this function on load with the <video muted loop id={videoId}> and the <canvas id={canvasId}> added to the DOM
function initVideo(videoId, canvasId) {
  // First, set up the canvas to subscribe to the video
  // (ie when the video plays, the canvas will render the corresponding ascii)
  aalib.read.video
    .fromVideoElement(document.getElementById(videoId))
    .map(aalib.aa({ width: 165, height: 68 }))
    .map(
      aalib.render.canvas({
        width: 696,
        height: 476,
        el: document.getElementById(canvasId),
      })
    )
    .subscribe();

  // Then, play the video
  document.getElementById(videoId).play();
}

function App() {
  useEffect(() => {
    initImage(imageToUse, "aa-image");
    initVideo("video", "video-scene");
  }, []);

  return (
    <>
      {/* IMAGE */}
      <div className="App">
        <header className="App-header">
          <img alt="seagull" src={imageToUse} />
          <div id="aa-image" style={{ whiteSpace: "pre-wrap" }}></div>
        </header>
      </div>

      {/* VIDEO */}
      <div className="App">
        <header className="App-header">
          <video id="video" src={videoToUse} muted loop controls></video>
          <canvas id="video-scene"></canvas>
        </header>
      </div>
    </>
  );
}

export default App;
