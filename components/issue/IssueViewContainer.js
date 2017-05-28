import IssueView from './IssueView'
import reduxlet from 'reduxlet-saga'

const saga = function * () {

}

const IssueViewContainer = reduxlet({
  saga
})(IssueView)

export default IssueViewContainer
