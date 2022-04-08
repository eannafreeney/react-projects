import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from './actions'



export const showLoader = () => ({
  type: SET_LOADING,
  payload: {
    isLoading: true
  }
});

export const hideLoader = () => ({
  type: SET_LOADING,
  payload: {
    isLoading: false
  }
});

const reducer = (state, action) => {
  switch(action.type) {
    case SET_LOADING:
      // const action = { type: 'SET_LOADING', payload: { isLoading: true }}
      return { ...state, isLoading: action.payload.isLoading }

    case SET_STORIES:
      // const action = { type: 'SET_STORIES', payload: { hits: [1,2,3], nbPages: 4  }}

      console.log(state);
      console.log(action);
      return {
        ...state,
        hits: action.payload.hits.filter((hit) => !state.excludedStoryIDs.includes(hit.objectID)),
        nbPages: action.payload.nbPages,
        isLoading: false
      }

    case REMOVE_STORY:
      // const action = { type: 'REMOVE_STORY', payload: 363673 }
      return { ...state,
        excludedStoryIDs: [...state.excludedStoryIDs, action.payload ],
        hits: state.hits.filter((story) => story.objectID !== action.payload)
      }
      // save id of removed stories into an array
      // fetching the page => exclude removed stories

    case HANDLE_SEARCH:
      // const action = { type: 'HANDLE_SEARCH', payload: 'dada' }
      return { ...state, query: action.payload, page: 0 }

    case HANDLE_PAGE:
      // const action = { type: 'HANDLE_PAGE', payload: 'inc' }
      if (action.payload === 'inc'){
        let nextPage = state.page + 1;
        if (nextPage > state.nbPages -1 ) {
       //   nextPage = 0;
          return;
        }
        return { ...state, page: nextPage };
      } else if (action.payload === 'dec'){
        // const action = { type: 'HANDLE_PAGE', payload: 'dec' }
          let prevPage = state.page - 1;
          if (prevPage < 0 ) {
            //prevPage = 0;
            return;
          }
          return { ...state, page: prevPage };
      }

    default:
      throw new Error (`no matching "${action.type}" action type`)
  }
}
export default reducer
