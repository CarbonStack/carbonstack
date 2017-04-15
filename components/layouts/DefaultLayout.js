import React from 'react'
import styled from 'styled-components'
import BaseLayout from './BaseLayout'
import TopNav from '../TopNav'
import Footer from '../Footer'

const Main = styled.main`
`

export default class DefaultLayout extends React.Component {
  render () {
    const { title, children } = this.props
    return (
      <BaseLayout>
        <title>{title}</title>
        <TopNav />
        <Main>
          {children}
        </Main>
        <Footer />
      </BaseLayout>
    )
  }
}
