import React from 'react'
import MarkdownEditor from '../shared/MarkdownEditor'
import {
  borderColor,
  grayColor,
  monospacedFontFamily,
  errorColor
} from '../../lib/styles/variables'

const defaultState = {
  content: ''
}

class CommentForm extends React.PureComponent {
  onChange = () => {
    const {
      actions
    } = this.props
    actions.updateCommentForm({
      content: this.content.value
    })
  }

  onCommentButtonClick = () => {
    const { actions, issue } = this.props
    actions.requestCommentCreate({
      issue: issue._id,
      content: this.state.content
    })
  }

  focus () {
    this.comment.focusEditor()
  }

  render () {
    const {
      actions,
      form,
      error
    } = this.props

    return <div className='root'>
      <div className='meta'>
        New Comment&nbsp;
      </div>
      <MarkdownEditor
        ref={comment => { this.comment = comment }}
        value={form.content}
        placeholder={'Let\'s leave some comment!'}
        onChange={this.onFormChange}
      />
      <div className='control'>
        {error &&
          <span className='error'>{error.message}</span>
        }
        <button
          className='primary'
          onClick={actions.requestCommentCreate}
        >
          Comment
        </button>
      </div>
      <style jsx>{`
        .root {
          margin: 15px;
          border: 1px solid ${borderColor};
          border-radius: 4px;
        }
        .meta {
          height: 30px;
          line-height: 30px;
          padding: 0 15px;
          color: ${grayColor};
        }
        .control {
          margin: 0.25em 5px;
          text-align: right;
        }
        .control .error {
          color: ${errorColor};
          margin-right: 5px;
        }
      `}</style>
    </div>
  }
}

export default CommentForm
