import React, { Component } from 'react';
const logo = require('./logo.svg');

const styles = {
  App: {
    textAlign: "center",
  },

  AppLogo: {
    height: "40vmin",
  },

  AppHeader: {
    backgroundColor: "#282c34",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "calc(10px + 2vmin)",
    color: "white",
  },

  AppLink: {
    color: "#09d3ac",
  },

};

const devicePort = 0;
const wCap = new cv.VideoCapture(devicePort);

// read frames from capture
const frame = wCap.read();

function App() {
  return (
    <div style={styles.App}>
      <header style={styles.AppHeader}>
        <img src={logo} style={styles.AppLogo} alt="logo" />
        {frame}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          style={styles.AppLink}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
  

export default App;
