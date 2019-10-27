import React, {useEffect, useCallback, useRef} from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import 'react-dropdown/style.css';
import SplitButton from 'react-bootstrap/SplitButton';
import Webcam from "react-webcam";
import Select from "react-dropdown-select";
import "bootstrap/dist/css/bootstrap.min.css";
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';




const styles = {
  App: {
    textAlign: "center",
  },

  AppHeader: {
    backgroundColor: '#065080',
    minHeight: "150vh",
    display: "flex",
    flexDirection: "column",
    fontSize: "calc(10px + 2vmin)",
    color: "white",
  },

  webcam: {
    alignContent: "center",
  },
  attachcontainer: {
   flexDirection:  'row',
   justifyContent: 'space-between'
}
};

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
  const span = {
  backgroundColor: '#E7F5FE',
  }


  const Instruments = [
    { label: <font face="verdana" color="black"> <span> Piano  </span> </font>, value: 1 },
    { label: <font face="verdana" color="black">Violin</font>, value: 2 },
    { label: <font face="verdana" color="black">Trumpet</font>, value: 3 },

  ];

  const droppy = () => (

    <div className="app">
      <div class="center">
        <div style={{width:864}} align="center">
        <Select options={Instruments} onChange={opt => console.log(opt.label, opt.value)}
        />
        </div>
      </div>
    </div>

  );




  return (
    <div style={styles.App}>
      <header style={styles.AppHeader}>
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home"><h1>                </h1> </Navbar.Brand>
        <div class="col-lg-4 col-lg-offset-5 col-xs-2 col-xs-offset-4">
                <ul class=" nav navbar-nav ">
                  <li><a href="#"> </a></li>
               </ul>
         </div>
  <Navbar.Brand href="#home"><h1> Jazz Hands </h1> </Navbar.Brand>
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

<div>
        <div>
<font face="verdana" color="#065080">hello</font>
        </div>

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
<div class="center">

</div>

      </header>


    </div>


  );
}

export default App;
