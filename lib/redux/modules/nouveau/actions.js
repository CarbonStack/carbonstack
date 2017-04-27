const appName = 'carbonstack'
const moduleName = 'nouveau'

export const REQUEST_CREATE_ISSUE = `${appName}/${moduleName}/REQUEST_CREATE_ISSUE`
export const SUCCESS_CREATE_ISSUE = `${appName}/${moduleName}/SUCCESS_CREATE_ISSUE`
export const FAILURE_CREATE_ISSUE = `${appName}/${moduleName}/FAILURE_CREATE_ISSUE`

export const IDLE = `${appName}/${moduleName}/IDLE`
export const WORKING = `${appName}/${moduleName}/WORKING`
export const DONE = `${appName}/${moduleName}/DONE`
export const ERROR = `${appName}/${moduleName}/ERROR`

function requestCreateIssue (data) {
  return {
    type: REQUEST_CREATE_ISSUE,
    payload: data
  }
}

function successCreateIssue () {
  return {
    type: SUCCESS_CREATE_ISSUE
  }
}

function failureCreateIssue () {
  return {
    type: FAILURE_CREATE_ISSUE
  }
}

export default {
  requestCreateIssue,
  successCreateIssue,
  failureCreateIssue
}
