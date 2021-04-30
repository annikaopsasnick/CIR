
import PropTypes from 'prop-types';
// @ts-ignore
import StarRatings from 'react-star-ratings';
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Cocktail = (props) => {

  // remove brackets and convert string to list 
  var ingredient_list = props.ingredients.replace(/[\[\]']+/g, '').split(",")
  // construct list items from ingredients
  const ingredients = ingredient_list.map((ingredient, i) => <li key={i}>{ingredient}</li>);

  const rating = (props.rating == "no_data") ? 0 : Number(props.rating);


  return (


    <div className="Cocktail">

      <button onClick={() => props.setIsList(true)} //close back to list view
        type="button">
        <FontAwesomeIcon icon={faWindowClose} size={'2x'} />
      </button>

      <div className="Cocktail-layout">
        <div className="column">

          <div className="col-item">
            <div className="row">

              <div className="Cocktail_title">
                <h1 className="Cocktail_name">{props.name}</h1>
                <span className="Cocktail_rating">
                  <StarRatings
                    rating={rating}
                    starRatedColor="rgb(228, 104, 61)"
                    numberOfStars={5}
                    starDimension="14px"
                    starSpacing="2px"
                    name='rating'
                  />
                      Rating: {props.rating} · ‎{props.num_reviews} reviews
                    </span>
              </div>

              <div className="image-container">
                <img className="Cocktail_image" src={props.image_source} alt="cocktail"></img>
              </div>



            </div>
          </div>

          <div className="col-item">
            <div className="row">

              <div className="column" id="Ingredients">
                <h2 className="Cocktail_sub_title">Ingredients</h2>
                <ul className="Cocktail_ingredients">
                  {ingredients}
                </ul>
              </div>

              <div className="column" id="Description">
                <h2 className="Cocktail_sub_title">Description</h2>
                <p>{props.description}</p>
                <a href={props.url} target="_blank">go to recipe</a>
              </div>


            </div>


          </div>

        </div>


      </div>
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