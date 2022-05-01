import React from 'react';
import './global.css';
import Button from './button.tsx';
import theme from './theme';
import styled from 'styled-components'

const RadioGroup = styled.div`
  margin: 1em 0;
`;

const Radio = styled.button`
  background: none;
  border: 1px solid ${theme.backgroundAccent};
  width: 100%;
  margin-top: -0.5px;
  line-height: 2.5em;
  text-align: left;
  padding: 0 2em;
  color: ${(props) => props.selected ? theme.primary : theme.foreground};
  cursor: pointer;
  position: relative;
  transition: all 0.1s ease-in-out;
  &:hover{
    color: ${(props) => props.selected ? theme.foregroundAccent : theme.foregroundAccent};
    &:after{
      background-color: ${(props) => !props.selected && theme.backgroundAccent};
      border: 2px solid ${theme.primaryAccent};
    }
  }
  
  &:after{
    content: '';
    transition: all 0.1s ease-in-out;
    display: block;
    width: 10px;
    height: 10px;
    background-color: ${(props) => props.selected ? theme.primary : 'none'};
    border-radius:50%;
    position: absolute;
    right: 1em;
    border: 2px solid ${theme.primary};
    top: 50%;
    transform: translateY(-50%);
  }
`;

function App() {
  const [selectedRadio, setSelectedRadio] = React.useState("Red");
  
  React.useEffect(() => {
    fetch(`http://localhost:3005/LED/${selectedRadio.toLowerCase()}/1`).then(response => console.log(response))
  }, [selectedRadio]);
  
  return (
    <div className="App">
      <RadioGroup>
        {['Red', 'Green', 'Blue'].map((colour, key) => (
          <Radio
            key={key}
            onClick={() => setSelectedRadio(colour)}
            selected={selectedRadio === colour}
          >
            {colour}
          </Radio>
        ))}
      </RadioGroup>
      <Button accentColour={theme.danger} onClick={() => {
        console.log("CLOSE");
        window.close();
      }}>
        Close
      </Button>
    </div>
  );
}

export default App;
