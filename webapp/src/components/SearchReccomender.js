
/**
 * Component for recomendations when the query is invalid
 * @param {*} suggestions object of the form {query_token: suggested_word,} 
 * @returns a list of suggestions to improve the search string
 */
const SearchReccomender = ({ suggestions }) => {


  var suggestion_list = new Array();

  Object.entries(suggestions).map(([query, suggested_word]) => {
    console.log('inside map', query, suggested_word);
    const msg = `replace ${query} with ${suggested_word}`;
    suggestion_list.push(<li key={query}>{msg}</li>)
  });

  console.log('suggestion_list', suggestion_list);



  const suggestion_contents = (suggestion_list.length != 0) ?
    <div className="Suggestions">
      <p>consider making these changes in your search :)</p>
      <ul className="suggestion-list">
        {suggestion_list}
      </ul>  </div>
    : <div className="NoSuggestions"></div>


  return (
    <div className="SearchReccomender">
      {suggestion_contents}
    </div>
  );
}

export default SearchReccomender
