import {
  REQUEST_CREATE_ISSUE,
  SUCCESS_CREATE_ISSUE,
  FAILURE_CREATE_ISSUE,
  IDLE,
  WORKING,
  DONE,
  ERROR
 } from './actions'

const defaultState = {
  status: IDLE
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case REQUEST_CREATE_ISSUE:
      return Object.assign(state, {
        status: WORKING
      })
    case SUCCESS_CREATE_ISSUE:
      return Object.assign(state, {
        status: DONE
      })
    case FAILURE_CREATE_ISSUE:
      return Object.assign(state, {
        status: ERROR
      })
    default: return state
  }
}
