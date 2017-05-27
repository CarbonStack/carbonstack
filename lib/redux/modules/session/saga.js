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
import NProgress from 'nprogress'

function * signIn () {
  const action = yield take(REQUEST_SIGN_IN)
  switch (action.payload) {
    default:
      NProgress.start()
      const query = Router.router.pathname === '/login'
        ? window.location.search
        : `?redirectTo=${window.location.href}`
      window.location.href = '/auth/github' + query
  }
}

function * signOut () {
  while (true) {
    yield take(REQUEST_SIGN_OUT)
    // Don't wait for destroying
    api.session.destroy()
    window.localStorage.removeItem('session')
    yield put(actions.successSignOut())
    Router.push({
      pathname: '/'
    })
  }
}

export default function * sessionSaga () {
  yield fork(signIn)
  yield fork(signOut)
}
