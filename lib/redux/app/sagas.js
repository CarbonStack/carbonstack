import {
  take,
  call,
  put,
  fork
} from 'redux-saga/effects'
import { me } from '../../api'

const REQUEST_LOGIN = 'REQUEST_LOGIN'
const FAILURE_LOGIN = 'FAILURE_LOGIN'
const SUCCESS_LOGIN = 'SUCCESS_LOGIN'
const REQUEST_LOGOUT = 'REQUEST_LOGOUT'
const SUCCESS_LOGOUT = 'SUCCESS_LOGOUT'

function * authSaga () {
  while (true) {
    yield take(REQUEST_LOGIN)

    const { user, error } = yield call(me)
    if (user == null || error) {
      yield put({
        type: FAILURE_LOGIN,
        payload: error
      })
      continue
    }

    yield put({
      type: SUCCESS_LOGIN,
      payload: {
        user
      }
    })

    yield take(REQUEST_LOGOUT)

    yield call(SUCCESS_LOGOUT)
  }
}

function * appSaga () {
  while (true) {
    yield take(SUCCESS_LOGIN)

    console.log('logged in')
  }
}

export default function * rootSaga () {
  yield fork(authSaga)
  yield fork(appSaga)
}
