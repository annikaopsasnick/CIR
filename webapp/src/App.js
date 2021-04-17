import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Form from './Form.js';


function App() {
  const [getMessage, setGetMessage] = useState({})
  const [name, setName] = useState("myname")
  const [netid, setNetID] = useState("myid")
  const [inputs, setInputs] = useState({'user_name': '', 'key_words': '', 'base_spirit': 'vodka', 'ingredients': ['gin', 'lemon']})

  useEffect(() => {
    axios.get('/')
      .then(response => {
        console.log("SUCCESS", response)
        setGetMessage(response)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])


  return (

    <div className="App">

      <body>
      <div className="form-container">Test
        < Form
        inputs= {inputs} 
        setInputs = {setInputs}
     

        onSubmit={(x) => setName(x)}/>
        
        </div>

        <div class="topcorner">
          <p>Project Name: {name}</p>
          <p>Student Names: {netid}</p>

        </div>
        

      </body>
    </div>


  );
}

export default App;
