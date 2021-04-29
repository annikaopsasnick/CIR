

const Form = ({inputs, setInputs, handleSubmit}) => {

  // change input object based on user actions
  function handleChange(e) { //output 
   let key = e.target.name;
   let value = e.target.value;
    inputs[key]= value;
    setInputs({...inputs});
    console.log(inputs);
  }

  // change input object for checkbox selection/de-selection
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
            <option value ="liqueur">Liqueur</option>
            <option value ="wine">Wine</option>
          </select>
        </div>

        {/* <label class="switch">
          Mocktail?
          <input id="mock" name="mocktail" type="checkbox" onChange={handleChecked}/>
          <span class="slider round"></span>
        </label> */}
        <div class = "input-pair">
          <label for="temp">Temperature Preference: </label>
          <select name="temp" id="temp" onChange={handleChange}>
            <option value="iced">Iced</option>
            <option value="hot">Hot</option>
            <option value="nopref" selected="selected">No Preference</option>
          </select>
        </div>

        <button type="submit" value="Submit">Submit</button>
      </form>
    );
  }


export default Form