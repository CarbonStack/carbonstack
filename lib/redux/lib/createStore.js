import {
  createStore as createTrueStore
} from 'redux'

const isBrowser = typeof window !== 'undefined'

/**
 * Fabricate fake store when SSR
 *
 * It just resolves the initial state of store and don't use enhancer
 */
function createFakeStore (reducer, initialState, enhancer) {
  const fabricatedInitialState = reducer(initialState, {type: '@@INIT'})
  return {
    getState: () => fabricatedInitialState,
    dispatch: () => {}
  }
}

const createStore = isBrowser
  ? createTrueStore
  : createFakeStore

export default createStore
