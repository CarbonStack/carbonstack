import React from 'react'
import remark from 'remark'
import reactRenderer from 'remark-react'
import {
  placeholderColor,
  monospacedFontFamily
} from '../../lib/styles/variables'

const IDLE = 'MarkdownPreview/IDLE'
const WORKING = 'MarkdownPreview/WORKING'

class MarkdownPreview extends React.PureComponent {
  constructor (props) {
    super(props)

    this.queued = null
    this.state = {
      status: IDLE,
      rendered: renderMarkdownSync(props.value)
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.value !== nextProps.value) {
      this.queueRender(nextProps.value)
    }
  }

  queueRender (newValue) {
    if (this.state.status !== WORKING) {
      this.setState({
        status: WORKING
      })
      renderMarkdown(newValue)
        .then(rendered => {
          this.setState({
            status: IDLE,
            rendered
          }, () => {
            if (this.queued != null) {
              this.queueRender(this.queued)
              this.queued = null
            }
          })
        })
    } else {
      this.queued = newValue
    }
  }

  render () {
    return <div className='markdown-body'>
      {(this.state.rendered == null || this.state.rendered.props.children == null) &&
        <div className='empty'>Empty Content</div>
      }
      {this.state.rendered}
      <style jsx>{`
        .markdown-body {
          overflow-x: hidden;
          overflow-y: auto;
        }
        .empty {
          color: ${placeholderColor};
          font-family: ${monospacedFontFamily};
        }
      `}</style>
    </div>
  }
}

const processor = remark().use(reactRenderer)
function renderMarkdownSync (value) {
  return processor.processSync(value).contents
}
function renderMarkdown (value) {
  return processor.process(value)
    .then(result => result.contents)
}

export default MarkdownPreview
