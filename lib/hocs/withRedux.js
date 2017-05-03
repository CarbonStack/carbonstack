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
