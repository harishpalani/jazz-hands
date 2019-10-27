import React, {useEffect, useCallback, useRef, useState} from "react";
import Webcam from "react-webcam";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo.png";
import Select from "react-dropdown-select";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
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
    height: "4vmin",
    width: "4vmin",
    margin: "8px",
  },

  Button: {
    alignSelf: "center",
    width: "600px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
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
  const [calibrate, setCalibrate] = useState("false");
  const [note, setNote] = useState("");
  const webcamRef = useRef(null);
   
  const capture = useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
      if (false) {
        httpsPost({"image": imageSrc, "calibrated":calibrate}, response => {
          setNote(response.note);
        });
      }
    },
    [webcamRef]
  );
  
  useEffect(() => {
    const interval = setInterval(() => {
      capture();
    }, 0);
    return () => clearInterval(interval);
  }, [capture, note, webcamRef]);

  const videoConstraints = {
    width: 600,
    height: 600,
    facingMode: "user"
  };

  const span = {
    backgroundColor: "#E7F5FE",
  };
  
  const Instruments = [
    { label: <font face="verdana" color="black"> <span> Piano  </span> </font>, value: 1 },
    { label: <font face="verdana" color="black">Violin</font>, value: 2 },
    { label: <font face="verdana" color="black">Trumpet</font>, value: 3 },
  
  ];
  
  const droppy = () => (
    <div className="app">
      <div className="center">
        <div style={{width:864}} align="center">
          <Select options={Instruments} onChange={opt => console.log(opt.label, opt.value)}
          />
        </div>
      </div>
    </div>
  
  );

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
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home"><h1>                </h1> </Navbar.Brand>
          <div className="col-lg-4 col-lg-offset-5 col-xs-2 col-xs-offset-4">
            <ul className=" nav navbar-nav ">
              <li><a href="#"> </a></li>
            </ul>
          </div>  
          <Navbar.Brand href="#home" style={styles.Jumbo}>
            <h1> Jazz Hands </h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown title="Select an Instrument" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
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
            httpsPost({"image": webcamRef.current.getScreenshot(), "calibrated":"false"}, response => {
              setCalibrate("true");
            });
          }}
          style={styles.Button}
          variant="primary" 
        >
          <img src={logo} style={styles.AppLogo} alt="logo" />
          <a style={styles.ButtonText}>Calibrate</a>
          <img src={logo} style={styles.AppLogo} alt="logo" />
        </Button>
      </header>
    </div>
  );
}

export default App;
