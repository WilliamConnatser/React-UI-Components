import React from 'react';
import './App.css';

import CalculatorDisplay from './components/DisplayComponents/CalculatorDisplay';

const App = () => {
  return (
    <div className="App">
      <div className="calculator-container">
        <CalculatorDisplay displayString="1 x 5 = 5" />
        <div className="input-container">
          <div className="input-container-left">
          
          </div>
          <div className="input-container-right">
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
