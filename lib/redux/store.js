import {
  applyMiddleware,
  combineReducers,
  compose
} from 'redux'
import createStore from './lib/createStore'
import withReduxCreator from './lib/withReduxCreator'
import logger from 'redux-logger'
import app from './app/reducer'
import createSagaMiddleware from 'redux-saga'
import sagas from './app/sagas'

const isBrowser = typeof window !== 'undefined'

const test = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'TICK': return { count: state.count + 1 }
    default: return state
  }
}

const reducers = combineReducers({
  test,
  app
})

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

// FIXME: cannot resolve async things
// I think it can be done at withReduxCreator.getInitialProps
function resolveInitialStoreState () {
  if (isBrowser) {
    const scriptEl = document.getElementById('redux-ssr')
    if (scriptEl != null) {
      scriptEl.parentNode.removeChild(scriptEl)
      const state = window.__REDUX_INITIAL_STATE__
      window.__REDUX_INITIAL_STATE__ = undefined
      return state
    } else {
      return
    }
  }

  return {
    app: {
      message: 'I came from server',
      user: null
    }
  }
}

const initialStoreState = resolveInitialStoreState()

const store = createStore(reducers, initialStoreState, composeWithDevtool(applyMiddleware(...middlewares)))

export const withRedux = withReduxCreator(store)

/**
 * FIXME: We need some entry point for handling HMR
 * store: must be declined
 * saga: must be declined
 * reducers: can be accepted as long as  we replace them
 * actions: can be accepted
 */
export default store

if (isBrowser) {
  sagaMiddleware.run(sagas)
}
