import React from 'react'
import styled from 'styled-components'
import MarkdownPreview from '../shared/MarkdownPreview'
import moment from 'moment'
import {
  monospacedFontFamily,
  borderColor,
  grayColor
} from '../../lib/styles/variables'
import media from '../../lib/styles/media'
import CommentForm from './CommentForm'

const Root = styled.div`
  &>ul.list {
    list-style: none;
    font-family: ${monospacedFontFamily};
    &>li.item {
      margin: 15px 15px 0;
      border: solid 1px ${borderColor};
      border-radius: 4px;
      ${media.small`
        margin: 15px 0 0;
      `}
      &>.meta {
        height: 30px;
        line-height: 30px;
        padding: 0 15px;
        color: ${grayColor};
        border-bottom: solid 1px ${borderColor};
        .photo {
          width: 20px;
          height: 20px;
          border-radius: 10px;
          vertical-align: middle;
        }
      }
      &>.content {
        margin: 0 15px;
        ul {
          list-style: initial;
        }
      }
    }
    &>li.empty {
        color: ${grayColor};
        font-family: ${monospacedFontFamily};
        border: none;
        margin: 25px 15px 35px;
        text-align: center;
        line-height: 250%;
    }
  }
  .guest {
    font-family: ${monospacedFontFamily};
    color: ${grayColor};
    text-align: center;
    margin: 35px 0;
  }
`

const CommentItem = comment => (
  <li
    className='item'
    key={comment._id}
  >
    <div className='meta'>
      by&nbsp;
      <img
        className='photo'
        src={comment.writer.photos[0].value}
      />&nbsp;
      {comment.writer.githubName} {moment(comment.createdAt).fromNow()}
    </div>
    <MarkdownPreview
      className='content'
      value={comment.content}
    />
  </li>
)

class CommentList extends React.PureComponent {
  resetForm () {
    this.form && this.form.reset()
  }

  focusForm () {
    this.form && this.form.focus()
  }

  render () {
    const {
      user,
      issue,
      comments,
      actions,
      error
    } = this.props

    return <Root>
      <ul className='list'>
        {Object.values(comments).sort((a, b) => (new Date(a) - new Date(b))).map(comment => CommentItem(comment))}
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
          issue={issue}
          actions={actions}
          error={error}
        />
      }
    </Root>
  }
}

export default CommentList
