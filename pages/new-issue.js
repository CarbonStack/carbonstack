import React from 'react'
import DefaultLayout from '../components/base/DefaultLayout'
import withBootstrap from '../lib/hocs/withBootstrap'
import NewIssueFormContainer from '../components/newIssue/NewIssueFormContainer'
<<<<<<< HEAD

class NewIssuePage extends React.PureComponent {
  render () {
    const { group } = this.props.bundle

    return (
      <DefaultLayout title='New issue - Carbon Stack'>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12 col-sm-offset-1 col-sm-10 col-md-offset-2 col-md-8'>
              <NewIssueFormContainer group={group} />
            </div>
          </div>
        </div>
=======
// import actions, {
//   WORKING,
//   ERROR,
//   DONE
// } from '../lib/redux/modules/nouveau/actions'

class NewIssuePage extends React.Component {
  componentDidMount () {
    const { actions } = this.props

    actions.resetPage()
    this.refs.title.focus()
  }

  onIssueChange = () => {
    this.setState({
      issue: {
        ...this.state.issue,
        title: this.refs.title.value,
        content: this.refs.content.value
      }
    })
  }

  render () {
    const { group } = this.props

    return (
      <DefaultLayout title='New issue - Carbon Stack'>
        <NewIssueFormContainer group={group} />
>>>>>>> 853951d2845c3ee1c06659e1061ef7ec5091a784
      </DefaultLayout>
    )
  }
}

<<<<<<< HEAD
export default withBootstrap(NewIssuePage)
=======
export default withBootstrap(NewIssuePage, true)
>>>>>>> 853951d2845c3ee1c06659e1061ef7ec5091a784
