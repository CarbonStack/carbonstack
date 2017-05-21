import React from 'react'
import DefaultLayout from '../components/base/DefaultLayout'
import withBootstrap from '../lib/hocs/withBootstrap'
import GroupList from '../components/home/GroupList'

class HomePage extends React.Component {
  render () {
    const { bundle } = this.props
    const { groups } = bundle

    return (
      <DefaultLayout>
        <GroupList groups={groups} />
      </DefaultLayout>
    )
  }
}

export default withBootstrap(HomePage)
