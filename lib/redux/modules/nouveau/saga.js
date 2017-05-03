import {
  take,
  call,
  put,
  fork
} from 'redux-saga/effects'
import api from '../../../api'
import actions, {
  REQUEST_CREATE_ISSUE
} from './actions'
import Router from 'next/router'

function * createIssue () {
  while (true) {
    const action = yield take(REQUEST_CREATE_ISSUE)
    try {
      const data = yield call(api.issues.create, action.payload.data)
      yield put(actions.successCreateIssue())

      const rvUniqueName = action.payload.rvUniqueName
      const issueNumber = data.issue.number

      const url = {
        pathname: '/issue',
        query: {
          rvUniqueName,
          issueNumber
        }
      }
      const as = `/rv/${action.payload.rvUniqueName}/${data.issue.number}`

      Router.replace(url, as)
      continue
    } catch (error) {
      yield put(actions.failureCreateIssue(error))
    }
  }
}

export default function * nouveauSaga () {
  yield fork(createIssue)
}
