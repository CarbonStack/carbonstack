import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  actions as sessionActions
} from '../lib/redux/modules/session'

const Nav = styled.nav`
  .Logo a{

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
      <h1 className='Logo'><Link href='/'><a>Carbon Stack</a></Link></h1>

      <div>
        <div><a>Write an issue</a></div>
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

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  }
}

export default connect(state => state, mapDispatchToProps)(TopNav)
