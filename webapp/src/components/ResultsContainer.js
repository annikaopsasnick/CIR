
import CocktailList from './CocktailList'
import Cocktail from './Cocktail'
import PropTypes from 'prop-types';
import { useState } from 'react';

const ResultsContainer = ({ cocktails, isList }) => {



  const [cocktail, setCocktail] = useState({ 'ingredients': "", 'description': "", 'name': "", 'url': "", 'image_source': "", 'rating': 0 })
  
  const [variant, setVariant] = useState(isList)
  // cocktails = []

  const ViewCocktail = (cocktail_name) => {
    setVariant(false)
    var prev = cocktail
    setCocktail(cocktails.find(cocktail => cocktail.name == cocktail_name));



    // render the Cocktail.js
  }

  var CurrentComponent;

  if (variant) {
    CurrentComponent = <CocktailList cocktails={cocktails} ViewCocktail={ViewCocktail} isList={variant} />;
  } else {
    CurrentComponent =
      <Cocktail ingredients={cocktail.ingredients}
        description={cocktail.description}
        name={cocktail.name}
        url={cocktail.url}
        image_source={cocktail.image}
        rating={5}
        setIsList={setVariant} />
  }

  return (
    <div className="result-container">
      {CurrentComponent}
    </div>
  )

}


ResultsContainer.propTypes = {
  cocktails: PropTypes.array.isRequired,
  isList: PropTypes.bool.isRequired
}

export default ResultsContainer