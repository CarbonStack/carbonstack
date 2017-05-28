import api from '../../lib/api'
import reduxlet from 'reduxlet-saga'
import CommentList from './CommentList'
import { take, call, put, select } from 'redux-saga/effects'

const actionPrefix = 'IssueCommentContainer'

const INIT_COMMENTS = `${actionPrefix}/INIT_COMMENTS`
const UPDATE_COMMENT_FORM = `${actionPrefix}/UPDATE_COMMENT_FORM`
const REQUEST_COMMENT_CREATE = `${actionPrefix}/REQUEST_COMMENT_CREATE`
const SUCCESS_COMMENT_CREATE = `${actionPrefix}/SUCCESS_COMMENT_CREATE`
const FAILURE_COMMENT_CREATE = `${actionPrefix}/FAILURE_COMMENT_CREATE`

function mapComments (comments) {
  return comments.reduce((set, comment) => {
    set[comment._id] = comment
    return set
  }, {})
}

const defaultState = ownProps => ({
  comments: mapComments(ownProps.initialComments),
  issue: ownProps.issue,
  form: {
    content: ''
  },
  error: null
})

const actions = {
  initComments: comments => ({
    type: INIT_COMMENTS,
    payload: comments
  }),
  updateCommentForm: form => ({
    type: UPDATE_COMMENT_FORM,
    payload: form
  }),
  requestCommentCreate: data => ({
    type: REQUEST_COMMENT_CREATE,
    payload: data
  }),
  successCommentCreate: data => ({
    type: SUCCESS_COMMENT_CREATE,
    payload: data
  }),
  failureCommentCreate: error => ({
    type: FAILURE_COMMENT_CREATE,
    payload: error
  })
}

const reducer = (state, action) => {
  switch (action.type) {
    case SUCCESS_COMMENT_CREATE:
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.payload._id]: action.payload
        },
        form: {
          content: ''
        },
        error: null
      }
    case FAILURE_COMMENT_CREATE:
      return {
        ...state,
        error: action.payload
      }
  }
  return state
}

const saga = function * () {
  while (true) {
    yield take(REQUEST_COMMENT_CREATE)
    try {
      const { form, issue } = yield select(state => state)
      console.log(form, issue)
      const params = {
        ...form,
        issue: issue._id
      }
      const { issueComment } = yield call(api.comments.create, params)
      yield put(actions.successCommentCreate(issueComment))
    } catch (error) {
      yield put(actions.failureCommentCreate(error))
      this.list.focusForm()
    }
  }
}

const CommentListContainer = reduxlet({
  defaultState,
  actions,
  reducer,
  saga
})(CommentList)

export default CommentListContainer
