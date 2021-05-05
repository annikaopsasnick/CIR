import PropTypes from 'prop-types';
import Tags from './Tags';

const Form = ({ inputs, setInputs, handleSubmit }) => {

  // change input object based on user actions
  function handleChange(e) { //output 
    let key = e.target.name;
    let value = e.target.value;
    inputs[key] = value;
    setInputs({ ...inputs });
    console.log(inputs);
  }

  // change input object for checkbox selection/de-selection
  function handleChecked(e) {
    let isChecked = e.target.checked
    let key = e.target.name
    let value = isChecked
    inputs[key] = value;
    setInputs({ ...inputs });
    console.log(inputs);
  }

  // only using exclude tags (tagsNo) for now
  function handleChangedTags(tag) {
    let key = "tagsNo"
    console.log(tag, "inside tags")
    let value = tag
    if (key in inputs) {
      inputs[key].push(value);
    } else {
      inputs[key] = [value];
    }
    setInputs({ ...inputs });
    console.log(inputs);
  }

  // only using exclude tags (tagsNo) for now
  function handleDeleteTags(i) {
    let key = "tagsNo"
    console.log(i, "delete tags")
    inputs[key].splice(i, 1);
    setInputs({ ...inputs });
    console.log(inputs);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div class="input-pair search">
        <label>Search</label>
        <input class="search-input" type="text" name="query_string" placeholder="Ex: fruity fun lemon" onChange={handleChange} spellcheck="true" />
      </div>

      <div class="filter-container">
        <p>Advanced Search</p>
        <div class="input-pair">
          <label>Base Spirit: </label>
          <select id="base_spirit" name="base_spirit" onChange={handleChange}>
            <option value="nopref" selected="selected">No Preference</option>
            <option value="vodka">Vodka</option>
            <option value="tequila">Tequila</option>
            <option value="gin">Gin</option>
            <option value="rum">Rum</option>
            <option value="whiskey">Whiskey</option>
            <option value="brandy">Brandy</option>
            <option value="liqueur">Liqueur</option>
            <option value="wine">Wine</option>
            <option value="lowalc">Low Alcohol</option>
          </select>
        </div>

        {/* <div class="input-pair">
          <label for="tagsYes">Include All: </label>
          <Tags name="tagsYes" handleChangedTags={handleChangedTags} handleDeleteTags={handleDeleteTags}></Tags>
        </div> */}

        <div class="input-pair">
          <label for="tagsNo">Exclude Ingredients: </label>
          <Tags name="tagsNo" handleChangedTags={handleChangedTags} handleDeleteTags={handleDeleteTags}></Tags>
        </div>


        <div class="input-pair">
          <label for="easy">5 or Less Ingredients: </label>
          <input type="checkbox" name="easy" id="easy" onChange={handleChecked}></input>
        </div>
        <br></br>

        <div class="input-pair">
          <label for="temp">Temperature: </label>
          <select name="temp" id="temp" onChange={handleChange}>
            <option value="nopref" selected="selected">No Preference</option>
            <option value="iced">Iced</option>
            <option value="hot">Hot</option>
          </select>
        </div>


        <div class="input-pair">
          <label for="season">Season</label>
          <select name="season" id="season" onChange={handleChange}>
            <option value="nopref" selected="selected">No Preference</option>
            <option value="winter">Winter</option>
            <option value="spring">Spring</option>
            <option value="summer">Summer</option>
            <option value="fall">Fall</option>
          </select>
        </div>
        <div class = "input-pair">
          <label for="sortby">Sort By: </label>
          <select name = "sortby" id = "sortby" onChange={handleChange}>
            <option value = "rating"> Star Rating</option>
            <option value = "best_results">Best Results</option>
            <option value="nopref" selected="selected">No Preference</option>
          </select>
        </div>
        <button class="submit-form" type="submit" value="Submit">Submit</button>
      </div>
    </form>
  );
}


export default Form