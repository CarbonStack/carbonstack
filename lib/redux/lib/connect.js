import React from 'react'
import {
  connect as trueConnect
} from 'react-redux'
import PropTypes from 'prop-types'

const isBrowser = typeof window !== 'undefined'

const storeShape = PropTypes.shape({
  subscribe: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  getState: PropTypes.func.isRequired
})

const defaultMapStateToProps = () => ({})
const defaultMapDispatchToProps = dispatch => ({ dispatch })
const defaultMergeProps = (stateProps, dispatchProps, ownProps) => {
  return { ...ownProps, ...stateProps, ...dispatchProps }
}

/**
 * Fake connect for SSR
 * Get state from context and don't do any other tasks
 */
function fakeConnect (mapStateToProps, mapDispatchToProps, mergeProps) {
  if (typeof mapStateToProps !== 'function') {
    mapStateToProps = defaultMapStateToProps
  }
  if (typeof mapDispatchToProps !== 'function') {
    mapDispatchToProps = defaultMapDispatchToProps
  }
  if (typeof mergeProps !== 'function') {
    mergeProps = defaultMergeProps
  }

  return (Component) => {
    const ConnectContainer = class extends React.Component {
      static displayName = `connect(${Component.displayName})`
      static contextTypes = {
        store: storeShape
      }

      render () {
        const props = mergeProps(mapStateToProps(this.context.store.getState()), mapDispatchToProps(this.context.store.dispatch))

        return <Component {...props} />
      }
    }

    return ConnectContainer
  }
}

const connect = isBrowser
  ? trueConnect
  : fakeConnect

// export default trueConnect
export default connect

