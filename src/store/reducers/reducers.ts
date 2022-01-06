const initialState = { saveMovie: [] }

function saveMovies(state = initialState, action: any) {
  let nextState
  switch (action.type) {
    case 'SAVE_MOVIE':
      nextState = {
        ...state,
        saveMovie: [...state.saveMovie, action.value]
      };
      return nextState || state
    case 'UNSAVE_MOVIE':
      nextState = {
        ...state,
        saveMovie: state.saveMovie.filter(id => id !== action.value)
      };
      return nextState || state
    default:
      return state
  };
}

export default saveMovies;