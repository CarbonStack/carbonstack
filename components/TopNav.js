import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import connect from '../lib/redux/lib/connect'
import { bindActionCreators } from 'redux'
import appActions from '../lib/redux/app/actions'

const Nav = styled.nav`
  .Logo a{

  }
`

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
        {this.props.app.user == null
          ? <button onClick={::this.onSignInViaGithubButtonClick}>Sign in via Github</button>
          : <button onClick={::this.onSignOutButtonClick}>Sign Out</button>
        }
      </div>
    </Nav>
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(appActions, dispatch)
  }
}

export default connect(state => state, mapDispatchToProps)(TopNav)
