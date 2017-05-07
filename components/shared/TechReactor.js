import React from 'react'

class TechReactor extends React.PureComponent {
  isMount = false

  componentWillMount () {
    this.saga.next()
    this.isMount = true
  }

  componentWillUnmount () {
    this.isMount = false
  }

  * saga () {
    while (true) {
      console.warn('Define saga method!!')
      yield
    }
  }

  * take (targetAction) {
    while (true) {
      const action = yield
      if (action.type === targetAction) {
        return action
      }
    }
  }

  * call (callee, ...args) {
    let resolved = false
    let result
    Promise.resolve(callee(...args))
      .then(data => {
        resolved = true
        result = data
        this.saga.next()
      })
      .catch(error => {
        this.saga.throw(error)
      })
    while (true) {
      yield
      if (resolved) break
    }
    return result
  }

  dispatch (action) {
    this.saga.next(action)
    const newState = this.reducer(this.state, action)
    if (this.isMount && this.state !== newState) {
      this.setState(newState)
    }
  }

  reducer (state, action) {
    console.warn('Define reducer!!')
    return state
  }

  put (action) {
    setImmediate(() => {
      this.dispatch(action)
    })
  }
}

export default TechReactor
