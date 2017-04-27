import {
  take,
  call,
  put,
  fork
} from 'redux-saga/effects'
import { delay } from 'redux-saga'
import api from '../../../api'
import actions, {
  REQUEST_CREATE_ISSUE
} from './actions'
import Router from 'next/router'

function * createIssue () {
  while (true) {
    const action = yield take(REQUEST_CREATE_ISSUE)
    try {
      const data = yield call(api.issues.create, action.payload)
      yield put(actions.successCreateIssue())
      console.log(data, 'Done')
      continue
    } catch (err) {
      yield put(actions.failureCreateIssue())
    }
  }
}

export default function * nouveauSaga () {
  yield fork(createIssue)
}
