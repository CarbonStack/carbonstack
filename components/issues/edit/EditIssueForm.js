import React from 'react'
import {
  sansSerifFontFamily,
  errorColor
} from '../../../lib/styles/variables'
import MarkdownEditor from '../../shared/MarkdownEditor'
import Spinner from '../../shared/Spinner'
import DiffEditor from '../../shared/DiffEditor'

class EditIssueForm extends React.PureComponent {
  onChange = () => {
    const {
      actions
    } = this.props

    actions.updateForm({
      title: this.title.value,
      content: this.content.value
    })
  }

  onDiffViewChange = () => {
    const {
      actions
    } = this.props

    actions.updateForm({
      title: this.title.value,
      content: this.diffView.value
    })
  }

  onBackButtonClick = () => {
    window.history.back()
  }

  render () {
    const {
      actions,
      issue,
      form,
      isSubmitting,
      error,
      isDiffEditorOpen
    } = this.props

    return (
      <div className='root'>
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
          <button
            className={isDiffEditorOpen
              ? 'primary'
              : ''
            }
            onClick={actions.toggleDiffEditor}
          >
            Diff
          </button>
          <p className='error'>
            {error != null && error.message}
          </p>
          <button
            onClick={this.onBackButtonClick}
          >Cancel</button>
          {/*
          FIXME: Uncomment after PR implemented
          <button
            className='primary'
            disabled={isSubmitting}
            onClick={actions.requestCreateIssue}
          >
            {isSubmitting && <Spinner />} Submit as a PR
          </button> */}
          <button
            className='primary'
            disabled={isSubmitting}
            onClick={actions.requestUpdateIssue}
          >
            {isSubmitting && <Spinner />} Update Now
          </button>
        </div>

        {isDiffEditorOpen &&
          <div className='diff'>
            <DiffEditor
              ref={diffView => (this.diffView = diffView)}
              originalValue={issue.latestCommit.content}
              value={form.content}
              onChange={this.onDiffViewChange}
            />
          </div>
        }

        <style jsx>{`
          .root {
            margin-top: 25px;
          }
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
          .control {
            display: flex;
            margin: 0.25em 0;
          }
          .control .error {
            flex: 1;
            text-align: right;
            color: ${errorColor};
          }
          .diff {
            margin-top: 15px;
          }
        `}</style>
      </div>
    )
  }
}

export default EditIssueForm
