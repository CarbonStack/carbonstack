import React from 'react'
import DefaultLayout from '../components/layouts/DefaultLayout'
import styled from 'styled-components'
import Link from 'next/link'
import { connect } from 'react-redux'
import withBootstrap from '../lib/hocs/withBootstrap'

class Index extends React.Component {
  render () {
    return (
      <DefaultLayout title='Carbon Stack'>
        Welcome to Carbon Stack
      </DefaultLayout>
    )
  }
}

export default withBootstrap(connect(x => x)(Index))
