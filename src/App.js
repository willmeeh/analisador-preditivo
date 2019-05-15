import React from 'react';
import logo from './logo.svg';
import './App.css';

import { getFirstsFromG } from './services/first';
import { generateTabularPredictiveTable } from './services/tabular-predictive-table';
import datasets from './data-sets';

// it('get firsts of d1 data set', () => {
    
//     console.log('firsts', firsts);
//     expect(sum(1, 2)).toEqual(3);
//     expect(sum(2, 2)).toEqual(4);
// });

function App() {
  const { grammar, follows } = datasets.d8;
  console.log('grammar', grammar);
  const firsts = getFirstsFromG(grammar);
  console.log('firsts', firsts);

  console.log('firsts', follows);

  const tabelaPreditivaTabular = generateTabularPredictiveTable(grammar, follows);
  console.log('tabelaPreditivaTabular', JSON.stringify(tabelaPreditivaTabular, undefined, 4));


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
