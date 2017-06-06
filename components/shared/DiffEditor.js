import React from 'react'
import {
  monospacedFontFamily,
  placeholderColor
} from '../../lib/styles/variables'

class DiffEditor extends React.PureComponent {
  constructor (props) {
    super(props)
    this.onCodeMirrorChange = this.onCodeMirrorChange.bind(this)
  }

  componentDidMount () {
    const { CodeMirror } = window
    CodeMirror.modeURL = 'https://unpkg.com/codemirror@5.25.2/mode/%N/%N.js'
    const { value, mode, placeholder = '', originalValue } = this.props
    this.value = value
    this.diffView = CodeMirror.MergeView(this.editor, {
      value,
      lineNumbers: true,
      lineWrapping: true,
      indentUnit: 2,
      tabSize: 2,
      origLeft: originalValue,
      theme: 'github-light',
      minHeight: '5em',
      viewportMargin: Infinity,
      keyMap: 'sublime',
      inputStyle: 'textarea',
      indentWithTabs: false,
      highlightDifferences: true,
      collapseIdentical: false,
      placeholder,
      extraKeys: {
        Tab: function (cm) {
          if (cm.somethingSelected()) cm.indentSelection('add')
          else {
            if (cm.getOption('indentWithTabs')) {
              cm.execCommand('insertTab')
            } else {
              cm.execCommand('insertSoftTab')
            }
          }
        },
        'Cmd-T': function (cm) {
          // Do nothing
        }
      }
    })
    this.codeMirror = this.diffView.edit
    try {
      this.setSyntaxMode(mode || 'gfm')
    } catch (error) {
      console.error(error)
    }

    this.codeMirror.on('change', this.onCodeMirrorChange)
  }

  onCodeMirrorChange () {
    this.value = this.codeMirror.getValue()
    if (this.props.onChange) this.props.onChange()
  }

  componentDidUpdate () {
    const { value } = this.props

    if (this.value !== value) {
      this.codeMirror.off('change', this.onCodeMirrorChange)
      this.codeMirror.setValue(value)
      this.value = value
      this.codeMirror.on('change', this.onCodeMirrorChange)
    }
  }

  setSyntaxMode (mode) {
    const { CodeMirror } = window
    let syntax = CodeMirror.findModeByName(mode)
    if (syntax == null) syntax = CodeMirror.findModeByName('GitHub Flavored Markdown')

    CodeMirror.requireMode(syntax.mode, () => {
      this.diffView.left.orig.setOption('mode', syntax.mime)
      this.codeMirror.setOption('mode', syntax.mime)
    })
  }

  focus () {
    this.codeMirror.focus()
  }

  refresh () {
    this.codeMirror.refresh()
    this.diffView.left.orig.refresh()
  }

  render () {
    const { textAreaStyle } = this.props

    return <div
      style={textAreaStyle}
    >
      <div className='header'>
        <div className='header-label'>Original</div>
        <div className='header-label'>Changed</div>
      </div>
      <div
        ref={editor => (this.editor = editor)}
      />
      <style jsx>{`
        .header {
          display: flex;
          justify-content: space-between;
        }
        .header-label {
          width: 47%;
        }
        div :global(.CodeMirror-merge) {
          overflow: hidden;
        }
        div :global(.CodeMirror) {
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

export default DiffEditor
