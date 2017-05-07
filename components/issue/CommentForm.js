import React from 'react'
import styled from 'styled-components'
import MarkdownEditor from '../shared/MarkdownEditor'
import {
  borderColor,
  grayColor,
  monospacedFontFamily,
  errorColor
} from '../../lib/styles/variables'
import media from '../../lib/styles/media'

const defaultState = {
  content: ''
}

const Root = styled.div`
  margin: 15px;
  border: 1px solid ${borderColor};
  border-radius: 4px;
  ${media.small`
    margin: 15px 0;
  `}
  &>.meta {
    font-family: ${monospacedFontFamily};
    height: 30px;
    line-height: 30px;
    padding: 0 15px;
    color: ${grayColor};
  }
  &>.control {
    margin: 0.25em 5px;
    text-align: right;
    &>.error {
      color: ${errorColor};
      font-family: ${monospacedFontFamily};
      margin-right: 5px;
    }
  }
  .CodeMirror {
    height: 250px;
  }

`

class CommentForm extends React.PureComponent {
  constructor () {
    super()
    this.state = defaultState
  }

  onFormChange () {
    this.setState({
      content: this.comment.value
    })
  }

  onCommentButtonClick () {
    const { actions, issue } = this.props
    actions.requestCommentCreate({
      issue: issue._id,
      content: this.state.content
    })
  }

  reset () {
    this.setState(defaultState)
  }

  focus () {
    this.comment.focusEditor()
  }

  render () {
    const { error } = this.props

    return <Root>
      <div className='meta'>
        New Comment&nbsp;
      </div>
      <MarkdownEditor
        ref={comment => { this.comment = comment }}
        value={this.state.content}
        placeholder={'Let\'s leave some comment!'}
        onChange={::this.onFormChange}
      />
      <div className='control'>
        {error &&
          <span className='error'>{error.message}</span>
        }
        <button
          className='primary'
          onClick={::this.onCommentButtonClick}
        >
          Comment
        </button>
      </div>
    </Root>
  }
}

export default CommentForm
