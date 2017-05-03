import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  actions as sessionActions
} from '../lib/redux/modules/session'
import { largeBreakpoint } from '../lib/styles/media'
import { monospacedFontFamily, textColor } from '../lib/styles/variables'

const Nav = styled.nav`
  height: 60px;
  display: flex;
  width: 100%;
  max-width: ${largeBreakpoint}em;
  margin: 0 auto 10px;
  font-family: ${monospacedFontFamily};

  .left {
    flex: 1;
    line-height: 60px;
    .Logo {
      font-size: 18px;
      height: 60px;
      margin: 0;
      padding: 0 0 0 15px;
      img {
        vertical-align: middle;
        padding-right: 5px;
      }
      a {
        padding-left: 5px;
        vertical-align: middle;
        color: ${textColor};
      }
    }
  }

  .right {
    display: flex;
    align-items: row;
    height: 60px;
    line-height: 60px;
    margin: 0;
    .nouveau {
      margin: 0 5px;
    }
    .profile {
      padding: 0 5px;
      margin: 0 5px;
    }
    .profileImage {
      border-radius: 22.5px;
      vertical-align: middle;
    }
    .signin {
      button {
        line-height: 35px;
        height: 35px;
        vertical-align: middle;
        padding: 0 10px;
        margin: 0 5px;
      }
    }
  }
`

const Profile = ({ user }) => {
  const photoURL = user.photos[0].value
  return <div className='profile'>
    <img className='profileImage' width='40' height='40' src={photoURL} />
  </div>
}

class TopNav extends React.PureComponent {
  onSignInViaGithubButtonClick () {
    this.props.actions.requestSignIn('github')
  }

  onSignOutButtonClick () {
    this.props.actions.requestSignOut()
  }

  render () {
    return <Nav>
      <div className='left'>
        <h1 className='Logo'>
          <Link href='/'>
            <a><img src='https://unpkg.com/@carbonstack/favicon@0.0.1/assets/logo.svg' />Carbon Stack</a>
          </Link>
        </h1>
      </div>

      <div className='right'>
        <div className='nouveau'>
          <Link href={{
            pathname: '/nouveau',
            query: {
              rv: null
            }
          }}><a>Write an issue</a></Link>
        </div>
        {this.props.session.user == null ||
          <Profile user={this.props.session.user} />
        }
        <div className='signin'>
          {this.props.session.user == null
            ? <button onClick={::this.onSignInViaGithubButtonClick}>Sign in via Github</button>
            : <button onClick={::this.onSignOutButtonClick}>Sign Out</button>
          }
        </div>
      </div>
    </Nav>
  }
}

const mapStateToProps = ({session}) => {
  return {
    session
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopNav)
