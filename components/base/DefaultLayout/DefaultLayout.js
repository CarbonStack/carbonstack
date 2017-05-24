import React from 'react'
import TopNavigation from '../TopNavigation/TopNavigation'
import Footer from '../Footer'

export default class DefaultLayout extends React.PureComponent {
  render () {
    const {
      children,
      bundle
    } = this.props

    return (
      <div>
        <TopNavigation bundle={bundle} />

        <main>
          {children}
        </main>

        <Footer />

        <style jsx>{`
          main {
            margin: 50px auto 0;
          }
        `}</style>

      </div>
    )
  }
}
