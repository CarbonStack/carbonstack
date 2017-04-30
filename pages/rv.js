import React from 'react'
import DefaultLayout from '../components/layouts/DefaultLayout'
import styled from 'styled-components'
import Link from 'next/link'
import withBootstrap from '../lib/hocs/withBootstrap'
import { connect } from 'react-redux'
import api from '../lib/api'
import IssueList from '../components/rv/IssueList'

class RvPage extends React.Component {
  static async getInitialProps (ctx) {
    const { query } = ctx
    const { rv, issues } = await api.pages.rv(query.rvUniqueName, ctx)
    console.log(query, rv)

    return {
      rv,
      issues
    }
  }

  render () {
    const { rv, issues } = this.props
    return (
      <DefaultLayout title='Carbon Stack'>
        <h1>RV: {rv.name} <small>@{rv.uniqueName}</small></h1>
        <IssueList issues={issues} />

      </DefaultLayout>
    )
  }
}

export default withBootstrap(RvPage)
