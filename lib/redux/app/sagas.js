import {
  take,
  call,
  put,
  fork
} from 'redux-saga/effects'
import { delay } from 'redux-saga'
import api from '../../api'
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
  console.log('session destroying')
  while (true) {
    yield take(REQUEST_SIGN_OUT)
    try {
      yield call(api.session.destroy)
      console.log('session destroyed')
      yield put(actions.successSignOut())
      break
    } catch (err) {
      console.log(err)
      yield delay(5000)
    }
  }
}

export default function * rootSaga () {
  yield fork(signIn)
  yield fork(signOut)
}
