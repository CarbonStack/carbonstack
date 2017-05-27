import NewIssueForm from './NewIssueForm'
import reduxlet from 'reduxlet-saga'
import { take, put, call, select, fork } from 'redux-saga/effects'
import api from '../../lib/api'
import Router from 'next/router'


const UPDATE_FORM = 'UPDATE_FORM'

const REQUEST_CREATE_ISSUE = 'REQUEST_CREATE_ISSUE'
const FAILURE_CREATE_ISSUE = 'FAILURE_CREATE_ISSUE'

const actions = {
  updateForm: form => ({
    type: UPDATE_FORM,
    payload: form
  }),
  requestCreateIssue: () => ({
    type: REQUEST_CREATE_ISSUE
  }),
  failureCreateIssue: error => ({
    type: FAILURE_CREATE_ISSUE,
    payload: error
  })
}

const defaultState = {
  form: {
    title: '',
    content: ''
  },
  isSubmitting: false,
  error: null
}

const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_FORM:
      return {
        ...state,
        form: {
          ...state.form,
          ...action.payload
        }
      }
    case REQUEST_CREATE_ISSUE:
      return {
        ...state,
        isSubmitting: true
      }
    case FAILURE_CREATE_ISSUE:
      return {
        ...state,
        error: action.payload,
        isSubmitting: false
      }
  }
  return state
}

const createGroupSaga = function * () {
  while (true) {
    yield take(REQUEST_CREATE_ISSUE)
    try {
      const body = yield select(state => state.form)
      const { issue } = yield call(api.issues.create, body)
      Router.replace({
        pathname: '/issue',
        query: {
          groupUniqueName: group.uniqueName,
          
        }
      }, `/g/${group.uniqueName}`)
    } catch (error) {
      yield put(actions.failureCreateGroup(error))
    }
  }
}

const uploadSaga = function * () {
  while (true) {
    const action = yield take(REQUEST_UPLOAD_FILE)
    try {
      const { tempPath } = yield call(api.files.uploadProfileImage, action.payload)
      yield put(actions.successUploadFile(tempPath))
    } catch (error) {
      yield put(actions.failureUploadFile(error))
    }
  }
}

const saga = function * () {
  yield fork(createGroupSaga)
  yield fork(uploadSaga)
}

const NewIssueFormContainer = reduxlet({
  actions,
  defaultState,
  reducer,
  saga
})(NewIssueForm)

export default NewIssueFormContainer
