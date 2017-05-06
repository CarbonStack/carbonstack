import {
  applyMiddleware,
  compose
} from 'redux'
import withReduxCreator from '../redux/lib/withReduxCreator'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import sagas from '../redux/sagas'
import api from '../api'
import reducers from '../redux/reducers'
import {
  actions as routeActions
} from '../redux/modules/route'
import {
  actions as sessionActions
} from '../redux/modules/session'
import Router from 'next/router'
import NProgress from 'nprogress'

const isBrowser = typeof window !== 'undefined'

export const sagaMiddleware = createSagaMiddleware()
const middlewares = [
  logger,
  sagaMiddleware
]

function composeWithDevtool (...functions) {
  if (isBrowser && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ != null) {
    return window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(...functions)
  }

  return compose(...functions)
}

async function resolveInitialStoreState (ctx) {
  const { user } = await api.session.show(ctx)

  return {
    session: {
      user
    },
    route: {
      pathname: ctx.pathname,
      query: ctx.query,
      as: ctx.asPath
    }
  }
}

const enhancer = composeWithDevtool(applyMiddleware(...middlewares))

/**
 * Something to do after store instantiated
 */
const doLaterWithStore = function (store) {
  // Run saga
  sagaMiddleware.run(sagas)

  // Broadcast new session state
  window.localStorage.setItem('session', JSON.stringify(store.getState().session))
  // Receive new session state and dispatch session.refresh action
  window.addEventListener('storage', e => {
    const session = JSON.parse(window.localStorage.getItem('session'))

    store.dispatch(sessionActions.refresh(session))
  })

  // Dispatch new route
  const dispatchChangeRoute = url => {
    store.dispatch(routeActions.changeRoute({
      pathname: Router.router.pathname,
      query: Router.router.query,
      as: Router.router.as
    }))
  }

  // Bind router event handler for progress bar and redux route reducer
  Router.onRouteChangeStart = (url) => {
    NProgress.start()
  }
  Router.onRouteChangeComplete = () => {
    dispatchChangeRoute()
    NProgress.done()
  }
  Router.onRouteChangeError = () => NProgress.done()

  // Configure HMR
  if (module.hot) {
    module.hot.accept('../redux/reducers', () => {
      const reducers = require('../redux/reducers').default
      store.replaceReducer(reducers)
    })

    module.hot.decline('../redux/sagas')
  }
}

const withRedux = withReduxCreator(reducers, resolveInitialStoreState, enhancer, doLaterWithStore)

export default withRedux
