import React from 'react'
import {
  sansSerifFontFamily,
  errorColor
} from '../../lib/styles/variables'
import MarkdownEditor from '../shared/MarkdownEditor'
import Spinner from '../shared/Spinner'

class NewIssueForm extends React.PureComponent {
  componentDidMount () {
    const {
      actions,
      group
    } = this.props

    actions.initGruop(group)
  }

  onChange = () => {
    const {
      actions
    } = this.props

    actions.updateForm({
      title: this.title.value,
      content: this.content.value
    })
  }

  onBackButtonClick = () => {
    window.history.back()
  }

  render () {
    const {
      actions,
      form,
      isSubmitting,
      error
    } = this.props

    return (
      <div>
        <div className='title'>
          <input
            className='title-input'
            ref={title => (this.title = title)}
            type='text'
            value={form.title}
            placeholder={'What\'s up? (title)'}
            onChange={this.onChange}
          />
        </div>

        <div className='content'>
          <MarkdownEditor
            ref={content => (this.content = content)}
            value={form.content}
            placeholder='Describe your issue! (Markdown supported)'
            onChange={this.onChange}
          />
        </div>

        <div className='control'>
          <span className='error'>
            {error != null && error.message}
          </span>
          <button
            onClick={this.onBackButtonClick}
          >Cancel</button>
          <button
            className='primary'
            disabled={isSubmitting}
            onClick={actions.requestCreateIssue}
          >
            {isSubmitting && <Spinner />} Submit
          </button>
        </div>

        <style jsx>{`
          .title {
            display: flex;
            margin-bottom: 15px;
          }
          .title .title-input {
            font-size: 36px;
            height: 45px;
            font-family: ${sansSerifFontFamily};
            flex: 1;
            min-width: 0;
            border-radius: 0;
            border-width: 0 0 1px;
          }
          .content {
            .CodeMirror {
              height: 450px;
            }
          }
          .control {
            margin: 0.25em 0;
            text-align: right;
          }
          .control .error {
            color: ${errorColor};
          }
        `}</style>
      </div>
    )
  }
}

export default NewIssueForm
