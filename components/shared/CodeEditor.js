import React from 'react'

class CodeEditor extends React.PureComponent {
  constructor (props) {
    super(props)
    this.onCodeMirrorChange = this.onCodeMirrorChange.bind(this)
  }

  componentDidMount () {
    const { CodeMirror } = window
    CodeMirror.modeURL = '/static/assets/vendor/codeMirror-5.25.2/mode/%N/%N.js'
    const { value, mode, placeholder = '' } = this.props
    this.value = value
    this.codeMirror = CodeMirror.fromTextArea(this.editor, {
      lineNumbers: true,
      lineWrapping: true,
      indentUnit: 2,
      tabSize: 2,
      theme: 'github-light',
      minHeight: '5em',
      viewportMargin: Infinity,
      keyMap: 'sublime',
      inputStyle: 'textarea',
      indentWithTabs: false,
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
    this.codeMirror.setValue(value)

    this.setSyntaxMode(mode || 'GitHub Flavored Markdown')

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
    }
  }

  componentWillUnmount () {
    this.codeMirror.toTextArea()
  }

  setSyntaxMode (mode) {
    const { CodeMirror } = window
    let syntax = CodeMirror.findModeByName(mode)
    if (syntax == null) syntax = CodeMirror.findModeByName('Plain Text')

    this.codeMirror.setOption('mode', syntax.mime)
    CodeMirror.autoLoadMode(this.codeMirror, syntax.mode)
  }

  focus () {
    this.codeMirror.focus()
  }

  render () {
    const { value, className, textAreaStyle } = this.props

    return <textarea
      value={value}
      readOnly
      style={textAreaStyle}
      placeholder='Loading editor...'
      className={className}
      ref={editor => (this.editor = editor)}
    />
  }
}

export default CodeEditor
