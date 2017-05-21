import NewGroupForm from './NewGroupForm'
import reduxlet from 'reduxlet-saga'
import { take, put, call, select, fork } from 'redux-saga/effects'
import api from '../../lib/api'
import Router from 'next/router'

const UPDATE_FORM = 'UPDATE_FORM'

const REQUEST_CREATE_GROUP = 'REQUEST_CREATE_GROUP'
const FAILURE_CREATE_GROUP = 'FAILURE_CREATE_GROUP'

const REQUEST_UPLOAD_FILE = 'REQUEST_UPLOAD_FILE'
const SUCCESS_UPLOAD_FILE = 'SUCCESS_UPLOAD_FILE'
const FAILURE_UPLOAD_FILE = 'FAILURE_UPLOAD_FILE'

const actions = {
  updateForm: form => ({
    type: UPDATE_FORM,
    payload: form
  }),
  requestCreateGroup: () => ({
    type: REQUEST_CREATE_GROUP
  }),
  failureCreateGroup: error => ({
    type: FAILURE_CREATE_GROUP,
    payload: error
  }),
  requestUploadFile: file => ({
    type: REQUEST_UPLOAD_FILE,
    payload: file
  }),
  successUploadFile: payload => ({
    type: SUCCESS_UPLOAD_FILE,
    payload
  }),
  failureUploadFile: error => ({
    type: FAILURE_UPLOAD_FILE,
    payload: error
  })
}

const defaultState = {
  form: {
    name: '',
    uniqueName: '',
    description: '',
    language: 'en',
    profileImage: ''
  },
  uploadError: null,
  isUploading: false,
  isSubmitting: false,
  error: null
}

const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_FORM:
      return {
        ...state,
        form: {
          ...state.form,
          ...action.payload
        }
      }
    case REQUEST_CREATE_GROUP:
      return {
        ...state,
        isSubmitting: true
      }
    case FAILURE_CREATE_GROUP:
      return {
        ...state,
        error: action.payload,
        isSubmitting: false
      }
    case REQUEST_UPLOAD_FILE:
      return {
        ...state,
        isUploading: true
      }
    case SUCCESS_UPLOAD_FILE:
      return {
        ...state,
        isUploading: false,
        form: {
          ...state.form,
          profileImage: action.payload
        }
      }
    case FAILURE_UPLOAD_FILE:
      return {
        ...state,
        isUploading: false,
        uploadError: action.payload
      }
  }
  return state
}

const createGroupSaga = function * () {
  while (true) {
    yield take(REQUEST_CREATE_GROUP)
    try {
      const body = yield select(state => state.form)
      const { group } = yield call(api.groups.create, body)
      Router.replace({
        pathname: '/group',
        query: {
          groupUniqueName: group.uniqueName
        }
      }, `/g/${group.uniqueName}`)
    } catch (error) {
      yield put(actions.failureCreateGroup(error))
    }
  }
}

const uploadSaga = function * () {
  while (true) {
    const action = yield take(REQUEST_UPLOAD_FILE)
    try {
      const { tempPath } = yield call(api.files.uploadProfileImage, action.payload)
      yield put(actions.successUploadFile(tempPath))
    } catch (error) {
      yield put(actions.failureUploadFile(error))
    }
  }
}

const saga = function * () {
  yield fork(createGroupSaga)
  yield fork(uploadSaga)
}

const NewGroupFormContainer = reduxlet({
  actions,
  defaultState,
  reducer,
  saga
})(NewGroupForm)

export default NewGroupFormContainer
