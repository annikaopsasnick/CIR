import axios from 'axios';

const Form = ({inputs, setInputs, handleSubmit}) => {



  function handleChange(e) { //output 
   let key = e.target.name;
   let value = e.target.value;
   // add checkbox - detect deselect
    console.log(e.target)
    inputs[key]= value;
    setInputs({...inputs});
    
    console.log(inputs);
  }

  function handleChecked(e) {
    let isChecked = e.target.checked
    let key = e.target.name
    let value = isChecked
    inputs[key]= value;
    setInputs({...inputs});
    console.log(inputs);
  }

    return (
      <form onSubmit={handleSubmit}>
        <div class = "input-pair">
          <label>
            Search:
            <input type="text" name= "query_string" onChange={handleChange} />
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

          <select id="base_spirit" name="base_spirit" onChange={handleChange}>
            <option value= {inputs.base_spirit} >--Please choose a base spirit--</option>
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
          <input id="mock" name="mocktail" type="checkbox" onChange={handleChecked}/>
          <span class="slider round"></span>
        </label>
        

        <label class="switch">
          Iced?
          <input id="ice" name="ice" type="checkbox" onChange={handleChecked}/>
          <span class="slider round"></span>
        </label>
        


      </form>
    );
  }


export default Form