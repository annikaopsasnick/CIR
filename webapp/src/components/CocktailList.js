
import ListItem from './ListItem';
import PropTypes from 'prop-types';

const CocktailList = ({ cocktails, ViewCocktail, isList }) => {
  return (
    <div className="CocktailList">
      <ul className="list">
        {cocktails.map((c, index) =>
          <ListItem key={index}
            ingredients={c.ingredients}
            name={c.name}
            image_source={c.image}
            rating={c.rating}
            ViewCocktail={ViewCocktail}
            isList={isList} />
        )}
      </ul>
    </div>
  )

}

CocktailList.propTypes = {
  cocktails: PropTypes.array.isRequired
}


export default CocktailList