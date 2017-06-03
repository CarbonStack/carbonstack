import React from 'react'
import {
  monospacedFontFamily,
  grayColor
} from '../../../lib/styles/variables'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'
import socket from '../../../lib/socket'

class CommentList extends React.PureComponent {
  componentDidMount () {
    const { issue } = this.props
    socket.emit('join:issue', {
      issueId: issue._id
    })
    socket.on('issueComment:create', this.onIssueCommentCreate)
  }

  componentWillUnmount () {
    const { issue } = this.props
    socket.emit('leave:issue', {
      issueId: issue._id
    })
    socket.off('issueComment:create', this.onIssueCommentCreate)
  }

  onIssueCommentCreate = ({ issueComment }) => {
    const { actions } = this.props

    actions.successCommentCreate(issueComment)
  }

  resetForm () {
    this.form && this.form.reset()
  }

  focusForm () {
    this.form && this.form.focus()
  }

  render () {
    const {
      user,
      form,
      comments,
      actions,
      error
    } = this.props

    return <div>
      <h3>Comments</h3>
      <ul className='list'>
        {Object.values(comments)
          .sort((a, b) => (new Date(a) - new Date(b)))
          .map(comment => (
            <CommentItem
              key={comment._id}
              comment={comment}
            />
          ))
        }
        {comments.length === 0 &&
          <li className='empty'>Not commented yet.</li>
        }
      </ul>
      {user == null
        ? <div className='guest'>
          Please sign in to leave a comment.
          </div>
        : <CommentForm
          ref={form => (this.form = form)}
          form={form}
          actions={actions}
          error={error}
        />
      }
      <style jsx>{`
        h3 {
          font-size: 18px;
        }
        .list {
          padding: 0;
          list-style: none;
          font-family: ${monospacedFontFamily};
        }
        .guest {
          font-family: ${monospacedFontFamily};
          color: ${grayColor};
          text-align: center;
          margin: 35px 0;
        }
      `}</style>
    </div>
  }
}

export default CommentList
