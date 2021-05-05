import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Form from './components/Form.js';
import ResultsContainer from './components/ResultsContainer.js';
import SearchReccomender from './components/SearchReccomender.js';


function App() {

  const default_input = { 'temp': 'nopref', 'query_string': '', 'base_spirit': 'nopref', 'ingredients': [], 'season': 'nopref', 'easy': '', 'tagsNo': [], 'tagsYes': [], 'sortby': 'nopref'}

  const [inputs, setInputs] = useState(default_input)
  const [results, updateResults] = useState([])
  const [initialPage, updateInitialPage] = useState(true)
  const [search_suggestions, updateSuggestions] = useState({})

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputs.query_string === "" & inputs.temp === 'nopref' & inputs.base_spirit === 'nopref' & inputs.season === 'nopref' & inputs.tagsNo === [] & inputs.tagsYes === [] && inputs.easy == '') {
      alert("Please enter a search term or filter.");
    }
    axios.post('/query', inputs) // send inputs to backend
      .then((response) => {
        console.log(response); // recieve relevant list of cocktails 
        console.log("it works!")
        var cocktail_results = JSON.parse(response.data.cocktails)
        var suggested_words = response.data.search_suggestions
        updateInitialPage(false)
        updateResults(cocktail_results, () => console.log("results", results))
        updateSuggestions(suggested_words)
      }, (error) => {
        console.log(error);
      });
  }

  let result_contents = (results.length != 0 & !initialPage) ?
    < ResultsContainer cocktails={results} isList={true} /> :
    (initialPage) ? <div className="first-render"></div> :
      <div className="no-results">No cocktails found. Try a different search!
        <SearchReccomender
          suggestions={search_suggestions}
        />
      </div>


  return (

    <div className="App">
      <body>
        <section className="container">

          <div className="left">
            <h1 id="title">What is your cocktail order?</h1>
            <h3 id="subtitle">Annika Opsasnick (aro42) Callie Aboaf (cha46) Yunyun Wang (yw458) 
            Simran Puri (sp2262) Kaysie Yu (ky276)</h3>
            <div className="form-container">
              < Form
                inputs={inputs}
                setInputs={setInputs}
                handleSubmit={handleSubmit}
              />

            </div>

            <div class="footer">
              <p>Background Image Source: https://www.pexels.com/photo/blue-harp-decor-on-brown-wooden-table-63633/</p>
            </div>

          </div>
          <div className="right">
            <div className="results-container">
              {result_contents}
              {/* < ResultsContainer cocktails={results} isList={true} /> */}
            </div>


          </div>
        </section>
        {/* <div className = "bottom-left">
          <p>insert citation url</p>
        </div> */}
        </body>

    </div>


  );
}

export default App;
