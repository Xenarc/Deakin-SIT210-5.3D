import React from 'react';
import './global.css';
import Button from './button.tsx';
import theme from './theme';
import styled from 'styled-components'
import Morse from './morse';

const Container = styled.div`
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  & > button{
    margin: 1em;
  }
`;

function App() {
  const [text, setText] = React.useState("");
  const [status, setStatus] = React.useState("");
  
  const PrintMorse = React.useCallback(() => {
    if(text === '') return;
    if(text.length > 12)
    {
      console.error("Invalid text. Length must be less than 12");
      setStatus("Invalid text. Length must be less than 12");
    }
    console.log(Array.from(text));
    setStatus(`Morse: ${Array.from(text.toUpperCase()).map((c) => Morse.morseLookup(c)).join(' ')}`);
    fetch('http://localhost:3005/', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: text
    }).then(response => console.log(response))
    .catch(e => setStatus(e.message));
  }, [text]);
  
  return (
    <Container className="App">
      <pre>
        {status}
      </pre>
      <input type="text" onChange={(x) => setText(x.target.value)} maxLength={12}/>
      <ButtonContainer>
        <Button accentColour={theme.primary} onClick={() => {
          console.log("Print Morse");
          PrintMorse();
        }}>
          Print Morse
        </Button>
        <Button accentColour={theme.danger} onClick={() => {
          console.log("Close");
          window.close();
        }}>
          Close
        </Button>
      </ButtonContainer>
    </Container>
  );
}

export default App;
