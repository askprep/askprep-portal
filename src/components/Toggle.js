import React from 'react';
import styled from 'styled-components';
import Theme from '../themes';

const ToggleContainer = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  background: ${(props) => props.theme.gradient};
  width: 8rem;
  height: 3.5rem;
  margin: 0 auto;
  border-radius: 30px;
  border: 2px solid ${(props) => props.theme.toggleBorder};
  font-size: 0.5rem;
  padding: 0.5rem;
  overflow: hidden;
  cursor: pointer;

  img {
    width: 2.5rem;
    height: auto;
    transition: all 0.3s linear;
  }
`;

const Toggle = ({ type, toggleTheme }) => (
  <ToggleContainer onClick={toggleTheme}>
    <div> Toggle Beautiful Theme !</div>
    <img alt={type} src={Theme[type].link} />
  </ToggleContainer>
);

export default Toggle;
