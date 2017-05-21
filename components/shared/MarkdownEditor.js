import React from 'react'
import styled from 'styled-components'
import CodeEditor from './CodeEditor'
import MarkdownPreview from './MarkdownPreview'
import {
  borderColor,
  monospacedFontFamily,
  placeholderColor
} from '../../lib/styles/variables'

const EDITOR = 'MarkdownEditor/EDITOR'
const PREVIEW = 'MarkdownEditor/PREVIEW'
const SPLIT = 'MarkdownEditor/SPLIT'

const Root = styled.div`
  background-color: white;
  .control {
    margin: 0.25em 0.5em 0;
    button {
      vertical-align: middle;
      margin-right: 5px;
      border-bottom: none;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
  .panel:last-child {
    padding: 10px;
    border-top: 1px solid ${borderColor};
    border-bottom: 1px solid ${borderColor};
  }
  &.editor {
    .panel:last-child {
      display: none;
    }
  }
  &.preview {
    .panel:first-child {
      display: none;
    }
  }
  &.split {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .control {
      height: 35px;
      margin: 5px 20px 0;
      button {
        height: 30px;
      }
    }
    .panel {
      position: absolute;
      top: 35px;
      bottom: 0;
      overflow: auto;
      border-radius: 0;
      border-right: 1px solid ${borderColor};
      .CodeMirror {
        border: none;
        border-top: 1px solid ${borderColor};
        border-radius: 0;
      }
      &:first-child {
        left: 0;
        width: 50%;
        .CodeMirror {
          height: 100%;
        }
      }
      &:last-child {
        left: 50%;
        right: 0;
      }
    }
  }
`

class MarkdownEditor extends React.PureComponent {
  constructor (props) {
    super()

    this.state = {
      status: EDITOR
    }
    this.value = props.value
  }

  componentDidMount () {
    const { value } = this.props
    this.value = value
  }

  onChange = () => {
    const { onChange } = this.props
    this.value = this.refs.editor.value
    if (onChange) onChange()
  }

  componentDidUpdate () {
    const { value } = this.props
    this.value = value
  }

  onEditorButtonClick = () => {
    if (this.state.status !== EDITOR) {
      this.setState({
        status: EDITOR
      }, () => {
        this.refreshEditor()
        this.focusEditor()
      })
    }
  }

  onPreviewButtonClick = () => {
    if (this.state.status !== PREVIEW) {
      this.setState({
        status: PREVIEW
      })
    }
  }

  onSplitButtonClick = () => {
    if (this.state.status !== SPLIT) {
      this.setState({
        status: SPLIT
      }, () => {
        this.refreshEditor()
        this.focusEditor()
      })
    }
  }

  focusEditor () {
    this.refs.editor.focus()
  }

  refreshEditor () {
    this.refs.editor.refresh()
  }

  getClassName () {
    switch (this.state.status) {
      case SPLIT:
        return 'split'
      case PREVIEW:
        return 'preview'
      case EDITOR:
      default:
        return 'editor'
    }
  }

  render () {
    const { value, placeholder } = this.props
    return <Root className={this.getClassName()}>
      <div className='control'>
        <button onClick={this.onEditorButtonClick} className={this.state.status === EDITOR ? 'active' : ''}>Editor</button>
        <button onClick={this.onPreviewButtonClick} className={this.state.status === PREVIEW ? 'active' : ''}>Preview</button>
        <button onClick={this.onSplitButtonClick} className={this.state.status === SPLIT ? 'active' : ''}>2-pane</button>
      </div>
      <div className='main'>
        <div className='panel'>
          <CodeEditor
            ref='editor'
            value={value}
            placeholder={placeholder}
            onChange={this.onChange}
            textAreaStyle={{
              border: '1px solid ' + borderColor,
              color: placeholderColor,
              fontFamily: monospacedFontFamily,
              resize: 'none',
              width: '100%'
            }}
          />
        </div>
        <div className='panel'>
          <MarkdownPreview value={value} />
        </div>
      </div>
    </Root>
  }
}

export default MarkdownEditor
