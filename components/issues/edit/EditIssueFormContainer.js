import EditIssueForm from './EditIssueForm'
import reduxlet from 'reduxlet-saga'
import { take, put, call, select, fork } from 'redux-saga/effects'
import api from '../../../lib/api'
import Router from 'next/router'
import { connect } from 'react-redux'

const UPDATE_FORM = 'UPDATE_FORM'
const REQUEST_UPDATE_ISSUE = 'REQUEST_UPDATE_ISSUE'
const FAILURE_UPDATE_ISSUE = 'FAILURE_UPDATE_ISSUE'
const TOGGLE_DIFF_EDITOR = 'TOGGLE_DIFF_EDITOR'

const actions = {
  updateForm: form => ({
    type: UPDATE_FORM,
    payload: form
  }),
  requestUpdateIssue: () => ({
    type: REQUEST_UPDATE_ISSUE
  }),
  failureUpdateIssue: error => ({
    type: FAILURE_UPDATE_ISSUE,
    payload: error
  }),
  toggleDiffEditor: () => ({
    type: TOGGLE_DIFF_EDITOR
  })
}

const defaultState = ownProps => ({
  issue: ownProps.issue,
  group: ownProps.group,
  form: {
    title: ownProps.issue.title,
    content: ownProps.issue.latestCommit.content
  },
  isSubmitting: false,
  error: null,
  isDiffEditorOpen: false
})

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
    case REQUEST_UPDATE_ISSUE:
      return {
        ...state,
        isSubmitting: true
      }
    case FAILURE_UPDATE_ISSUE:
      return {
        ...state,
        error: action.payload,
        isSubmitting: false
      }
    case TOGGLE_DIFF_EDITOR:
      return {
        ...state,
        isDiffEditorOpen: !state.isDiffEditorOpen
      }
  }
  return state
}

const updateIssueSaga = function * () {
  while (true) {
    yield take(REQUEST_UPDATE_ISSUE)
    try {
      const {
        form,
        group,
        issue
      } = yield select(state => state)

      yield call(api.issues.update, issue._id, form)
      Router.replace({
        pathname: '/issues/show',
        query: {
          groupUniqueName: group.uniqueName,
          issueNumber: issue.number
        }
      }, `/g/${group.uniqueName}/${issue.number}`)
    } catch (error) {
      yield put(actions.failureUpdateIssue(error))
    }
  }
}

const saga = function * () {
  yield fork(updateIssueSaga)
}

const EditIssueFormContainer = reduxlet({
  actions,
  defaultState,
  reducer,
  saga
})(EditIssueForm)

const mapGlobalStateToProps = state => ({
  session: state.session
})

export default connect(mapGlobalStateToProps)(EditIssueFormContainer)
