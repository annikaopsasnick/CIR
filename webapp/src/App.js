import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Form from './Form.js';

import ResultsContainer from './components/ResultsContainer.js';



function App() {

  // const [getMessage, setGetMessage] = useState({})
  // const [name, setName] = useState("myname")
  // const [netid, setNetID] = useState("myid")

  const [inputs, setInputs] = useState({ 'query_string': '', 'key_word': '', 'base_spirit': '', 'ingredients': [] })

  // const cocktails = require('./data/dataset.json')
  // const cocktail_test_list = cocktails.slice(0, 5)

  const [results, updateResults] = useState([])

  // console.log(cocktail_test_list)

  // useEffect(() => {
  //   axios.get('/')
  //     .then(response => {
  //       console.log("SUCCESS", response)
  //       setGetMessage(response)
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     })
  // }, [])

  const handleSubmit = (event) => {
    //   this.props.onSubmit(this.state.value);
    event.preventDefault();

    console.log(event)
    console.log("in handleSubmit")
    console.log(inputs)
    // console.log(inputs.user_name)
    // console.log(inputs['user_name'])

    // axios.get('/query', {data: 'testme'})
    axios.post('/query', inputs)
      .then((response) => {
        console.log(response);
        console.log("it works!")
        var cocktail_results = JSON.parse(response.data.cocktails)
        updateResults(cocktail_results, () => console.log("results", results))
      }, (error) => {
        console.log(error);
      });
  }

  // useEffect(() => {
  //   axios.post('/result')
  //     .then(response => {
  //       console.log("RESULTS", response)
  //       updateResults(response.data.cocktails)
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     })
  // })


  return (

    <div className="App">

      <body>
        <div className="form-container">Test
        < Form
            inputs={inputs}
            setInputs={setInputs}
            handleSubmit={handleSubmit}
          />

        </div>

        {/* <div class="topcorner">
          <p>Project Name: {name}</p>
          <p>Student Names: {netid}</p>

        </div> */}

        <div className="results-container">
          < ResultsContainer
            cocktails={results}
            isList={true} />

        </div>


      </body>
    </div>


  );
}

export default App;
