import React from 'react'
import DefaultLayout from '../components/base/DefaultLayout'
import withBootstrap from '../lib/hocs/withBootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  actions as sessionActions
} from '../lib/redux/modules/session'
import media from '../lib/styles/media'
import { Github as GithubIcon } from '../components/shared/octicons'

class LoginPage extends React.Component {
  onSignInViaGithubButtonClick () {
    this.props.actions.requestSignIn('github')
  }

  render () {
    const { actions } = this.props
    return (
      <DefaultLayout title='Log In - Carbon Stack'>

        <div className='root'>

          <h1>You have to sign in to access this page!</h1>

          <div className='control'>
            <button className='primary' onClick={actions.requestSignIn}>
              <GithubIcon /> Sign in
            </button>
          </div>

        </div>

        <style jsx>{`
          div.root {
            width: 80%;
            margin: 55px auto 65px;
            padding: 0 15px;
            text-align: center;
          }
          ${media.small`
            div.root {
              width: 100%;
            }
          `}
          .control button {
            font-size: 1.4em;
          }
        `}</style>
      </DefaultLayout>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  }
}

export default withBootstrap(connect(null, mapDispatchToProps)(LoginPage), true)
