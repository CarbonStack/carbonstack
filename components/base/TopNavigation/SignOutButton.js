import React from 'react'
import { SignOut as SignOutIcon } from '../../shared/octicons'

const SignInButton = ({ onClick }) => (
  <div>
    <button onClick={onClick}>
      <SignOutIcon /> Sign Out
    </button>
    <style jsx>{`
      div {
        height: 30px;
        line-height: 30px;
      }
    `}</style>
  </div>
)

export default SignInButton
