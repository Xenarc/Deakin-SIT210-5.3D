// Original source (C++): https://github.com/Xenarc/Deakin-SIT210-2.1P/blob/main/src/morse.h

const delay = require('delay');

class Morse
{
  static delayMillis = 125;
  static morseLookup(character)
  {
    switch (character)
    {
      case 'A': return ".-";
      case 'B': return "-...";
      case 'C': return "-.-.";
      case 'D': return "-..";
      case 'E': return ".";
      case 'F': return "..-.";
      case 'G': return "--.";
      case 'H': return "....";
      case 'I': return "..";
      case 'J': return ".---";
      case 'K': return "-.-";
      case 'L': return ".-..";
      case 'M': return "--";
      case 'N': return "-.";
      case 'O': return "---";
      case 'P': return ".--.";
      case 'Q': return "--.-";
      case 'R': return ".-.";
      case 'S': return "...";
      case 'T': return "-";
      case 'U': return "..-";
      case 'V': return "...-";
      case 'W': return ".--";
      case 'X': return "-..-";
      case 'Y': return "-.--";
      case 'Z': return "--..";
      case '0': return "-----";
      case '1': return ".----";
      case '2': return "..---";
      case '3': return "...--";
      case '4': return "....-";
      case '5': return ".....";
      case '6': return "-....";
      case '7': return "--...";
      case '8': return "---..";
      case '9': return "----.";
      case ' ': return "----";
      default: return "";
    }
  }

  async Toggle(LED, onLengthMillis)
  {
    // On
    LED.writeSync(1);
    // Wait
    await delay(onLengthMillis);
    // Off
    LED.writeSync(0);
  }

  async printMorse(message, LED)
  {
    // For each character
    for (let messageIndex = 0; messageIndex < message.length; messageIndex++)
    {
      // Store character
      const character = message[messageIndex];
      console.log(character);
      
      // Store morse sequence
      const morse = Morse.morseLookup(character.toUpperCase());
      
      // Pass if the character is not in the morse lookup
      if(morse === "") continue;
      
      // For each dot/dash in the morse sequence
      for (let j = 0; j < morse.length; j++)
      {
        // Print dot or dash respectively
        if(morse[j] === '.') await this.Toggle(LED, Morse.delayMillis);
        else await this.Toggle(LED, Morse.delayMillis*2);
        
        // Gap between dot/dash
        await delay(Morse.delayMillis);
      }
      // Gap between characters
      await delay(Morse.delayMillis*2);
    }
  }
}

module.exports = Morse;
