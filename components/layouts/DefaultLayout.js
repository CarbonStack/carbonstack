import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import TopNav from '../TopNav'
import Footer from '../Footer'

const Wrapper = styled.div`
`

const Main = styled.main`
`

export default class DefaultLayout extends React.Component {
  render () {
    const { title, description, keywords, author, children } = this.props
    return (
      <Wrapper>
        <Head>
          <title>{title == null ? 'Carbon Stack' : title}</title>
          <meta name='description' content={description == null ? 'A democratic media for developers' : description} />
          {keywords == null || <meta name='keywords' content={keywords} />}
          {author == null || <meta name='author' content={author} />}
          <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        </Head>
        <TopNav />
        <Main>
          {children}
        </Main>
        <Footer />
      </Wrapper>
    )
  }
}
