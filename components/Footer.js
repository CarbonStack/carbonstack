import React from 'react'
import styled from 'styled-components'
import media, { largeBreakpoint } from '../lib/styles/media'
import { monospacedFontFamily } from '../lib/styles/variables'

const Root = styled.footer`
  height: 60px;
  display: flex;
  width: 100%;
  max-width: ${largeBreakpoint}em;
  margin: 105px auto 0;
  font-family: ${monospacedFontFamily};
  text-align: center;
  p {
    width: 80%;
    margin: 0 auto;
    padding: 0 15px;
    ${media.small`
      width: 100%;
    `}
  }
`

class Footer extends React.PureComponent {
  render () {
    return <Root>
      <p>
        Copyright 2017 Junyoung Choi.&nbsp;<a href='https://github.com/CarbonStack/carbonstack' target='_blank'>Source code of Carbonstack</a>&nbsp;is published under MIT.
      </p>
    </Root>
  }
}

export default Footer
