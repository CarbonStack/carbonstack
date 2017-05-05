import React from 'react'
import DefaultLayout from '../components/layouts/DefaultLayout'
import styled from 'styled-components'
import withBootstrap from '../lib/hocs/withBootstrap'
import media from '../lib/styles/media'
import api from '../lib/api'
import IssueList from '../components/rv/IssueList'
import {
  monospacedFontFamily,
  grayColor
} from '../lib/styles/variables'

const Root = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 0 15px;
  ${media.small`
    width: 100%;
  `}
  &>p.description {
    color: ${grayColor};
    font-family: ${monospacedFontFamily};
    font-size: 1em;
    padding: 0 10px;
  }
`

class RvPage extends React.Component {
  static async getInitialProps (ctx) {
    const { query } = ctx
    const { rv, issues } = await api.pages.rv(query.rvUniqueName, ctx)

    return {
      rv,
      issues
    }
  }

  render () {
    const { rv, issues } = this.props
    return (
      <DefaultLayout title={`RV: ${rv.name} - Carbon Stack`}>
        <Root>
          <h1>{rv.name} <small>@{rv.uniqueName}</small></h1>
          <p className='description'>{rv.description}</p>
          <IssueList
            issues={issues}
            rv={rv}
          />
        </Root>
      </DefaultLayout>
    )
  }
}

export default withBootstrap(RvPage)
