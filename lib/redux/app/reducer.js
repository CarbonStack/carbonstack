import { SUCCESS_SIGN_OUT } from './actions'

const defaultState = {
  user: null
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case SUCCESS_SIGN_OUT:
      return {
        ...state,
        user: null
      }
    default: return state
  }
}
