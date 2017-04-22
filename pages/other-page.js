import React from 'react'
import DefaultLayout from '../components/layouts/DefaultLayout'
import styled from 'styled-components'
import Link from 'next/link'
import withRedux from '../lib/redux/withRedux'
import { connect } from 'react-redux'

class OtherPage extends React.Component {
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
        Other page <Link href='/'><a>home</a></Link>
        <pre>{JSON.stringify(this.props)}</pre>
      </DefaultLayout>
    )
  }
}

export default withRedux(connect(x => x)(OtherPage))
