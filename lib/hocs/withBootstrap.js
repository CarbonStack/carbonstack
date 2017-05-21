import withRedux from './withRedux'
import withHttpErrorHandler from './withHttpErrorHandler'
import withPageBundle from './withPageBundle'

function pipe (component, hocs) {
  return hocs.reduce((component, hoc) => hoc(component), component)
}

function withBootstrap (Component, withoutBundle = false) {
  if (withoutBundle) {
    return pipe(Component, [
      withHttpErrorHandler,
      withRedux
    ])
  }
  return pipe(Component, [
    withPageBundle,
    withHttpErrorHandler,
    withRedux
  ])
}

export default withBootstrap
