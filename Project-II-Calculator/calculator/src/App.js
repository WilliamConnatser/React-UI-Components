import React, { useState } from 'react';
import './App.css';

import CalculatorDisplay from './components/DisplayComponents/CalculatorDisplay';
import NumberButton from './components/ButtonComponents/NumberButton';
import ActionButton from './components/ButtonComponents/ActionButton';

const App = () => {

  //Initialize State
  const [buttonSequenceState, setButtonSequenceState ] = useState([]);

  //Button Click Handler
  const buttonClickHandler = async function(value) {
    console.log("clicked", value, typeof value)

    if(buttonSequenceState.indexOf('=') > -1 && value !== 'clear') {
      return null;
    }

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

        setButtonSequenceState([
          ...newSequence     
        ]);
        
      }

    } else {

      if(value === 'clear') {

        setButtonSequenceState([]);

      } else if (value==="=") {
        //Evaluate math... :(
          const solution = await doMath([...buttonSequenceState, value])

          setButtonSequenceState([
            ...buttonSequenceState,
            '=',
            solution
          ]);

      } else {

        setButtonSequenceState([
          ...buttonSequenceState,
          value
        ]);

      }
    }
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
      buttonClickHandler={ buttonClickHandler.bind(this, index) }/>
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


function doMath(buttonSequence) {
  //Order of Operations: MD left to right, then AS left to right
  if(buttonSequence.includes('x') && buttonSequence.includes('/')) {

    if(buttonSequence.indexOf('x') < buttonSequence.indexOf('/')) {

      return doMath(evaluateSegment(buttonSequence, 'x'));
  
    } else {
  
      return doMath(evaluateSegment(buttonSequence, '/'));
  
    }

  } else if (buttonSequence.includes('x')) {

    return doMath(evaluateSegment(buttonSequence, 'x'));

  } else if (buttonSequence.includes('/')) {

    return doMath(evaluateSegment(buttonSequence, '/'));

  } else if(buttonSequence.includes('+') && buttonSequence.includes('-')) {

    if (buttonSequence.indexOf('+') < buttonSequence.indexOf('-')) {

      return doMath(evaluateSegment(buttonSequence, '+'));
  
    } else {
  
      return doMath(evaluateSegment(buttonSequence, '-'));
  
    }
  } else if (buttonSequence.includes('+')) {

    return doMath(evaluateSegment(buttonSequence, '+'));

  } else if (buttonSequence.includes('-')) {

    return doMath(evaluateSegment(buttonSequence, '-'));

  } else {

    return buttonSequence[0];
  }
}

function evaluateSegment(array, operation) {
  const index = array.indexOf(operation);
  switch(operation) {
    case "-": 
      var value = array[index-1] - array[index+1];
      break;
    case "+":
      var value = array[index-1] + array[index+1];
      break;
    case "x":
      var value = array[index-1] * array[index+1];
      break;
    case "/":
      var value = array[index-1] / array[index+1];
      break;
  }  
  array.splice(index-1, 3, value);
  return array;
}