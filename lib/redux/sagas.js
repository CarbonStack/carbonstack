import {
  fork
} from 'redux-saga/effects'
import {
  saga as sessionSaga
} from './modules/session'

function * rootSage () {
  yield fork(sessionSaga)
}

export default rootSage
