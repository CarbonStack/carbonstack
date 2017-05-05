import React from 'react'
import DefaultLayout from '../components/layouts/DefaultLayout'
import withBootstrap from '../lib/hocs/withBootstrap'
import styled from 'styled-components'
import Link from 'next/link'
import media from '../lib/styles/media'
import {
  borderColor,
  grayColor,
  monospacedFontFamily
} from '../lib/styles/variables'
import api from '../lib/api'
import MarkdownPreview from '../components/shared/MarkdownPreview'
import moment from 'moment'

const Root = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 0 15px;
  ${media.small`
    width: 100%;
  `}
  &>div.meta {
    display: flex;
    color: ${grayColor};
    font-family: ${monospacedFontFamily};
    font-size: 0.9em;
    .left {
      flex: 1;
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
  }
  &>h1.title {
    font-size: 3em;
    border-bottom: 1px solid ${borderColor};
    margin-bottom: 15px;
  }
`
class IssuePage extends React.Component {
  static async getInitialProps (ctx) {
    const { query } = ctx
    const { issue, latestCommit } = await api.pages.issue(query.rvUniqueName, query.issueNumber, ctx)

    return {
      issue,
      latestCommit,
      query
    }
  }

  render () {
    const { issue, latestCommit, query } = this.props
    return (
      <DefaultLayout title={`${issue.title} by ${issue.writer.githubName} - Carbon Stack`}>
        <Root>
          <div className='meta'>
            <div className='left'>
              <div className='writer'>
                #{issue.number}: in <Link href={`/rv?rvUniqueName=${query.rvUniqueName}`} as={`/rv/${query.rvUniqueName}`}><a>{query.rvUniqueName}</a></Link> by&nbsp;
                <img
                  className='photo'
                  src={issue.writer.photos[0].value}
                />&nbsp;
                {issue.writer.githubName} {moment(issue.createdAt).fromNow()}
              </div>
              <div>{issue.createdAt}</div>
            </div>
            <div className='right'>
            </div>
          </div>
          <h1 className='title'>{issue.title}</h1>
          <div>
            <MarkdownPreview value={latestCommit.content} />
          </div>
        </Root>
      </DefaultLayout>
    )
  }
}

export default withBootstrap(IssuePage)
