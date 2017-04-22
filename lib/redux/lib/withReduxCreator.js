import React from 'react'
import { createStore } from 'redux'
import {
  Provider
} from 'react-redux'

const isBrowser = typeof window !== 'undefined'

/**
 * Client store must be persisted to window context
 * because, after first rendering, every page must share this store.
 */
let clientStore = null
let done = false

export default function withReduxCreator (reducers, initialStateResolver, enhancer, doLaterWithStore) {
  return function withRedux (PageComponent) {
    return class ReduxContainer extends React.Component {
      static getPageProps () {
        return typeof PageComponent.getInitialProps === 'function'
          ? PageComponent.getInitialProps()
          : {}
      }

      /**
       * Fetch only props for page. Store will be instantiated from componentWillMount
       */
      static async getInitialPropsFromClient (ctx) {
        const pageProps = await Promise.resolve(this.getPageProps(ctx))

        return {
          pageProps
        }
      }

      /**
       * Fetch props for page and initial state for redux concurrently
       */
      static async getInitialPropsFromServer (ctx) {
        /**
         * Resolve both promises concurrently(because network cost might be high)
         */
        const [pageProps, resolvedInitialState] = await Promise
          .all([this.getPageProps(), initialStateResolver(ctx)])

        const store = createStore(reducers, resolvedInitialState, enhancer)
        const initialInstantiatedState = store.getState()

        return {
          store,
          pageProps,
          initialInstantiatedState
        }
      }

      static async getInitialProps (ctx) {
        if (isBrowser) {
          return this.getInitialPropsFromClient(ctx)
        }
        return this.getInitialPropsFromServer(ctx)
      }

      componentWillMount () {
        if (isBrowser && clientStore == null) {
          const { initialInstantiatedState } = this.props
          clientStore = createStore(reducers, initialInstantiatedState, enhancer)
        }
      }

      componentDidMount () {
        if (!done) {
          doLaterWithStore(clientStore)
          done = true
        }
      }

      render () {
        return <Provider store={clientStore || this.props.store}>
          <PageComponent />
        </Provider>
      }
    }
  }
}
