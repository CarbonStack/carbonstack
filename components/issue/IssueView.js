import React from 'react'
import Link from 'next/link'
import {
  border,
  sansSerifFontFamily
} from '../../lib/styles/variables'
import MarkdownPreview from '../shared/MarkdownPreview'
import moment from 'moment'
import {
  Heart as HeartIcon,
  Pencil as PencilIcon
} from '../shared/octicons'

class IssueView extends React.PureComponent {
  render () {
    const {
      issue
    } = this.props
    const {
      query
    } = this.props.route

    return <div>

      <h1 className='title'>{issue.title}</h1>

      <div className='meta'>

        <div className='left'>
          <div className='writer'>
            by&nbsp;
            <img
              className='photo'
              src={issue.writer.photos[0].value}
            />&nbsp;
            {issue.writer.githubName} {moment(issue.createdAt).fromNow()}
          </div>
        </div>

        <div className='right'>
          <Link href={`/issue-edit?groupUniqueName=${query.groupUniqueName}&issueNumber=${issue.number}`} as={`/g/${query.groupUniqueName}/${issue.number}/edit`}>
            <a><PencilIcon /> Edit</a>
          </Link>
          <button>
            <HeartIcon /> Like
          </button>
        </div>

      </div>

      <div className='body'>
        <MarkdownPreview value={issue.latestCommit.content} />
      </div>

      <style jsx>{`
        .title {
          font-size: 36px;
          font-family: ${sansSerifFontFamily};
          margin: 15px auto 25px;
          border-bottom: ${border};
        }
        .meta {
          margin-bottom: 15px;
          display: flex;
          justify-content: space-between;
        }
        .meta .left .writer .photo {
          width: 24px;
          height: 24px;
          border-radius: 12px;
          vertical-align: middle;
        }
        .body {
          min-height: 300px;
        }
      `}</style>
    </div>
  }
}

export default IssueView
