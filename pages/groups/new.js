import React from 'react'
import DefaultLayout from '../../components/base/DefaultLayout'
import NewGroupFormContainer from '../../components/groups/new/NewGroupFormContainer'
import withBootstrap from '../../lib/hocs/withBootstrap'

class NewGroupPage extends React.PureComponent {
  render () {
    return (
      <DefaultLayout>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12 col-sm-offset-2 col-sm-8 col-md-offset-3 col-md-6'>
              <NewGroupFormContainer />
            </div>
          </div>
        </div>
      </DefaultLayout>
    )
  }
}

export default withBootstrap(NewGroupPage)
