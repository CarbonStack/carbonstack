import React from 'react'
import Link from 'next/link'
import {
  textColor
} from '../../../lib/styles/variables'

const LogoLink = props => (
  <h1 className='LogoLink'>

    <Link href={props.href} as={props.as}>
      <a>
        <img src='https://unpkg.com/@carbonstack/favicon@0.0.1/assets/logo.svg' />
        {props.children}
      </a>
    </Link>

    <style jsx>{`
      .LogoLink {
        height: 50px;
        font-size: 18px;
        line-height: 50px;
        margin: 0;
      }
      a {
        color: ${textColor};
        text-decoration: none;
        border-bottom: none;
      }
      img {
        vertical-align: middle;
      }
    `}</style>

  </h1>
)

export default LogoLink
