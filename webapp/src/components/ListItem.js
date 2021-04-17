import PropTypes from 'prop-types';


const ListItem = (props) => {
  return (
    <button onClick={() => {
      props.isList = false
      props.ViewCocktail(props.name)
    }}>
      <h2>{props.name}</h2>
      <img src={props.image_source} alt="cocktail" />
      <p>{props.ingredients}</p>
      <p>{props.rating}</p>
    </button>
  )

}


ListItem.propTypes = {
  ingredients: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  image_source: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  ViewCocktail: PropTypes.func,
  isList: PropTypes.bool,
}

export default ListItem