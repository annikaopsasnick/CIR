//import React from 'react';
import axios from 'axios';

const Form = ({inputs, setInputs}) => {
  
//class Form extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { value: '' };

  //   this.handleChange = this.handleChange.bind(this);
  //   this.handleSubmit = this.handleSubmit.bind(this);
  // }

  function handleChange(e) { //output 
   // this.setState({ value: key.target.value });
   let key = e.target.name;
   let value = e.target.value;
   // add checkbox - detect deselect
    console.log(e.target)
    inputs[key]= value;
    setInputs({...inputs});
    
    console.log(inputs);
  }

  function handleSubmit(event) {
  //   this.props.onSubmit(this.state.value);
    event.preventDefault();

    console.log(event)
    console.log("in handleSubmit")
    console.log(inputs)
    console.log(inputs.user_name)
    console.log(inputs['user_name'])

    // axios.get('/query', {data: 'testme'})
    axios.post('/query', inputs)
 
  }
    return (
      <form onSubmit={handleSubmit}>
        <div class = "input-pair">
          <label>
            Name:
            <input type="text" name= "user_name" onChange={handleChange} />
          </label>

          <button type="submit" value="Submit">Submit</button>
        </div>

        <div class = "input-pair">

          <label>
            Key Word: 
            
          </label>
          <input type = "text" id="key-words" name= "key_word" onChange={handleChange} />
        </div>

        <div class = "input-pair">
          <label>
            Base Spirit: 
          </label>

          <select id="base_spirit">
            <option value= {inputs.base_spirit} selected>--Please choose a base spirit--</option>
            <option value="vodka">Vodka</option>
            <option value ="tequila">Tequila</option>
            <option value ="gin">Gin</option>
            <option value ="rum">Rum</option>
            <option value ="whiskey">Whiskey</option>
            <option value ="brandy">Brandy</option>
          </select>
        </div>

        <label class="switch">
          Mocktail?
          <input id="mock" name="mocktail" type="checkbox" onChange={handleChange}/>
          <span class="slider round"></span>
        </label>
        

        <label class="switch">
          Iced?
          <input id="ice" name="ice" type="checkbox" onChange={handleChange}/>
          <span class="slider round"></span>
        </label>
        


      </form>
    );
  }


export default Form