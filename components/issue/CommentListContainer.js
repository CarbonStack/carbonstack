import React from 'react'
import CommentList from './CommentList'
import api from '../../lib/api'
import { bindActionCreators } from 'redux'
import TechReactor from '../shared/TechReactor'
import socket from '../../lib/socket'

const statusPrefix = 'IssueCommentContainer'

// Action types
const REQUEST_COMMENT_CREATE = `${statusPrefix}/REQUEST_COMMENT_CREATE`
const SUCCESS_COMMENT_CREATE = `${statusPrefix}/SUCCESS_COMMENT_CREATE`
const FAILURE_COMMENT_CREATE = `${statusPrefix}/FAILURE_COMMENT_CREATE`

// Status ENUM
const IDLE = `${statusPrefix}/IDLE`
const WORKING = `${statusPrefix}/WORKING`
const ERROR = `${statusPrefix}/ERROR`
const status = {
  IDLE,
  WORKING,
  ERROR
}

// Action creators
const actions = {
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

const myReducer = (state, action) => {
  switch (action.type) {
    case SUCCESS_COMMENT_CREATE:
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.payload._id]: action.payload
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

const mySaga = function * () {
  while (true) {
    const action = yield * this.take(REQUEST_COMMENT_CREATE)
    try {
      const { issueComment } = yield * this.call(api.comments.create, action.payload)
      yield this.put(actions.successCommentCreate(issueComment))
      this.list.resetForm()
    } catch (error) {
      yield this.put(actions.failureCommentCreate(error))
      this.list.focusForm()
    }
  }
}

function mapComments (comments) {
  return comments.reduce((set, comment) => {
    set[comment._id] = comment
    return set
  }, {})
}

class IssueCommentContainer extends TechReactor {
  constructor (props) {
    super(props)

    this.state = {
      comments: mapComments(props.comments),
      status: IDLE
    }
  }

  componentWillReceiveProps (nextProps) {
    const currentIssue = this.props.issue
    const nextIssue = nextProps.issue
    if (currentIssue !== nextIssue) {
      this.setState({
        issue: nextIssue,
        comments: mapComments(nextProps.comments)
      })
    }
  }

  onIssueCommentCreate ({issueComment}) {
    this.actions.successCommentCreate(issueComment)
  }

  componentDidMount () {
    const { issue } = this.props
    socket.emit('join:issue', {
      issueId: issue._id
    })
    socket.on('issueComment:create', ::this.onIssueCommentCreate)
  }

  componentWillUnmount () {
    super.componentWillUnmount()
    const { issue } = this.props
    socket.emit('leave:issue', {
      issueId: issue._id
    })
    socket.off('issueComment:create', ::this.onIssueCommentCreate)
  }

  actions = bindActionCreators(actions, ::this.dispatch)
  reducer = myReducer
  saga = mySaga.call(this)

  render () {
    const {
      user,
      issue
    } = this.props
    const {
      comments,
      error
    } = this.state

    return <CommentList
      ref={list => (this.list = list)}
      user={user}
      issue={issue}
      comments={comments}
      actions={this.actions}
      status={status}
      error={error}
    />
  }
}

export default IssueCommentContainer
