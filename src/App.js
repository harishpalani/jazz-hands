import React, {useEffect, useCallback, useRef, useState} from "react";
import Webcam from "react-webcam";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo.png";
const https = require("https");

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

  AppLogo: {
    height: "8vmin",
    width: "8vmin",
    margin: "16px",
  },

  Button: {
    alignSelf: "center",
    width: "600px"
  },

  Heading: {
    font: "Jazz LET",
    marginBottom: "-8px"
  },

  Jumbo: {
    alignItems: "center",
    alignSelf: "center",
    display: "flex",
  },

  webcam: {
    alignContent: "center",
  },
};

function App() {
  const [calibrate, setCalibrate] = useState(false);
  const [note, setNote] = useState("");
  const webcamRef = useRef(null);
   
  const capture = useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
      if (calibrate) {
        httpsPost({"image": imageSrc, "calibrated":calibrate}, response => {
          setNote(response.note);
        });
      }
    },
    [webcamRef, calibrate, note]
  );
  
  useEffect(() => {
    const interval = setInterval(() => {
      capture();
    }, 0);
    return () => clearInterval(interval);
  }, [capture, note]);

  const videoConstraints = {
    width: 600,
    height: 600,
    facingMode: "user"
  };

  const httpsPost = (data, callback) => {
    var post_options = {
      host:  "",
      path: "/api/detect",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(JSON.stringify(data))
      }
    };

    var post_req = https.request(post_options, res => {
      res.setEncoding("utf8");
      var returnData = "";
      res.on("data", chunk =>  {
        returnData += chunk;
      });
      res.on("end", () => {
        callback(returnData);
      });
    });
    post_req.write(JSON.stringify(data));
    post_req.end();
  };

  return (
    <div style={styles.App}>
      <header style={styles.AppHeader}>
        <div style={styles.Jumbo}>
          <img src={logo} style={styles.AppLogo} alt="logo" />
          <h1 style={styles.Heading}>Jazz Hands</h1>
          <img src={logo} style={styles.AppLogo} alt="logo" />
        </div>
        <div styles={styles.webcam}>
          <Webcam
            audio={false}
            height={600}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={600}
            videoConstraints={videoConstraints}
          />
        </div>
        <Button
          onClick={() => {
            httpsPost({"image": webcamRef.current.getScreenshot(), "calibrated":calibrate}, response => {
              setCalibrate("true");
            });
          }}
          style={styles.Button}
          variant="primary" 
        >
        Calibrate
        </Button>
      </header>
    </div>
  );
}

export default App;
