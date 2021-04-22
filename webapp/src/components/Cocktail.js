
import PropTypes from 'prop-types';

const Cocktail = (props) => {

  // remove brackets and convert string to list 
  var ingredient_list = props.ingredients.replace(/[\[\]']+/g, '').split(",")
  // construct list items from ingredients
  const ingredients = ingredient_list.map((ingredient, i) => <li key={i}>{ingredient}</li>);

  return (
    <div className="Cocktail">

      <button onClick={() => props.setIsList(true)} //close back to list view
        type="button">close</button>

      <h2 className="Cocktail_name">{props.name}</h2>
      <h2 className="Cocktail_rating">{props.rating}</h2>
      <h3 className="Cocktail_sub_title">Ingredients</h3>
      <ul className="Cocktail_ingredients">
        {ingredients}
      </ul>
      <h3 className="Cocktail_sub_title">Description</h3>
      <p>{props.description}</p>
      <h4 className="Cocktail_reference">Reference:</h4>
      < p>{props.url}</p>
      <img className="Cocktail_image" src={props.image_source} alt="cocktail"></img>

    </div>
  )

}


Cocktail.propTypes = {
  ingredients: PropTypes.array.isRequired,
  description: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  image_source: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  setIsList: PropTypes.func.isRequired,
}

export default Cocktail;