import NewIssueForm from './NewIssueForm'
import reduxlet from 'reduxlet-saga'
import { take, put, call, select, fork } from 'redux-saga/effects'
import api from '../../lib/api'
import Router from 'next/router'

<<<<<<< HEAD
const INIT_GROUP = 'INIT_GROUP'
=======
>>>>>>> 853951d2845c3ee1c06659e1061ef7ec5091a784

const UPDATE_FORM = 'UPDATE_FORM'

const REQUEST_CREATE_ISSUE = 'REQUEST_CREATE_ISSUE'
const FAILURE_CREATE_ISSUE = 'FAILURE_CREATE_ISSUE'

const actions = {
<<<<<<< HEAD
  initGruop: group => ({
    type: INIT_GROUP,
    payload: group
  }),
=======
>>>>>>> 853951d2845c3ee1c06659e1061ef7ec5091a784
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
<<<<<<< HEAD
  group: null,
=======
>>>>>>> 853951d2845c3ee1c06659e1061ef7ec5091a784
  form: {
    title: '',
    content: ''
  },
  isSubmitting: false,
  error: null
}

const reducer = (state, action) => {
  switch (action.type) {
<<<<<<< HEAD
    case INIT_GROUP:
      return {
        ...state,
        group: action.payload
      }
=======
>>>>>>> 853951d2845c3ee1c06659e1061ef7ec5091a784
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

<<<<<<< HEAD
const createIssueSaga = function * () {
  while (true) {
    yield take(REQUEST_CREATE_ISSUE)
    try {
      const {
        form,
        group
      } = yield select(state => state)

      const params = {
        ...form,
        group: group._id
      }
      const { issue } = yield call(api.issues.create, params)
=======
const createGroupSaga = function * () {
  while (true) {
    yield take(REQUEST_CREATE_ISSUE)
    try {
      const body = yield select(state => state.form)
      const { issue } = yield call(api.issues.create, body)
>>>>>>> 853951d2845c3ee1c06659e1061ef7ec5091a784
      Router.replace({
        pathname: '/issue',
        query: {
          groupUniqueName: group.uniqueName,
<<<<<<< HEAD
          issueNumber: issue.number
        }
      }, `/g/${group.uniqueName}/${issue.number}`)
    } catch (error) {
      yield put(actions.failureCreateIssue(error))
=======
          
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
>>>>>>> 853951d2845c3ee1c06659e1061ef7ec5091a784
    }
  }
}

const saga = function * () {
<<<<<<< HEAD
  yield fork(createIssueSaga)
=======
  yield fork(createGroupSaga)
  yield fork(uploadSaga)
>>>>>>> 853951d2845c3ee1c06659e1061ef7ec5091a784
}

const NewIssueFormContainer = reduxlet({
  actions,
  defaultState,
  reducer,
  saga
})(NewIssueForm)

export default NewIssueFormContainer
