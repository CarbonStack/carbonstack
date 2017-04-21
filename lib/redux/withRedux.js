import {
  applyMiddleware,
  combineReducers,
  compose
} from 'redux'
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

async function resolveInitialStoreState () {
  return {
    app: {
      message: 'I came from server',
      user: null
    }
  }
}

const enhancer = composeWithDevtool(applyMiddleware(...middlewares))

/**
 * Something to do after store instantiated
 * We need this for saga because redux store would be instantiated other context
 */
const doLaterWithStore = function (store) {
  sagaMiddleware.run(sagas)
}

const withRedux = withReduxCreator(reducers, resolveInitialStoreState, enhancer, doLaterWithStore)

export default withRedux
