import React from 'react'
import api from '../api'

function withPageBundle (PageComponent) {
  return class PageBundleContainer extends React.PureComponent {
    static async getInitialProps (ctx) {
      const bundle = await api.pages(ctx)
      return {
        bundle
      }
    }

    render () {
      return <PageComponent {...this.props} />
    }
  }
}

export default withPageBundle
