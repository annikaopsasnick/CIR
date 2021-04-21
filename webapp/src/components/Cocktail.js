
import PropTypes from 'prop-types';
// import { Image as ImageNative } from 'react-native';


// const Image = ({ style, source }) => (
//   <ImageNative source={source} style={style} />
// );


const Cocktail = (props) => {

  console.log("inside cocktail", props.ingredients.split(","))

  const ingredients = props.ingredients.split(",").map((ingredient, i) => <li key={i}>{ingredient}</li>);

  return (
    <div className="Cocktail">
      <button onClick={() => props.setIsList(true)}
        type="button">close</button>

      <h2 className="Cocktail_name">{props.name}</h2>
      <h3 className="Cocktail_sub_title">Ingredients
        </h3>
      <ul className="Cocktail_ingredients">
        {ingredients}
      </ul>
      <h3 className="Cocktail_sub_title">Description
        </h3>
      <p>{props.description}</p>
      <h4 className="Cocktail_reference">Reference:</h4>
      <p>{props.url}</p>
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