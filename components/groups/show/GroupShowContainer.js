import reduxlet from 'reduxlet-saga'
import GroupShow from './GroupShow'
import { fork, take, call, select, put } from 'redux-saga/effects'
import api from '../../../lib/api'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  actions as sessionActions
} from '../../../lib/redux/modules/session'

const REQUEST_JOIN_GROUP = 'REQUEST_JOIN_GROUP'
const SUCCESS_JOIN_GROUP = 'SUCCESSJOIN_GROUP'
const FAILURE_JOIN_GROUP = 'FAILURE_JOIN_GROUP'
const REQUEST_LEAVE_GROUP = 'REQUEST_LEAVE_GROUP'
const SUCCESS_LEAVE_GROUP = 'SUCCESS_LEAVE_GROUP'
const FAILURE_LEAVE_GROUP = 'FAILURE_LEAVE_GROUP'
const UPDATE_GROUP_ROLE = 'UPDATE_GROUP_ROLE'
const DESTROY_GROUP_ROLE = 'DESTROY_GROUP_ROLE'

const defaultState = ownProps => ({
  user: ownProps.session.user,
  group: ownProps.initialGroup,
  isJoiningOrLeaving: false,
  error: null
})

const actions = {
  requestJoinGroup: () => ({
    type: REQUEST_JOIN_GROUP
  }),
  successJoinGroup: ({ user, role }) => ({
    type: SUCCESS_JOIN_GROUP,
    payload: {
      user,
      role
    }
  }),
  failureJoinGroup: error => ({
    type: FAILURE_JOIN_GROUP,
    payload: error
  }),
  requestLeaveGroup: () => ({
    type: REQUEST_LEAVE_GROUP
  }),
  successLeaveGroup: ({ role }) => ({
    type: SUCCESS_LEAVE_GROUP,
    payload: {
      role
    }
  }),
  failureLeaveGroup: error => ({
    type: FAILURE_JOIN_GROUP,
    payload: error
  }),
  updateGroupRole: ({ role }) => ({
    type: UPDATE_GROUP_ROLE,
    payload: role
  }),
  destroyGroupRole: ({ role }) => ({
    type: DESTROY_GROUP_ROLE,
    payload: role
  })
}

const reducer = (state, action) => {
  switch (action.type) {
    case REQUEST_JOIN_GROUP:
      return {
        ...state,
        isJoiningOrLeaving: true
      }
    case SUCCESS_JOIN_GROUP: {
      const { role } = action.payload
      return {
        ...state,
        group: {
          ...state.group,
          roles: Object
            .values(state.group.roles.concat([role])
            .reduce((acc, role) => {
              acc[role._id] = role
              return acc
            }, {}))
        },
        isJoiningOrLeaving: false
      }
    }
    case FAILURE_JOIN_GROUP: {
      const error = action.payload
      return {
        ...state,
        error,
        isJoiningOrLeaving: false
      }
    }
    case REQUEST_LEAVE_GROUP:
      return {
        ...state,
        isJoiningOrLeaving: true
      }
    case SUCCESS_LEAVE_GROUP: {
      const { role } = action.payload
      return {
        ...state,
        group: {
          ...state.group,
          roles: state.group.roles.filter(aRole => aRole._id !== role._id)
        },
        isJoiningOrLeaving: false
      }
    }
    case FAILURE_LEAVE_GROUP: {
      const error = action.payload
      return {
        ...state,
        error,
        isJoiningOrLeaving: false
      }
    }
    case UPDATE_GROUP_ROLE: {
      const role = action.payload
      console.log(state.group.roles.concat([role]))
      return {
        ...state,
        group: {
          ...state.group,
          roles: Object
            .values(state.group.roles.concat([role])
            .reduce((acc, role) => {
              acc[role._id] = role
              return acc
            }, {}))
        }
      }
    }
    case DESTROY_GROUP_ROLE: {
      const role = action.payload
      return {
        ...state,
        group: {
          ...state.group,
          roles: state.group.roles.filter(aRole => aRole._id !== role._id)
        }
      }
    }
  }
  return state
}

const joinGroupSaga = function * () {
  while (true) {
    try {
      yield take(REQUEST_JOIN_GROUP)
      const group = yield select(state => state.group)
      const payload = yield call(api.groups.updateRole, group._id)
      yield put(actions.successJoinGroup(payload))
    } catch (error) {
      yield put(actions.failureJoinGroup(error))
    }
  }
}

const leaveGroupSaga = function * () {
  while (true) {
    try {
      yield take(REQUEST_LEAVE_GROUP)
      const group = yield select(state => state.group)
      const payload = yield call(api.groups.destroyRole, group._id)
      yield put(actions.successLeaveGroup(payload))
    } catch (error) {
      yield put(actions.failureLeaveGroup(error))
    }
  }
}

const saga = function * () {
  yield fork(joinGroupSaga)
  yield fork(leaveGroupSaga)
}

const GroupShowContainer = reduxlet({
  defaultState,
  reducer,
  actions,
  saga
})(GroupShow)

const mapGlobalStateToProps = state => ({
  session: state.session
})

const mapGlobalDispatchToProps = dispatch => ({
  globalActions: bindActionCreators(sessionActions, dispatch)
})

export default connect(
  mapGlobalStateToProps,
  mapGlobalDispatchToProps
)(GroupShowContainer)
