import React from 'react'
import DefaultLayout from '../components/layouts/DefaultLayout'
import styled from 'styled-components'
import Link from 'next/link'
import withRedux from '../lib/redux/withRedux'
import { connect } from 'react-redux'

class Index extends React.Component {
  render () {
    return (
      <DefaultLayout title='Carbon Stack'>
        Welcome to Carbon Stack
      </DefaultLayout>
    )
  }
}

export default withRedux(connect(x => x)(Index))
