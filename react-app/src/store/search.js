const SEARCH_RESULTS = "search/SEARCH_RESULTS";

export const searchResults = (results) => ({
  type: SEARCH_RESULTS,
  results,
});

export const search = (query) => async (dispatch) => {
  const response = await fetch(`/api/search/${query}`);

  if (response.ok) {
    const results = await response.json();
    dispatch(searchResults(results));
  }
};



const initialState = { results: [] };

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_RESULTS:
      return { ...state, results: action.results };
    default:
      return state;
  }
};

export default searchReducer;
