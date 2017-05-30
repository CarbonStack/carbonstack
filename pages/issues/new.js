import React from 'react'
import DefaultLayout from '../../components/base/DefaultLayout'
import withBootstrap from '../../lib/hocs/withBootstrap'
import NewIssueFormContainer from '../../components/newIssue/NewIssueFormContainer'

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
      </DefaultLayout>
    )
  }
}

export default withBootstrap(NewIssuePage)
