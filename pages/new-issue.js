import React from 'react'
import DefaultLayout from '../components/base/DefaultLayout'
import withBootstrap from '../lib/hocs/withBootstrap'
import NewIssueFormContainer from '../components/newIssue/NewIssueFormContainer'
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
      </DefaultLayout>
    )
  }
}

export default withBootstrap(NewIssuePage, true)
