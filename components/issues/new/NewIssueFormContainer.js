import NewIssueForm from './NewIssueForm'
import reduxlet from 'reduxlet-saga'
import { take, put, call, select, fork } from 'redux-saga/effects'
import api from '../../../lib/api'
import Router from 'next/router'

const INIT_GROUP = 'INIT_GROUP'

const UPDATE_FORM = 'UPDATE_FORM'

const REQUEST_CREATE_ISSUE = 'REQUEST_CREATE_ISSUE'
const FAILURE_CREATE_ISSUE = 'FAILURE_CREATE_ISSUE'

const actions = {
  initGruop: group => ({
    type: INIT_GROUP,
    payload: group
  }),
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
  // Now we can resolve group by giving defaultState as a function
  group: null,
  form: {
    title: '',
    content: ''
  },
  isSubmitting: false,
  error: null
}

const reducer = (state, action) => {
  switch (action.type) {
    case INIT_GROUP:
      return {
        ...state,
        group: action.payload
      }
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
      Router.replace({
        pathname: '/issues/show',
        query: {
          groupUniqueName: group.uniqueName,
          issueNumber: issue.number
        }
      }, `/g/${group.uniqueName}/${issue.number}`)
    } catch (error) {
      yield put(actions.failureCreateIssue(error))
    }
  }
}

const saga = function * () {
  yield fork(createIssueSaga)
}

const NewIssueFormContainer = reduxlet({
  actions,
  defaultState,
  reducer,
  saga
})(NewIssueForm)

export default NewIssueFormContainer
