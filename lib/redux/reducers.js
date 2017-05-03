import {
  combineReducers
} from 'redux'
import session from './modules/session'
import nouveau from './modules/nouveau'

const reducers = combineReducers({
  session,
  nouveau
})

export default reducers
