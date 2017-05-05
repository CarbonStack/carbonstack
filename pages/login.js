import React from 'react'
import DefaultLayout from '../components/layouts/DefaultLayout'
import withBootstrap from '../lib/hocs/withBootstrap'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  actions as sessionActions
} from '../lib/redux/modules/session'
import media from '../lib/styles/media'
import {
  monospacedFontFamily,
  grayColor
} from '../lib/styles/variables'

const Main = styled.div`
  width: 80%;
  margin: 55px auto 65px;
  padding: 0 15px;
  text-align: center;
  ${media.small`
    width: 100%;
  `}
  &>h1 {
    font-size: 4em;
  }
  &>p.description {
    color: ${grayColor};
    font-family: ${monospacedFontFamily};
    font-size: 2em;
  }
`

class LoginPage extends React.Component {
  onSignInViaGithubButtonClick () {
    this.props.actions.requestSignIn('github')
  }

  render () {
    return (
      <DefaultLayout title='Carbon Stack'>
        <Main>
          <h1>You have to sign in!</h1>
        </Main>
      </DefaultLayout>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  }
}

export default withBootstrap(connect(null, mapDispatchToProps)(LoginPage))
