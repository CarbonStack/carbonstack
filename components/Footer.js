import React from 'react'
import styled from 'styled-components'

const Root = styled.footer`

`

class Footer extends React.PureComponent {
  render () {
    return <Root>
      Copyright 2017 Junyoung Choi. <a href='https://github.com/CarbonStack/carbonstack' target='_blank'>Source code</a> is published under MIT.
    </Root>
  }
}

export default Footer
