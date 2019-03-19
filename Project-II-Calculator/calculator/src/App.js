import React, { useState } from 'react';
import './App.css';

import CalculatorDisplay from './components/DisplayComponents/CalculatorDisplay';
import NumberButton from './components/ButtonComponents/NumberButton';
import ActionButton from './components/ButtonComponents/ActionButton';

const App = () => {

  //Initialize State
  const [buttonSequenceState, setButtonSequenceState ] = useState([]);

  //Button Click Handler
  const buttonClickHandler = function(value) {
    console.log("clicked", value, typeof value)

    if(typeof value !== 'string') {
      if(typeof buttonSequenceState[buttonSequenceState.length-1] === 'string') {

        setButtonSequenceState([
          ...buttonSequenceState,
          value
        ]);

      } else if (buttonSequenceState.length === 0) {

        setButtonSequenceState([
          value         
        ]);
        
      } else {

        const newSequence = [...buttonSequenceState];
        const lastIndex = newSequence.length-1;
        newSequence[lastIndex] = Number(newSequence[lastIndex].toString() + value);
        console.log(newSequence)

        setButtonSequenceState([
          ...newSequence     
        ]);
        
      }

    } else {
      console.log(value)
      if(value === 'clear') {

        setButtonSequenceState([]);

      } else if (value==="=") {
        //Evaluate math...

      } else {

        setButtonSequenceState([
          ...buttonSequenceState,
          value
        ]);

      }
    }
    /*
    setButtonSequenceState([
      ...buttonSequenceState,
      value
    ]);
    setDisplayState(buttonSequenceState.join(''));
    */
  }

  //Generate # Buttons
  const numberButtons = Array.apply(null, Array(10)).map((num, index) => {

    //Style # Buttons
    let buttonClass;
    if(index!==0) buttonClass = "button button-normal";
    else buttonClass = "button button-wide"

    return <NumberButton
      key= { index }
      className= { buttonClass }
      number= { index }
      buttonClickHandler={ buttonClickHandler.bind(this) }/>
  })
  //Order # buttons
  .reverse();


  return (

    <div className="App">
      <div className="calculator-container">
        <CalculatorDisplay displayString={ buttonSequenceState.join('&nbsp;') } />
        <div className="input-container">

          <div className="input-container-left">
            <ActionButton
              className="button button-wide"
              operation="clear"
              buttonClickHandler={ buttonClickHandler.bind(this, "clear") }/>              
            { numberButtons }
          </div>

          <div className="input-container-right">
            <ActionButton
              className="button button-wide"
              operation="/"
              buttonClickHandler={ buttonClickHandler.bind(this, "/") }/>
            <ActionButton
              className="button button-wide"
              operation="x"
              buttonClickHandler={ buttonClickHandler.bind(this, "x") }/>
            <ActionButton
              className="button button-wide"
              operation="-"
              buttonClickHandler={ buttonClickHandler.bind(this, "-") }/>
            <ActionButton
              className="button button-wide"
              operation="+"
              buttonClickHandler={ buttonClickHandler.bind(this, "+") }/>
            <ActionButton
              className="button button-wide"
              operation="="
              buttonClickHandler={ buttonClickHandler.bind(this, "=") }/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
