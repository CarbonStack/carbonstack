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

export default function * rootSaga () {
}
