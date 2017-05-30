import React from 'react'
import DefaultLayout from '../../components/base/DefaultLayout'
import withBootstrap from '../../lib/hocs/withBootstrap'
import GroupAside from '../../components/group/GroupAside'
import IssueList from '../../components/group/IssueList'
import {
  monospacedFontFamily,
  grayColor
} from '../../lib/styles/variables'

class GroupPage extends React.Component {
  render () {
    const { bundle } = this.props
    const {
      group,
      issues
    } = bundle

    return (
      <DefaultLayout bundle={bundle}>
        <div className='row'>
          <div className='col-xs-12 col-sm-3 col-sm-offset-1 col-md-2 col-md-offset-2'>
            <GroupAside group={group} />
          </div>
          <div className='col-xs-12 col-sm-7 col-md-6'>
            <IssueList
              issues={issues}
              group={group}
            />
          </div>
        </div>
        <style jsx>{`
          h1{
            small {
              font-size: 0.5em;
            }
          }
          p.description {
            color: ${grayColor};
            font-family: ${monospacedFontFamily};
            font-size: 1em;
            padding: 0 10px;
          }
        `}</style>
      </DefaultLayout>
    )
  }
}

export default withBootstrap(GroupPage)
