const express = require("express");
const Gpio = require('onoff').Gpio;
// const Gpio = require('./mockLED');
const Morse = require('./morse');
var cors = require('cors');
var bodyParser = require('body-parser');


const LED = new Gpio(20, 'out');

const app = express();

app.use(bodyParser.text({type: '*/*'}));
app.use(cors());

let isPrinting = false;

const morse = new Morse();

app.options("*", (req, res) => res.sendStatus(200));
app.post("/", bodyParser.text({type: '*/*'}), async (req, res) => {
  console.log(JSON.stringify(req.body));
  console.log(req.body);
  if(isPrinting){
    return res.sendStatus(409); // HTTP conflict
  }
  else{
    isPrinting = true;
    morse.printMorse(req.body, LED)
      .then(() => isPrinting = false); // When finished, set isPrinting to false
    return res.sendStatus(200);
  }
});

const PORT = 3005;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

process.on('SIGINT', () => {
  LED.writeSync(0);
  // Cleanup
  LED.unexport();
});
