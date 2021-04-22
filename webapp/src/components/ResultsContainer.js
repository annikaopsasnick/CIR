
import CocktailList from './CocktailList'
import Cocktail from './Cocktail'
import PropTypes from 'prop-types';
import { useState } from 'react';

const ResultsContainer = ({ cocktails, isList }) => {


  var default_cocktail_info = { 'ingredients': "", 'description': "", 'name': "", 'url': "", 'image_source': "", 'rating': 0 }

  // store cocktail info based on selection
  const [cocktail, setCocktail] = useState(default_cocktail_info)

  // toggle between list and cocktail view
  const [variant, setVariant] = useState(isList)


  const ViewCocktail = (cocktail_name) => {
    setVariant(false) // exit list view 
    var updated_cocktail = cocktails.find(cocktail => cocktail.name == cocktail_name)
    setCocktail(updated_cocktail);
  }

  var CurrentComponent; // one of CocktailList or Cocktail

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

// define property types of ResultsContainer (for debugging)
ResultsContainer.propTypes = {
  cocktails: PropTypes.array.isRequired,
  isList: PropTypes.bool.isRequired
}

export default ResultsContainer