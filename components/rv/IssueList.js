import React from 'react'
import styled from 'styled-components'
import IssueItem from './IssueItem'

class IssueList extends React.PureComponent {
  render () {
    const { issues } = this.props
    const issueItems = issues
      .map(issue => <IssueItem
        issue={issue}
        key={issue._id}
      />)

    return <div>
      <ul>
        {issueItems}
      </ul>

    </div>
  }
}

export default IssueList
