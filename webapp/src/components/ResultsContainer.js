
import CocktailList from './CocktailList'
import Cocktail from './Cocktail'
import PropTypes from 'prop-types';
import { useState } from 'react';

const ResultsContainer = ({ cocktails, isList }) => {

  const [cocktail, setCocktail] = useState({})
  // cocktails = []

  const ViewCocktail = (cocktail_name) => {
    setCocktail(cocktails.find(cocktail => cocktail.name == cocktail_name));
    console.log(cocktail);
    // render the Cocktail.js
  }

  var CurrentContainer;

  if (isList) {
    CurrentContainer = <CocktailList cocktails={cocktails} ViewCocktail={ViewCocktail} isList={isList} />;
  } else {
    CurrentContainer =
      <Cocktail ingredients={cocktail.ingredients}
        description={cocktail.description}
        name={cocktail.name}
        url={cocktail.url}
        image_source={cocktail.image}
        rating={5} />
  }

  return (
    <div className="result-container">
      {CurrentContainer}
    </div>
  )

}


ResultsContainer.propTypes = {
  cocktails: PropTypes.array.isRequired,
  isList: PropTypes.bool.isRequired
}

export default ResultsContainer