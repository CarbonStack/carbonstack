import {
  take,
  call,
  put,
  fork
} from 'redux-saga/effects'
import { delay } from 'redux-saga'
import api from '../../../api'
import actions, {
  REQUEST_SIGN_IN,
  REQUEST_SIGN_OUT
} from './actions'

function * signIn () {
  const action = yield take(REQUEST_SIGN_IN)
  switch (action.payload) {
    default:
      window.location.href = '/auth/github'
  }
}

function * signOut () {
  while (true) {
    yield take(REQUEST_SIGN_OUT)
    try {
      yield call(api.session.destroy)
      yield put(actions.successSignOut())
      break
    } catch (err) {
      // Retry 5 secs later
      yield delay(5000)
    }
  }
}

export default function * sessionSaga () {
  yield fork(signIn)
  yield fork(signOut)
}
