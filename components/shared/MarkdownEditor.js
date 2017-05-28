import React from 'react'
import CodeEditor from './CodeEditor'
import {
  borderColor,
  monospacedFontFamily,
  placeholderColor
} from '../../lib/styles/variables'

class MarkdownEditor extends React.PureComponent {
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

  focusEditor () {
    this.refs.editor.focus()
  }

  refreshEditor () {
    this.refs.editor.refresh()
  }

  render () {
    const { value, placeholder } = this.props

    return <div>
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
      <style jsx>{`
        div :global(.CodeMirror) {
          height: auto;
          min-height: 100px;
          font-size: 16px;
          font-family: ${monospacedFontFamily};
        }
        div :global(.CodeMirror-scroll) {
          padding-bottom: 48px;
          border-radius: 4px;
        }
        div :global(.CodeMirror-placeholder) {
          color: ${placeholderColor};
        }
        div :global(.CodeMirror pre) {
          font-family: ${monospacedFontFamily} !important;
          padding: 0 8px !important;
        }
        div :global(.cm-header-1) {
          font-size: 32px;
          line-height: 1.4;
        }
        div :global(.cm-header-2) {
          font-size: 24px;
          line-height: 1.4;
        }
        div :global(.cm-header-3) {
          font-size: 20px;
          line-height: 1.4;
        }
        div :global(.cm-header-4) {
          font-size: 16px;
          line-height: 1.4;
        }
        div :global(.cm-header-5) {
          font-size: 14px;
          line-height: 1.4;
        }
        div :global(.cm-header-6) {
          font-size: 12px;
          line-height: 1.4;
        }
      `}</style>
    </div>
  }
}

export default MarkdownEditor
