const defaultState = {
  user: null
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SUCCESS_LOGIN':
      return Object.assign({}, state, {
        user: action.payload.user
      })
    default: return state
  }
}
