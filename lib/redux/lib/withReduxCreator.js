import React from 'react'
import { createStore } from 'redux'
import {
  Provider
} from 'react-redux'

const isBrowser = typeof window !== 'undefined'

export default function withReduxCreator (reducers, initialStateResolver, enhancer, doLaterWithStore) {
  return function withRedux (PageComponent) {
    return class ReduxContainer extends React.PureComponent {
      static getPageProps (ctx) {
        return typeof PageComponent.getInitialProps === 'function'
          ? PageComponent.getInitialProps(ctx)
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
          .all([this.getPageProps(ctx), initialStateResolver(ctx)])

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
        if (isBrowser && window.__REDUX_STORE__ == null) {
          const { initialInstantiatedState } = this.props
          window.__REDUX_STORE__ = createStore(reducers, initialInstantiatedState, enhancer)
        }
      }

      componentDidMount () {
        if (!window.__REDUX_DONE__) {
          doLaterWithStore(window.__REDUX_STORE__)
          window.__REDUX_DONE__ = true
        }
      }

      render () {
        return <Provider store={(typeof window !== 'undefined' && window.__REDUX_STORE__) || this.props.store}>
          <PageComponent {...this.props.pageProps} />
        </Provider>
      }
    }
  }
}
