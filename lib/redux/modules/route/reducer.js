import { CHANGE_ROUTE } from './actions'

const defaultState = {
  pathname: '/',
  query: null,
  as: null
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_ROUTE:
      return {
        ...state,
        ...action.payload
      }
    default: return state
  }
}
