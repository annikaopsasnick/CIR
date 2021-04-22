import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Form from './components/Form.js';
import ResultsContainer from './components/ResultsContainer.js';


function App() {

  const default_input = { 'query_string': '', 'key_word': '', 'base_spirit': '', 'ingredients': [], 'ice': false, 'mocktail': false }

  const [inputs, setInputs] = useState(default_input)
  const [results, updateResults] = useState([])

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/query', inputs) // send inputs to backend
      .then((response) => {
        console.log(response); // recieve relevant list of cocktails 
        console.log("it works!")
        var cocktail_results = JSON.parse(response.data.cocktails)
        updateResults(cocktail_results, () => console.log("results", results))
      }, (error) => {
        console.log(error);
      });
  }

  return (

    <div className="App">

      <body>
        <section className="container">

          <div className="left">
            <h1 id="title">What is your cocktail order?</h1>
            <div className="form-container">
              < Form
                inputs={inputs}
                setInputs={setInputs}
                handleSubmit={handleSubmit}
              />

            </div>

          </div>
          <div className="right">
            <div className="results-container">
              < ResultsContainer
                cocktails={results}
                isList={true}
              />

            </div>




          </div>
        </section>
      </body>
    </div>


  );
}

export default App;
