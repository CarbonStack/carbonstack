import {
  REFRESH,
  SUCCESS_SIGN_OUT
} from './actions'

const defaultState = {
  user: null
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case REFRESH:
      return {
        ...action.payload
      }
    case SUCCESS_SIGN_OUT:
      return {
        ...defaultState
      }
    default: return state
  }
}
