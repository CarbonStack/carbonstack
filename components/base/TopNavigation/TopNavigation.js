import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  actions as sessionActions
} from '../../../lib/redux/modules/session'
import NewButton from './NewButton'
import LogoLink from './LogoLink'
import Profile from './Profile'
import SignInButton from './SignInButton'

class TopNavigation extends React.PureComponent {
  onSignInViaGithubButtonClick = () => {
    this.props.actions.requestSignIn('github')
  }

  onSignOutButtonClick = () => {
    this.props.actions.requestSignOut()
  }

  renderLeft () {
    const {
      route
    } = this.props
    switch (route.pathname) {
      case '/issues/show':
      case '/issues/new':
      case '/issues/edit':
        return (
          <div className='left'>
            <LogoLink
              href={{
                pathname: '/groups/show',
                query: {
                  groupUniqueName: route.query.groupUniqueName
                }
              }}
              as={`/g/${route.query.groupUniqueName}`}
            >
              /g/{route.query.groupUniqueName}
            </LogoLink>
          </div>
        )
    }
    return (
      <div className='left'>
        <LogoLink href='/'>
          Carbon Stack
        </LogoLink>
      </div>
    )
  }

  render () {
    const {
      route,
      session
    } = this.props

    return <nav>
      <div className='container'>
        {this.renderLeft()}

        <div className='right'>
          {(route.pathname === '/groups/show' || route.pathname === '/issues') &&
            <NewButton route={route} />
          }
          {this.props.session.user == null ||
            <Profile
              user={this.props.session.user}
              onSignOutButtonClick={this.onSignOutButtonClick}
            />
          }
          {this.props.session.user == null &&
            <SignInButton
              onClick={this.onSignInViaGithubButtonClick}
              isSigningIn={session.isSigningIn}
            />
          }
        </div>
      </div>
      <style jsx>{`
        nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 10;
          background-color: rgba(255,255,255,0.8);
          height: 50px;
          width: 100%;
        }
        .container {
          display: flex;
          justify-content: space-between;
        }
        .right {
          display: flex;
        }
      `}</style>
    </nav>
  }
}

const mapStateToProps = ({session, route}) => {
  return {
    session,
    route
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopNavigation)
