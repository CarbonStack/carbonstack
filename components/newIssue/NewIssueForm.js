import React from 'react'
import {
  monospacedFontFamily,
  errorColor
} from '../../lib/styles/variables'
import MarkdownEditor from '../shared/MarkdownEditor'
<<<<<<< HEAD
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
=======

class NewIssueForm extends React.PureComponent {
  onFormChange = () => {

>>>>>>> 853951d2845c3ee1c06659e1061ef7ec5091a784
  }

  render () {
    const {
<<<<<<< HEAD
      actions,
=======
>>>>>>> 853951d2845c3ee1c06659e1061ef7ec5091a784
      form,
      isSubmitting,
      error
    } = this.props

    return (
      <div>
        <div className='title'>
          <input
            className='title-input'
<<<<<<< HEAD
            ref={title => (this.title = title)}
            type='text'
            value={form.title}
            placeholder={'What\'s up? (title)'}
            onChange={this.onChange}
=======
            ref='title'
            type='text'
            value={form.title}
            placeholder={'What\'s up? (title)'}
            onChange={this.onIssueChange}
>>>>>>> 853951d2845c3ee1c06659e1061ef7ec5091a784
          />
        </div>

        <div className='content'>
          <MarkdownEditor
<<<<<<< HEAD
            ref={content => (this.content = content)}
            value={form.content}
            placeholder='Describe the form! (content)'
            onChange={this.onChange}
=======
            ref='content'
            value={form.content}
            placeholder='Describe the form! (content)'
            onChange={this.onIssueChange}
>>>>>>> 853951d2845c3ee1c06659e1061ef7ec5091a784
          />
        </div>

        <div className='control'>
          <span className='error'>
<<<<<<< HEAD
            {error != null && error.message}
=======
            {error != null && error.data.message}
>>>>>>> 853951d2845c3ee1c06659e1061ef7ec5091a784
          </span>
          <button
            onClick={this.onBackButtonClick}
          >Cancel</button>
          <button
            className='primary'
            disabled={isSubmitting}
<<<<<<< HEAD
            onClick={actions.requestCreateIssue}
          >
            {isSubmitting && <Spinner />} Submit
          </button>
        </div>
      <style jsx>{`
      .title {
        display: flex;
        margin-bottom: 10px;
      }
      .title .title-input {
        font-size: 36px;
        height: 45px;
=======
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
>>>>>>> 853951d2845c3ee1c06659e1061ef7ec5091a784
        font-family: ${monospacedFontFamily};
        flex: 1;
        min-width: 0;
        border-radius: 0;
        border-width: 0 0 1px;
      }
<<<<<<< HEAD
      .content {
=======
      &>.content {
>>>>>>> 853951d2845c3ee1c06659e1061ef7ec5091a784
        .CodeMirror {
          height: 450px;
        }
      }
<<<<<<< HEAD
      .control {
=======
      &>.control {
>>>>>>> 853951d2845c3ee1c06659e1061ef7ec5091a784
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
<<<<<<< HEAD
=======

>>>>>>> 853951d2845c3ee1c06659e1061ef7ec5091a784
  }
}

export default NewIssueForm
