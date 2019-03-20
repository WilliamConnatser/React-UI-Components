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

    //If = already in buttonSequenceState array
    //And If it's not the clear button
    if(buttonSequenceState.includes('=') && value !== 'clear') {

      //Get the last value
      const lastItem = buttonSequenceState[buttonSequenceState.length-1];

      //If it's a number, then add it to the end of the solution
      if(typeof value === 'number') {

        const newValue = Number(lastItem.toString() + value);
        setButtonSequenceState([
          newValue    
        ])

      } else {
        //Else, it's an operation
        //With the last operation's value before it
        //Add the operation to the array
        setButtonSequenceState([
          lastItem,
          value
        ]);

      }

      //End function
      return null;
    }

    //If it's an operator or clear, then it will be of String type
    //If it's a number then it will be of Number type
    if(typeof value !== 'string') {

      //If the last array item was an operator
      if(typeof buttonSequenceState[buttonSequenceState.length-1] === 'string') {

        //Then it's a start to a new number
        //Add it to a new array item
        setButtonSequenceState([
          ...buttonSequenceState,
          value
        ]);

      } else if (buttonSequenceState.length === 0) {

        //Else if it's the first item in the array then add it
        setButtonSequenceState([
          value         
        ]);
        
      } else {

        //Else it's the 2nd/3rd/etc digit to the same number
        //Take the last array item, stringify it, add the value to the end
        //Turn it back into a number and replace the last array item with the new value
        const newSequence = [...buttonSequenceState];
        const lastIndex = newSequence.length-1;
        newSequence[lastIndex] = Number(newSequence[lastIndex].toString() + value);

        setButtonSequenceState([
          ...newSequence     
        ]);
        
      }

    }
    
    //An action button was pressed
    else {

      //Clear array if clear button
      if(value === 'clear') {

        setButtonSequenceState([]);

      } else if (value==="=") {

        //If = sign pressed then evaluate math... :(
        const solution = await doMath([...buttonSequenceState, value])

        //Add an equal sign and the solution at the end of the array
        setButtonSequenceState([
          ...buttonSequenceState,
          '=',
          solution
        ]);

      } else if(typeof buttonSequenceState[buttonSequenceState.length-1] === 'string') {

          //Check if there's already an operator last
          //IF so end function here without adding the operator to avoid errors
          return null;

      } else {

        //Else add the operator to the end of the array
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
      buttonClickHandler={ buttonClickHandler.bind(this, index) }
    />
  })
  //Order # buttons
  .reverse();

  //Generate Operator Buttons
  const operators = [ "/", "x", "-", "+", "="];
  const operationButtons = operators.map(button => {
    return <ActionButton
            key={ button }
            className="button button-wide"
            operation={ button }
            buttonClickHandler={ buttonClickHandler.bind(this, button) }
          />
  })

  return (

    <div className="App">
      <div className="calculator-container">
        <CalculatorDisplay displayString= {
          //Join the array using the HTML entity &nbsp;
          //This property is rendered as raw HTML on the Component
          buttonSequenceState.join('&nbsp;')
        }/>
        <div className="input-container">

          <div className="input-container-left">
            <ActionButton
              className="button button-wide clear"
              operation="clear"
              buttonClickHandler={ buttonClickHandler.bind(this, "clear") }
            />
            { numberButtons }
          </div>

          <div className="input-container-right">
            { operationButtons }
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

//Does a math problem, following proper order of operations
function doMath(buttonSequence) {
  //Order of Operations: MD left to right, then AS left to right

  //If operation has both multiplication and division
  if(buttonSequence.includes('x') && buttonSequence.includes('/')) {

    //See which comes first
    if(buttonSequence.indexOf('x') < buttonSequence.indexOf('/')) {

      return doMath(evaluateSegment(buttonSequence, 'x'));
  
    } else {
  
      return doMath(evaluateSegment(buttonSequence, '/'));
  
    }

  }
  
  //Else do multiplication
  else if (buttonSequence.includes('x')) {

    return doMath(evaluateSegment(buttonSequence, 'x'));

  }
  
  //Else do division
  else if (buttonSequence.includes('/')) {

    return doMath(evaluateSegment(buttonSequence, '/'));

  }
  
  //Else if the operation has both addition and subtraction
  else if(buttonSequence.includes('+') && buttonSequence.includes('-')) {

    //See which one comes first
    if (buttonSequence.indexOf('+') < buttonSequence.indexOf('-')) {

      return doMath(evaluateSegment(buttonSequence, '+'));
  
    } else {
  
      return doMath(evaluateSegment(buttonSequence, '-'));
  
    }

  }
  
  //Else do addition
  else if (buttonSequence.includes('+')) {

    return doMath(evaluateSegment(buttonSequence, '+'));

  }
  
  //Else do subtraction
  else if (buttonSequence.includes('-')) {

    return doMath(evaluateSegment(buttonSequence, '-'));

  }
  
  //Else return the solution
  else {

    return buttonSequence[0];
  }
}

//Evaluates a single operation of a mathematical problem
function evaluateSegment(array, operation) {

  //Get the index of the next operation
  const index = array.indexOf(operation);

  //Depending on which operator, perform math
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

  //Remove the two numbers and the operator from the array
  //Insert the value of the product/sum/difference in their place
  array.splice(index-1, 3, value);

  //Return the new array
  return array;
}