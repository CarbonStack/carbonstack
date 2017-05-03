import {
  combineReducers
} from 'redux'
import session from './modules/session'
import route from './modules/route'
import nouveau from './modules/nouveau'

const reducers = combineReducers({
  session,
  route,
  nouveau
})

export default reducers
