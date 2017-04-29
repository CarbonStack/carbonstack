import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  actions as sessionActions
} from '../lib/redux/modules/session'
import Logo from './Logo'

const Nav = styled.nav`
  height: 60px;
  display: flex;

  &>.left {
    flex: 1;
    .Logo {
      font-size: 18px;
      line-height: 60px;
      height: 60px;
      margin: 0;
      padding: 0 0 0 15px;
      img {
        vertical-align: middle;
      }
      a {
        padding-left: 5px;
        text-decoration: none;
        vertical-align: middle;
      }
    }
  }
  &>.right {
    display: flex;
    align-items: row;
  }
`

const Profile = ({ user }) => {
  const photoURL = user.photos[0].value
  return <div>
    <img width='30' height='30' src={photoURL} /> {user.githubName}
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
          <img src='/static/assets/images/logo.svg' />
          <Link href='/'><a>Carbon Stack</a></Link>
        </h1>
      </div>

      <div className='right'>
        <div><Link href='/nouveau'><a>Write an issue</a></Link></div>
        {this.props.session.user == null ||
          <Profile user={this.props.session.user} />
        }
        <div>
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
