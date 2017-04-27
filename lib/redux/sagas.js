import {
  fork
} from 'redux-saga/effects'
import {
  saga as sessionSaga
} from './modules/session'
import {
  saga as nouveauSaga
} from './modules/nouveau'

function * rootSage () {
  yield fork(sessionSaga)
  yield fork(nouveauSaga)
}

export default rootSage
