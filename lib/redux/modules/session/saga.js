import {
  take,
  put,
  fork
} from 'redux-saga/effects'
import api from '../../../api'
import actions, {
  REQUEST_SIGN_IN,
  REQUEST_SIGN_OUT
} from './actions'
import Router from 'next/router'

function * signIn () {
  const action = yield take(REQUEST_SIGN_IN)
  switch (action.payload) {
    default:
      const query = Router.router.pathname === '/login'
        ? window.location.search
        : `?redirectTo=${window.location.href}`
      window.location.href = '/auth/github' + query
  }
}

function * signOut () {
  while (true) {
    yield take(REQUEST_SIGN_OUT)
    api.session.destroy()
    window.localStorage.setItem('session', JSON.stringify(null))
    yield put(actions.successSignOut())
    Router.push({
      pathname: '/goodbye'
    })
  }
}

export default function * sessionSaga () {
  yield fork(signIn)
  yield fork(signOut)
}
