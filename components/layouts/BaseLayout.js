import React from 'react'
import styled, {injectGlobal} from 'styled-components'

const Base = styled.div`
  font-family: Roboto;
`

class BaseLayout extends React.PureComponent {
  render () {
    return <Base>{this.props.children}</Base>
  }
}

export default BaseLayout
