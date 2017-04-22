const appName = 'carbonstack'
const reducerName = 'app'

export const REQUEST_SIGN_IN = `${appName}/${reducerName}/REQUEST_SIGN_IN`
export const REQUEST_SIGN_OUT = `${appName}/${reducerName}/REQUEST_SIGN_OUT`
export const SUCCESS_SIGN_OUT = `${appName}/${reducerName}/SUCCESS_SIGN_OUT`

function requestSignIn (provider = 'github') {
  return {
    type: REQUEST_SIGN_IN,
    payload: provider
  }
}

function requestSignOut () {
  return {
    type: REQUEST_SIGN_OUT
  }
}

function successSignOut () {
  return {
    type: SUCCESS_SIGN_OUT
  }
}

export default {
  requestSignIn,
  requestSignOut,
  successSignOut
}
