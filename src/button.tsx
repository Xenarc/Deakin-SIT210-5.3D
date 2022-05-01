import React from 'react';
import styled from 'styled-components';
import theme from './theme';

const Btn = styled.button`
  display: block;
  width: 100%;
  min-height: 12.5vh;
  height: 100%;
  margin: 0.75em 0;
  background-color: ${(props:{colour:string, selected:boolean}) =>
    props.selected ? props.colour : theme.backgroundAccent};
  border: none;
  color: ${theme.foreground};
  transition: 0.1s;
  font-size: 1.6rem;
  
  :hover{
    cursor: pointer;
    box-shadow: ${(props:{colour:string, selected:boolean, accentColour:string}) =>
    props.selected ? 'inset 0px 0px 5px 0px' + theme.background : '0px 0px 5px 2px' + props.accentColour};
  }
  :active{
    border: solid 1px ${(props:{accentColour:string}) => props.accentColour};
    background-color: ${(props:{accentColour:string}) => props.accentColour};
  }
`;

function Button(props: {
    onClick?:Function,
    onRightClick?:Function,
    colour?:string, 
    accentColour?:string,
    children?:React.ReactNode,
    selected:boolean,
    setSelected?:Function
  }) {
  
  return (
    <Btn
      onContextMenu={(e:any) => {
        e.preventDefault();
        props.onRightClick && props.onRightClick()
      }}
      onClick={() => {
        if(!props.onClick) return;
        props.onClick();
        
        if(!props.setSelected) return;
        props.setSelected(!props.selected);
      }}
      colour={props.colour}
      accentColour={props.accentColour}
      selected={props.selected}
    >
      {props.children}
    </Btn>
  );
}

export default Button;
