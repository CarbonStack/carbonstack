import React from 'react'
import {
  monospacedFontFamily,
  errorColor
} from '../../lib/styles/variables'
import MarkdownEditor from '../shared/MarkdownEditor'

class NewIssueForm extends React.PureComponent {
  onFormChange = () => {

  }

  render () {
    const {
      form,
      isSubmitting,
      error
    } = this.props

    return (
      <div>
        <div className='title'>
          <input
            className='title-input'
            ref='title'
            type='text'
            value={form.title}
            placeholder={'What\'s up? (title)'}
            onChange={this.onIssueChange}
          />
        </div>

        <div className='content'>
          <MarkdownEditor
            ref='content'
            value={form.content}
            placeholder='Describe the form! (content)'
            onChange={this.onIssueChange}
          />
        </div>

        <div className='control'>
          <span className='error'>
            {error != null && error.data.message}
          </span>
          <button
            onClick={this.onBackButtonClick}
          >Cancel</button>
          <button
            className='primary'
            disabled={isSubmitting}
            onClick={this.onSubmitButtonClick}
          >
            {isSubmitting
              ? 'Submitting...'
              : 'Submit'
            }
          </button>
        </div>
      <style jsx>{`

      width: 80%;
      margin: 0 auto;
      padding: 0 15px;
      &>.title {
        display: flex;
      }
      &>.title .title-input {
        font-size: 2em;
        font-family: ${monospacedFontFamily};
        flex: 1;
        min-width: 0;
        border-radius: 0;
        border-width: 0 0 1px;
      }
      &>.content {
        .CodeMirror {
          height: 450px;
        }
      }
      &>.control {
        margin: 0.25em 0;
        text-align: right;
        .error {
          color: ${errorColor};
        }
        button {
          margin-left: 5px;
          padding: 0 15px;
          font-family: ${monospacedFontFamily};
          height: 35px;
        }
      }
            `}</style>
      </div>
    )

  }
}

export default NewIssueForm
