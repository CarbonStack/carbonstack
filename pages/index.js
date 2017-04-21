import React from 'react'
import DefaultLayout from '../components/layouts/DefaultLayout'
import styled from 'styled-components'
import Link from 'next/link'
import withRedux from '../lib/redux/withRedux'
import connect from '../lib/redux/lib/connect'

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
        <pre>{JSON.stringify(this.props)}</pre>
        <button onClick={::this.onLogInButtonClick}>Login</button>
      </DefaultLayout>
    )
  }
}

export default withRedux(connect(x => x)(Index))
