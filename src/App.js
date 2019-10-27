import React, {useEffect, useCallback, useRef, useState} from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Webcam from "react-webcam";
import Button from "react-bootstrap/Button";
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
        // const response  = $.post("./api/detect", {image: imageSrc});
        // setNote(response["note"]);
      }
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

    console.log(JSON.stringify(data));

    var post_req = https.request(post_options, res => {
      res.setEncoding("utf8");
      var returnData = "";
      res.on("data", chunk =>  {
        returnData += chunk;
      });
      res.on("end", () => {
        console.log(returnData);
        callback(returnData);
      });
    });
    post_req.write(JSON.stringify(data));
    post_req.end();
  };

  return (
    <div style={styles.App}>
      <header style={styles.AppHeader}>
        <Jumbotron fluid>
          <h1>Jazz Hands</h1>
        </Jumbotron>
        <div styles={styles.webcam}>
          <Webcam
            audio={false}
            height={600}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={600}
            videoConstraints={videoConstraints}
          />
          <Button 
            variant="primary" 
            onClick={() => {
              httpsPost({"image": webcamRef.current.getScreenshot(), "calibratred":calibrate}, response => {
                console.log(response);
                setCalibrate("true");
              });
            }}>
          Calibrate
          </Button>
        </div>
      </header>
    </div>
  );
}

export default App;
