import React from 'react'
import GroupAside from './GroupAside'
import IssueList from './IssueList'

const GroupShow = ({
  group,
  issues,
  isJoiningOrLeaving,
  actions,
  globalActions,
  user
}) => {
  return (
    <div>
      <div className='row'>
        <div className='col-xs-12 col-sm-3 col-sm-offset-1 col-md-2 col-md-offset-2'>
          <GroupAside
            group={group}
            user={user}
            actions={actions}
            isJoiningOrLeaving={isJoiningOrLeaving}
            globalActions={globalActions}
          />
        </div>
        <div className='col-xs-12 col-sm-7 col-md-6'>
          <IssueList
            issues={issues}
            group={group}
          />
        </div>
      </div>
    </div>
  )
}

export default GroupShow
