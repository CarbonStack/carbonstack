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
import api from '../api'

const isBrowser = typeof window !== 'undefined'

const reducers = combineReducers({
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

async function resolveInitialStoreState (ctx) {
  const { user } = await api.me(ctx.req.headers.cookie)

  return {
    app: {
      message: 'I came from server',
      user
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
