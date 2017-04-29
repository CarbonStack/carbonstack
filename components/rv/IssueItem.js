import React from 'react'
import styled from 'styled-components'

class IssueItem extends React.PureComponent {
  render () {
    const { issue } = this.props
    return <li>
      <div>#{issue.number}</div>
      <div>{issue.title}</div>
    </li>
  }
}

export default IssueItem
