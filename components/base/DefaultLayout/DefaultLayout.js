import React from 'react'
import TopNavigation from '../TopNavigation/TopNavigation'
import Footer from '../Footer'
import media, { largeBreakpoint, mediumBreakpoint } from '../../../lib/styles/media'


export default class DefaultLayout extends React.PureComponent {
  render () {
    const {
      children
    } = this.props

    return (
      <div>
        <TopNavigation />

        <main>
          {children}
        </main>

        <Footer />

        <style jsx>{`
          main {
            width: 100%;
            max-width: ${largeBreakpoint - 64 / 16}em;
            margin: 50px auto 0;
          }

          ${media.small(`
            max-width: ${largeBreakpoint}em;
          `)}
        `}</style>

      </div>
    )
  }
}
