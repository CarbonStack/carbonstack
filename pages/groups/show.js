import React from 'react'
import DefaultLayout from '../../components/base/DefaultLayout'
import withBootstrap from '../../lib/hocs/withBootstrap'
import GroupShowContainer from '../../components/groups/show/GroupShowContainer'

class GroupShowPage extends React.Component {
  render () {
    const { bundle } = this.props

    return (
      <DefaultLayout bundle={bundle}>
        <GroupShowContainer
          initialGroup={bundle.group}
          issues={bundle.issues}
        />
      </DefaultLayout>
    )
  }
}

export default withBootstrap(GroupShowPage)
