import React from 'react'
import {
  Provider
} from 'react-redux'
import createStore from './createStore'
import serialize from 'serialize-javascript'

const isBrowser = typeof window !== 'undefined'
const temporaryKeyName = '__REDUX_INITIAL_STATE__'

let clientStore = null
let isStoreCreated = false

export default function withReduxCreator (reducers, initialStateResolver, enhancer, somethingToDoLaterWithStore) {
  return function withRedux (PageComponent) {
    return class ReduxContainer extends React.Component {
      static getPageProps () {
        return typeof PageComponent.getInitialProps === 'function'
          ? PageComponent.getInitialProps()
          : {}
      }

      componentWillMount () {
        /**
         * We should instantiate store here. It is doable because the state can be fetched
         * synchronously from window object.
         * Otherwise, store won't be instantiated because
         * `getInitialProps` fired from server side only, when the first loading.
         */
        if (isBrowser && !isStoreCreated) {
          const initialInstantiatedState = window[temporaryKeyName]
          clientStore = createStore(reducers, initialInstantiatedState, enhancer)
          isStoreCreated = true
        }
      }

      componentDidMount () {
        /**
         * Do something to do only once after store instantiated from client side
         * (maybe running Saga?)
         */
        if (!isStoreCreated) {
          somethingToDoLaterWithStore(clientStore)
        }
      }

      /**
       * Fetch props for page only
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
        const [pageProps, resolvedInitialState] = await Promise.all([this.getPageProps(), initialStateResolver(ctx)])

        const store = createStore(reducers, resolvedInitialState)
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

      render () {
        return <Provider store={clientStore || this.props.store}>
          <div>
            <PageComponent />
            {<script dangerouslySetInnerHTML={{__html: `window.${temporaryKeyName}=${serialize(this.props.initialInstantiatedState)}`}} />}
          </div>
        </Provider>
      }
    }
  }
}
