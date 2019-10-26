const React = require("react");
const Jumbotron = require("react-bootstrap/Jumbotron");
const {useEffect, useCallback, useRef} = require("react");
const Webcam = require("react-webcam");

const styles = {
  App: {
    textAlign: "center",
  },

  AppHeader: {
    backgroundColor: "#282c34",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    fontSize: "calc(10px + 2vmin)",
    color: "white",
  },

  webcam: {
    alignContent: "center",
  },
};

// const devicePort = 0;
// const wCap = new cv.VideoCapture(devicePort);

// // read frames from capture
// const frame = wCap.read();

function App() {
  const webcamRef = useRef(null);
   
  const capture = useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
      var request = new XMLHttpRequest();
      request.open("POST", "/detect", true);
      request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
      request.send(JSON.stringify({"image": imageSrc}));
    },
    [webcamRef]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      capture();
    }, 0);
    return () => clearInterval(interval);
  });

  const videoConstraints = {
    width: 600,
    height: 600,
    facingMode: "user"
  };

  const WebcamCapture = () => {
   
    return (
      <>
        <Webcam
          audio={false}
          height={600}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={600}
          videoConstraints={videoConstraints}
        />
      </>
    );
  };

  return (
    <div style={styles.App}>
      <header style={styles.AppHeader}>
        <Jumbotron fluid>
          <h1>Jazz Hands</h1>
        </Jumbotron>
        <div styles={styles.webcam}>
          <WebcamCapture
          />
        </div>
      </header>
    </div>
  );
}
  

export default App;
