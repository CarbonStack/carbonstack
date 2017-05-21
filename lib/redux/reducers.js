import {
  combineReducers
} from 'redux'
import session from './modules/session'
import route from './modules/route'

const reducers = combineReducers({
  session,
  route
})

export default reducers
