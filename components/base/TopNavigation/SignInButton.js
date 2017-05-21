import React from 'react'
import { Github as GithubIcon } from '../../shared/octicons'

const SignInButton = ({ onClick, isSigningIn }) => (
  <div>
    <button
      className='primary'
      onClick={onClick}
    >
      <GithubIcon /> {isSigningIn
        ? 'Signing In...'
        : 'Sign in'
      }
    </button>
    <style jsx>{`
      div {
        height: 50px;
        line-height: 50px;
      }
      button {
        height: 50px;
        padding: 0 10px;
      }
    `}</style>
  </div>
)

export default SignInButton
