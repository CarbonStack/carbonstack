const appName = 'carbonstack'
const moduleName = 'nouveau'

export const RESET_PAGE = `${appName}/${moduleName}/RESET_PAGE`

export const REQUEST_CREATE_ISSUE = `${appName}/${moduleName}/REQUEST_CREATE_ISSUE`
export const SUCCESS_CREATE_ISSUE = `${appName}/${moduleName}/SUCCESS_CREATE_ISSUE`
export const FAILURE_CREATE_ISSUE = `${appName}/${moduleName}/FAILURE_CREATE_ISSUE`

export const IDLE = `${appName}/${moduleName}/IDLE`
export const WORKING = `${appName}/${moduleName}/WORKING`
export const DONE = `${appName}/${moduleName}/DONE`
export const ERROR = `${appName}/${moduleName}/ERROR`

function resetPage () {
  return {
    type: RESET_PAGE
  }
}

function requestCreateIssue (data, rvUniqueName) {
  return {
    type: REQUEST_CREATE_ISSUE,
    payload: {
      data,
      rvUniqueName
    }
  }
}

function successCreateIssue () {
  return {
    type: SUCCESS_CREATE_ISSUE
  }
}

function failureCreateIssue (error) {
  return {
    type: FAILURE_CREATE_ISSUE,
    payload: error
  }
}

export default {
  resetPage,
  requestCreateIssue,
  successCreateIssue,
  failureCreateIssue
}
