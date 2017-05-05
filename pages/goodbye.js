import React from 'react'
import DefaultLayout from '../components/layouts/DefaultLayout'
import withBootstrap from '../lib/hocs/withBootstrap'
import styled from 'styled-components'
import media from '../lib/styles/media'
import {
  monospacedFontFamily,
  grayColor
} from '../lib/styles/variables'

const Main = styled.div`
  width: 80%;
  margin: 55px auto 65px;
  padding: 0 15px;
  text-align: center;
  ${media.small`
    width: 100%;
  `}
  &>h1 {
    font-size: 4em;
  }
  &>p.description {
    color: ${grayColor};
    font-family: ${monospacedFontFamily};
    font-size: 2em;
  }
`
class GoodBye extends React.Component {
  render () {
    return (
      <DefaultLayout title='Good Bye! 👋 - Carbon Stack'>
        <Main>
          <h1>Good Bye! 👋</h1>
          <p className='description'>I hope you can come back soon!!</p>
        </Main>
      </DefaultLayout>
    )
  }
}

export default withBootstrap(GoodBye)
