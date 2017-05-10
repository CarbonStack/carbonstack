import React from 'react'
import { connect } from 'react-redux'
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
import CommentListContainer from '../components/issue/CommentListContainer'

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
  &>.comments {
    margin: 35px auto;
    padding: 35px 0 0;
    border-top: 1px solid ${borderColor};
  }
`
class IssuePage extends React.Component {
  static async getInitialProps (ctx) {
    const { query } = ctx
    const {
      issue,
      comments
    } = await api.pages.issue(query.rvUniqueName, query.issueNumber, ctx)

    return {
      issue,
      comments,
      query
    }
  }

  constructor () {
    super()

    this.state = {
      newComment: {
        content: ''
      }
    }
  }

  render () {
    const {
      issue,
      comments,
      query,
      session
    } = this.props

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
            </div>
          </div>
          <h1 className='title'>{issue.title}</h1>
          <div>
            <MarkdownPreview value={issue.latestCommit.content} />
          </div>
          <div className='comments'>
            <h3>Comments</h3>
            <CommentListContainer
              user={session.user}
              issue={issue}
              comments={comments}
            />
          </div>
        </Root>
      </DefaultLayout>
    )
  }
}

const mapStateToProps = state => ({
  session: state.session
})

export default withBootstrap(connect(mapStateToProps)(IssuePage))
