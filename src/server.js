const express = require("express");
const Gpio = require('onoff').Gpio;

const Red = new Gpio(20, 'out');
const Green = new Gpio(16, 'out');
const Blue = new Gpio(21, 'out');

const app = express();

let LEDStates = {
  red: false,
  green: false,
  blue: false,
}

function resetAllLEDStates() {
  // Set all to false
  LEDStates.red = false;
  LEDStates.green = false;
  LEDStates.blue = false;
}

function updateLEDStates(){
  if(LEDStates.red) Red.writeSync(1);
  else Red.writeSync(0);
  if(LEDStates.green) Green.writeSync(1);
  else Green.writeSync(0);
  if(LEDStates.blue) Blue.writeSync(1);
  else Blue.writeSync(0);
}


app.get("/LED/red/1", (req, res) => {
  resetAllLEDStates();
  console.log("/LED/red/1");
  LEDStates.red = true;
  updateLEDStates();
  return res.sendStatus(200);
});

app.get("/LED/red/0", (req, res) => {
  resetAllLEDStates();
  console.log("/LED/red/0");
  LEDStates.red = true;
  updateLEDStates();
  return res.sendStatus(200);
});

app.get("/LED/green/1", (req, res) => {
  resetAllLEDStates();
  console.log("/LED/green/1");
  LEDStates.green = true;
  updateLEDStates();
  return res.sendStatus(200);
});

app.get("/LED/green/0", (req, res) => {
  resetAllLEDStates();
  console.log("/LED/green/0");
  LEDStates.green = true;
  updateLEDStates();
  return res.sendStatus(200);
});

app.get("/LED/blue/1", (req, res) => {
  resetAllLEDStates();
  console.log("/LED/blue/1");
  LEDStates.blue = true;
  updateLEDStates();
  return res.sendStatus(200);
});

app.get("/LED/blue/0", (req, res) => {
  resetAllLEDStates();
  console.log("/LED/blue/0");
  LEDStates.blue = true;
  updateLEDStates();
  return res.sendStatus(200);
});


const PORT = 3005;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

process.on('SIGINT', () => {
  // Reset LED states
  resetAllLEDStates();
  
  // Update GPIO's
  updateLEDStates();
  
  // Cleanup
  Red.unexport();
  Green.unexport();
  Blue.unexport();
});
