import React from 'react'
import DefaultLayout from '../components/layouts/DefaultLayout'
import styled from 'styled-components'
import Link from 'next/link'
import withBootstrap from '../lib/hocs/withBootstrap'
import { connect } from 'react-redux'

class GoodBye extends React.Component {
  render () {
    return (
      <DefaultLayout title='Carbon Stack'>
        <h1>Good Bye</h1>
        <p>I hope you can come back soon!!</p>
      </DefaultLayout>
    )
  }
}

export default withBootstrap(GoodBye)
