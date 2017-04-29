import React from 'react'
import DefaultLayout from '../components/layouts/DefaultLayout'
import styled from 'styled-components'
import Link from 'next/link'
import withBootstrap from '../lib/hocs/withBootstrap'
import { connect } from 'react-redux'
import api from '../lib/api'

class IssuePage extends React.Component {
  static async getInitialProps (ctx) {
    const { req } = ctx
    const { issue, latestCommit } = await api.pages.issue(req.params.rvUniqueName, req.params.issueNumber, ctx)

    return {
      issue,
      latestCommit
    }
  }

  render () {
    const { issue, latestCommit } = this.props
    return (
      <DefaultLayout title='Carbon Stack'>
        <h1>{issue.title}</h1>
        <div>
          {latestCommit.content}
        </div>

      </DefaultLayout>
    )
  }
}

export default withBootstrap(IssuePage)
