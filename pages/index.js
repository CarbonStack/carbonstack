import React from 'react'
import DefaultLayout from '../components/layouts/DefaultLayout'
import styled from 'styled-components'
import Link from 'next/link'
import store, { withRedux } from '../lib/redux/store'
import connect from '../lib/redux/lib/connect'
import {
  Provider
} from 'react-redux'

class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      check: false
    }
  }

  onLogInButtonClick (e) {
    const { dispatch } = this.props
    dispatch({
      type: 'REQUEST_LOGIN'
    })
  }

  render () {
    return (
      <DefaultLayout title='Carbon Stack'>
        Welcome to Carbon Stack <Link href='/settings'><a>settings</a></Link>
        <p>{this.props.app.message}</p>
        <button onClick={::this.onLogInButtonClick}>Login</button>
      </DefaultLayout>
    )
  }
}

export default withRedux(connect(x => x)(Index))
