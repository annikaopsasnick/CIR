
import ListItem from './ListItem';
import PropTypes from 'prop-types';

const CocktailList = ({ cocktails, ViewCocktail, isList }) => {
  return (
    <>
      {cocktails.map((c, index) =>
        <ListItem key={index}
          ingredients={c.ingredients}
          name={c.name}
          image_source={c.image}
          rating={c.rating}
          ViewCocktail={ViewCocktail}
          isList={isList} />
      )}
    </>
  )

}

CocktailList.propTypes = {
  cocktails: PropTypes.array.isRequired
}


export default CocktailList