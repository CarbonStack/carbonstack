const appName = 'carbonstack'
const moduleName = 'route'

export const CHANGE_ROUTE = `${appName}/${moduleName}/CHANGE_ROUTE`

function changeRoute (url) {
  return {
    type: CHANGE_ROUTE,
    payload: url
  }
}

export default {
  changeRoute
}
