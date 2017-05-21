import React from 'react'
import {
  mediumBreakpoint
} from '../../lib/styles/media'
import {
  placeholderColor,
  errorColor
} from '../../lib/styles/variables'
import {
  languageMap
} from '../shared/LanguageEmoji'
import Spinner from '../shared/Spinner'

class NewGroupForm extends React.PureComponent {
  constructor () {
    super()
    this.state = {
      file: ''
    }
  }

  componentDidMount () {
    this.name.focus()
  }

  onChange = () => {
    const { actions } = this.props

    actions.updateForm({
      name: this.name.value,
      uniqueName: this.uniqueName.value,
      description: this.description.value,
      language: this.language.value
    })
  }

  onFileChange = () => {
    const {
      actions
    } = this.props

    const file = this.profileImage.files.item(0)
    if (file != null) {
      actions.requestUploadFile(this.profileImage.files.item(0))
    }
  }

  onUploadButtonClick = () => {
    this.profileImage.click()
  }

  render () {
    const {
      actions,
      form,
      uploadError,
      isUploading,
      isSubmitting,
      error
    } = this.props

    return (
      <div className='root'>

        <h1>Create a new group</h1>

        <section>
          <label htmlFor='name'>Name</label>
          <input
            id='name'
            ref={name => (this.name = name)}
            type='text'
            placeholder='My Group'
            value={form.name}
            onChange={this.onChange}
          />
        </section>

        <section>
          <label htmlFor='uniqueName'>Unique name</label>
          <input
            id='uniqueName'
            type='text'
            ref={uniqueName => (this.uniqueName = uniqueName)}
            placeholder='my-group'
            value={form.uniqueName}
            onChange={this.onChange}
          />
          <p className='hint'>
            Unique name will be used for URI, `/g/{form.uniqueName.trim().length > 0 ? form.uniqueName : 'my-group'}`
          </p>
        </section>

        <section>
          <label htmlFor='profileImage'>Profile image</label>
          {form.profileImage.length > 0 &&
            <img
              className='profileImage'
              src={'/files/v/temp/' + form.profileImage}
            />
          }
          <button
            className='primary'
            onClick={this.onUploadButtonClick}
            disabled={isUploading}
          >
            {isUploading && <Spinner />} Click to upload
          </button>
          <input
            type='file'
            accept='image/*'
            ref={profileImage => (this.profileImage = profileImage)}
            onChange={this.onFileChange}
          />
          {uploadError &&
            <p className='message'>
              <span className='error'>{uploadError.message}</span>
            </p>
          }
        </section>

        <section>
          <label htmlFor='language'>Language</label>

          <select
            id='language'
            ref={language => (this.language = language)}
            onChange={this.onChange}
            value={form.language}
          >
            {Object.entries(languageMap).map(([key, language]) => (
              <option
                key={key}
                value={key}
              >
                {language.icon} {language.label}
              </option>
            ))}
          </select>
        </section>

        <section>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            ref={description => (this.description = description)}
            value={form.description}
            onChange={this.onChange}
          />
        </section>

        <div className='control'>

          <div className='left'>
            <p className='message'>
              <span className='error'>{error != null && error.message}</span>
            </p>
          </div>

          <div className='right'>
            <button
              className='primary'
              onClick={actions.requestCreateGroup}
              disabled={isSubmitting}
            >
              {isSubmitting && <Spinner />} Submit
            </button>
          </div>

        </div>

        <style jsx>{`
          .root {
            width: 100%;
            max-width: ${mediumBreakpoint}em;
            margin: 0 auto;
          }
          label {
            display: block;
            width: 100%;
          }
          input, textarea {
            display: block;
            width: 100%;
          }
          textarea {
            min-height: 15em;
          }
          section {
            margin: 0 auto 15px;
          }
          section .message {
            height: 40px;
            line-height: 40px;
            margin: 0;
          }
          section .message .error {
            color: ${errorColor};
          }
          .profileImage {
            max-width: 160px;
            max-height: 160px;
            display: block;
          }
          input[type=file] {
            display: none;
          }
          .hint {
            color: ${placeholderColor};
            margin: 5px;
          }
          .control {
            display: flex;
            margin-top: -15px;
            height: 40px;
          }
          .control .left {
            flex: 1;
          }
          .control .left .message {
            height: 40px;
            line-height: 40px;
            margin: 0;
          }
          .control .left .message .error {
            color: ${errorColor};
          }
          .control .right button {
            height: 40px;
            line-height: 40px;
            padding: 0 10px;
          }
        `}</style>
      </div>
    )
  }
}

export default NewGroupForm
