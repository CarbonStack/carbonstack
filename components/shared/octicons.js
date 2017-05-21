import React from 'react'

import SearchSVG from 'octicons/build/svg/search.svg'
import GithubSVG from 'octicons/build/svg/mark-github.svg'
import SignOutSVG from 'octicons/build/svg/sign-out.svg'
import ChevronDownSVG from 'octicons/build/svg/chevron-down.svg'
import OrganizationSVG from 'octicons/build/svg/organization.svg'

const style = ({ size, color }) => ({
  fill: 'currentColor',
  verticalAlign: 'middle',
  width: size == null
    ? '1em'
    : size,
  height: size == null
    ? '1em'
    : size
})

export const Search = props => (
  <SearchSVG style={style(props)} />
)

export const Github = props => (
  <GithubSVG style={style(props)} />
)

export const SignOut = props => (
  <SignOutSVG style={style(props)} />
)

export const ChevronDown = props => (
  <ChevronDownSVG style={style(props)} />
)

export const Organization = props => (
  <OrganizationSVG style={style(props)} />
)
