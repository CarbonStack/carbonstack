import {
  RESET_PAGE,
  REQUEST_CREATE_ISSUE,
  SUCCESS_CREATE_ISSUE,
  FAILURE_CREATE_ISSUE,
  IDLE,
  WORKING,
  DONE,
  ERROR
 } from './actions'

const defaultState = {
  status: IDLE,
  error: null
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case RESET_PAGE:
      return {
        ...defaultState
      }
    case REQUEST_CREATE_ISSUE:
      return {
        ...state,
        status: WORKING
      }
    case SUCCESS_CREATE_ISSUE:
      return {
        ...state,
        status: DONE
      }
    case FAILURE_CREATE_ISSUE:
      return {
        ...state,
        status: ERROR,
        error: action.payload
      }
    default: return state
  }
}
