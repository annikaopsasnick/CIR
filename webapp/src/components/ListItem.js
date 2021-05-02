import PropTypes from 'prop-types';


const ListItem = (props) => {
  return (
    <li>
      <button onClick={() => {
        props.ViewCocktail(props.name) // open specific cocktail details
      }}>
        <div className = "ListItem">
          <div className="Cocktail_title">
          <h2>{props.name}</h2>
          </div>
        
            <div className="row">
              <div className="text-box" id="cocktail-image">
                <img src={props.image_source} alt="cocktail" />
              </div>
              
              <div className="text-box" id="ingredients">
                <p>{props.ingredients}</p>
              </div>

            </div>
    
          <div className = "rating">
            <h3>Social rating:  </h3>
            <h3>{props.rating}</h3>
          </div>

        </div>
      </button>
    </li>

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