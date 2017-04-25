import withRedux from './withRedux'
import withHttpErrorHandler from './withHttpErrorHandler'

function withBootstrap (Component) {
  return withRedux(withHttpErrorHandler(Component))
}

export default withBootstrap
