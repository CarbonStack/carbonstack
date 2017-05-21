import {
  REFRESH,
  REQUEST_SIGN_IN,
  SUCCESS_SIGN_OUT
} from './actions'

const defaultState = {
  user: null,
  isSigningIn: false
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case REFRESH:
      return {
        ...state,
        user: action.payload.user
      }
    case REQUEST_SIGN_IN:
      return {
        ...state,
        isSigningIn: true
      }
    case SUCCESS_SIGN_OUT:
      return {
        ...defaultState
      }
  }
  return state
}
