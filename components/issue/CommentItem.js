import React from 'react'
import moment from 'moment'
import MarkdownPreview from '../shared/MarkdownPreview'
import {
  monospacedFontFamily,
  borderColor,
  grayColor
} from '../../lib/styles/variables'

const CommentItem = ({ comment }) => (
  <li
    className='item'
  >
    <div className='meta'>
      #{comment.number} by&nbsp;
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
    <style jsx>{`
      li.item {
        margin: 15px 15px 0;
        border: solid 1px ${borderColor};
        border-radius: 4px;
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
    `}</style>
  </li>
)

export default CommentItem
