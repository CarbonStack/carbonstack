import React from 'react'
import {
  Provider
} from 'react-redux'
import 'redux'

export default function withReduxCreator (store) {
  return function withRedux (PageComponent) {
    return class ReduxContainer extends React.Component {
      static async getInitialProps (ctx) {
        let pageProps
        if (typeof PageComponent.getInitialProps === 'function') {
          pageProps = await Promise.resolve(PageComponent.getInitialProps())
        } else pageProps = {}

        // when SSR, resolve initial state and create store in this context
        // provide store to Provider via this.props.store

        // Maybe we can use this module as a entry for store
        // Then, reducers also are imported to here :)

        return {
          pageProps
        }
      }

      render () {
        return <Provider store={store}>
          <PageComponent />
        </Provider>
      }
    }
  }
}
