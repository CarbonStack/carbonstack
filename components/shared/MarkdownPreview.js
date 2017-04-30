import React from 'react'
import styled from 'styled-components'
import remark from 'remark'
import reactRenderer from 'remark-react'
import {
  placeholderColor,
  monospacedFontFamily
} from '../../lib/styles/variables'

const Empty = styled.div`
  color: ${placeholderColor};
  font-family: ${monospacedFontFamily};
`

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
    return <div>
      {(this.state.rendered == null || this.state.rendered.props.children == null) &&
        <Empty>Empty Content</Empty>
      }
      {this.state.rendered}
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
