const appName = 'carbonstack'
const moduleName = 'session'

export const REQUEST_SIGN_IN = `${appName}/${moduleName}/REQUEST_SIGN_IN`
export const REQUEST_SIGN_OUT = `${appName}/${moduleName}/REQUEST_SIGN_OUT`
export const SUCCESS_SIGN_OUT = `${appName}/${moduleName}/SUCCESS_SIGN_OUT`

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
