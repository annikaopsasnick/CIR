import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Form from './components/Form.js';
import ResultsContainer from './components/ResultsContainer.js';


function App() {

  const default_input = { 'temp': 'nopref', 'query_string': '', 'base_spirit': 'nopref', 'ingredients': [], 'season': 'nopref'}

  const [inputs, setInputs] = useState(default_input)
  const [results, updateResults] = useState([])
  const [initialPage, updateInitialPage] = useState(true)

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputs.query_string === "" & inputs.temp === 'nopref' & inputs.base_spirit === 'nopref' & inputs.season === 'nopref') {
      alert("Please enter a search term or filter.");
    }
    axios.post('/query', inputs) // send inputs to backend
      .then((response) => {
        console.log(response); // recieve relevant list of cocktails 
        console.log("it works!")
        var cocktail_results = JSON.parse(response.data.cocktails)
        updateInitialPage(false)
        updateResults(cocktail_results, () => console.log("results", results))
      }, (error) => {
        console.log(error);
      });
  }

  let result_contents = (results.length != 0 & !initialPage) ?
    < ResultsContainer cocktails={results} isList={true} /> :
    (initialPage) ? <div className="first-render"></div> :
      <div className="no-results">No cocktails found. Try a different search! </div>


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
              {result_contents}
              {/* < ResultsContainer cocktails={results} isList={true} /> */}
            </div>


          </div>
        </section>
      </body>
    </div>


  );
}

export default App;
