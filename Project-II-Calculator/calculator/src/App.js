import React, { useState } from 'react';
import './App.css';

import CalculatorDisplay from './components/DisplayComponents/CalculatorDisplay';
import NumberButton from './components/ButtonComponents/NumberButton';
import ActionButton from './components/ButtonComponents/ActionButton';

const App = () => {

  const numberButtons = Array.apply(null, Array(10)).map((num, index) => {

    //Style # Buttons
    if(index!==0) var buttonClass = "button button-normal";
    else var buttonClass = "button button-wide"

    return <NumberButton
      key= { index }
      className= { buttonClass }
      number= { index } />
  }).reverse();

  //Initialize State
  const [buttonSequenceState, setButtonSequenceState ] = useState([]);
  const [displayState, setDisplayState ] = useState('');

  //Button Click Handler
  const buttonPressHandler = value => {

    setButtonSequenceState([
      ...buttonSequenceState,
      event
    ]);

    setDisplayState(buttonSequenceState.join(''));

  }


    



  return (

    <div className="App">
      <div className="calculator-container">
        <CalculatorDisplay displayString={displayState} />
        <div className="input-container">
          <div className="input-container-left">
            <ActionButton className="button button-wide" operation="clear" />
            { numberButtons }
          </div>
          <div className="input-container-right">
            <ActionButton className="button button-wide" operation="/" />
            <ActionButton className="button button-wide" operation="x" />
            <ActionButton className="button button-wide" operation="-" />
            <ActionButton className="button button-wide" operation="+" />
            <ActionButton className="button button-wide" operation="=" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
