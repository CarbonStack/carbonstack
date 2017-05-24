import React from 'react'
import {
  monospacedFontFamily,
  grayColor,
  border
} from '../../lib/styles/variables'
import IssueItem from './IssueItem'
import Link from 'next/link'

class IssueList extends React.PureComponent {
  render () {
    const { issues, group } = this.props
    const issueItems = issues
      .map(issue => <IssueItem issue={issue} group={group} />)

    return <ul>
      {issueItems}
      {issueItems.length === 0 &&
        <li className='empty'>
          <p>There is no issue yet.</p>
          <p>
            <Link
              href={{
                pathname: '/new',
                query: group.uniqueName != null
                  ? {
                    groupUniqueName: group.uniqueName
                  }
                  : null
              }}
              as={`/g/${group.uniqueName}/new`}
            ><a>Could you make one?✨</a></Link>
          </p>
        </li>
      }
      <style jsx>{`
        ul {
          list-style: none;
          flex: 1;
          padding: 0;
          min-height: 300px;
        }
        .empty {
          color: ${grayColor};
          font-family: ${monospacedFontFamily};
          border: none;
          margin: 45px 15px;
          font-size: 1.2em;
          line-height: 250%;
        }
      `}</style>
    </ul>
  }
}

export default IssueList
