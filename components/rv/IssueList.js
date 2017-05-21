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
    padding: 0 15px 5px;
    .meta {
      color: ${grayColor};
      font-family: ${monospacedFontFamily};
      font-size: 0.8em;
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
    h2 {
      font-size: 18px;
      margin: 0;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      color: ${grayColor};
      .issueNumber {
        font-size: 0.66em;
        margin-right: 5px;
      }
      .summary {
        vertical-align: middle;
        margin-left: 15px;
        color: ${grayColor};
      }
    }
    &.empty {
      color: ${grayColor};
      font-family: ${monospacedFontFamily};
      border: none;
      margin: 45px 15px;
      font-size: 1.2em;
      text-align: center;
      line-height: 250%;
    }
    &:last-child {
      border-bottom: none;
    }
  }
`

class IssueList extends React.PureComponent {
  render () {
    const { issues, group } = this.props
    const issueItems = issues
      .map(issue =>
        <li
          key={issue._id}
        >
          <h2>
            <Link
              href={{
                pathname: '/issue',
                query: {
                  groupUniqueName: group.uniqueName,
                  issueNumber: issue.number
                }
              }}
              as={`/g/${group.uniqueName}/${issue.number}`}
            >
              <a>
                <span className='issueNumber'>#{issue.number}</span>
                {issue.title}<code className='summary'>{issue.summary}</code></a>
            </Link>
          </h2>
          <div className='meta'>
            <div className='writer'>
              by
              <img
                className='photo'
                src={issue.writer.photos[0].value}
              />&nbsp;
              {issue.writer.githubName} {moment(issue.createdAt).fromNow()}
            </div>
          </div>
        </li>
      )

    return <List>
      {issueItems}
      {issueItems.length === 0 &&
        <li className='empty'>
          So boring...😪 we don't have any issue yet...<br />
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
          ><a><b>Could you make one?✨</b></a></Link>
        </li>
      }
    </List>
  }
}

export default IssueList
