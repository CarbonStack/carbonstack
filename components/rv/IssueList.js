import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import {
  monospacedFontFamily,
  borderColor,
  grayColor
} from '../../lib/styles/variables'
import moment from 'moment'

const List = styled.ul`
  list-style: none;
  &>li {
    border-bottom: 1px solid ${borderColor};
    padding: 15px 15px;
    .meta {
      color: ${grayColor};
      font-family: ${monospacedFontFamily};
      font-size: 0.9em;
      .writer {
        line-height: 20px;
        .photo {
          width: 20px;
          height: 20px;
          border-radius: 10px;
          vertical-align: middle;
        }
      }
    }
    .summary {
      color: ${grayColor};
    }
  }
`

class IssueList extends React.PureComponent {
  render () {
    const { issues, rv } = this.props
    const issueItems = issues
      .map(issue =>
        <li
          key={issue._id}
        >
          <div className='meta'>
            <div className='writer'>
              by&nbsp;
              <img
                className='photo'
                src={issue.writer.photos[0].value}
              />&nbsp;
              {issue.writer.githubName} {moment(issue.createdAt).fromNow()}
            </div>
            <div>{issue.createdAt}</div>
          </div>
          <h2>
            <Link
              href={{
                pathname: '/issue',
                query: {
                  rvUniqueName: rv.uniqueName,
                  issueNumber: issue.number
                }
              }}
              as={`/rv/${rv.uniqueName}/${issue.number}`}
            >
              <a>#{issue.number}: {issue.title}</a>
            </Link>
          </h2>
          <pre className='summary'>
            <code>{issue.summary}</code>
          </pre>
        </li>
      )

    return <List>
      {issueItems}
    </List>
  }
}

export default IssueList
