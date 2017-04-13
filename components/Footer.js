import React from 'react'
import styled from 'styled-components'

const Root = styled.footer`

`

class Footer extends React.PureComponent {
  render () {
    return <Root>
      Copyright 2017. Junyoung Choi. All rights reserved.
    </Root>
  }
}

export default Footer
