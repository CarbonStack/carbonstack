import React from 'react'
import DefaultLayout from '../components/base/DefaultLayout'
import NewGroupFormContainer from '../components/newGroup/NewGroupFormContainer'
import withBootstrap from '../lib/hocs/withBootstrap'

class NewGroupPage extends React.PureComponent {
  render () {
    return (
      <DefaultLayout>
        <NewGroupFormContainer />
      </DefaultLayout>
    )
  }
}

export default withBootstrap(NewGroupPage)
