import React from 'react'
import DefaultLayout from '../components/layouts/DefaultLayout'
import styled from 'styled-components'
import Link from 'next/link'
import { connect } from 'react-redux'
import withBootstrap from '../lib/hocs/withBootstrap'
import media from '../lib/styles/media'
import api from '../lib/api'
import LanguageEmoji from '../components/shared/LanguageEmoji'

const Main = styled.div`
  width: 80%;
  margin: 0 auto 65px;
  padding: 0 15px;
  ${media.small`
    width: 100%;
  `}
  .jumbotron {
    padding: 2em 0 0;
  }
  .rvList {
    margin: 4em 0;
    .rvList-title {
      font-size: 1.5em;
      margin-bottom: 1em;
    }
    .rvList-list {
      margin: 1em 0 2em;
      h3 {
        font-size: 1.2em;
      }
      h3, p {
        margin: 0 0 0.5em;
      }
    }
    .rvList-hint {
      font-size: 1em;
    }
  }
`

class Index extends React.Component {
  static async getInitialProps (ctx) {
    const { rvs } = await api.pages.home(ctx)

    return {
      rvs
    }
  }

  render () {
    const { rvs } = this.props

    const rvItems = rvs.map(rv => <li key={rv._id}>
      <h3><Link href={`/rv?rvUniqueName=${rv.uniqueName}`} as={`/rv/${rv.uniqueName}`}>
        <a>{rv.name} <LanguageEmoji lang={rv.language} /> <small><code>/rv/{rv.uniqueName}</code></small></a>
      </Link></h3>
      <p>{rv.description}</p>
    </li>)

    return (
      <DefaultLayout title='Carbon Stack'>
        <Main>
          <div className='jumbotron'>
            <h1>Storm the front!🚀</h1>
          </div>
          <div className='rvList'>
            <h2 className='rvList-title'>Join a RV to find interesting issues!</h2>
            <ul className='rvList-list'>
              {rvItems}
            </ul>
            <p className='rvList-hint'>If you want other RV, you can request it by creating an issue to <Link href={`/rv?rvUniqueName=carbonstack`} as={`/rv/carbonstack`}><a><code>Carbon Stack</code> RV</a></Link>!!</p>
          </div>
        </Main>
      </DefaultLayout>
    )
  }
}

export default withBootstrap(connect(x => x)(Index))
