import React from 'react'
import {
  Organization as OrganizationIcon,
  Github as GithubIcon
} from '../../shared/octicons'
import Spinner from '../../shared/Spinner'

const GroupAside = ({
  group,
  actions,
  isJoiningOrLeaving,
  user,
  globalActions
}) => {
  const isNotSignedIn = user == null
  const userRole = isNotSignedIn
    ? null
    : group.roles.find(role => role.user === user._id)
  const onSignInButtonClick = () => globalActions.requestSignIn('github')

  return (
    <div>
      <img src={group.photos[0].value} />
      <h1>{group.name}</h1>

      <h2>/g/{group.uniqueName}</h2>

      <p className='description'>{group.description}</p>

      <div>
        {isNotSignedIn
          ? <button className='primary' onClick={onSignInButtonClick}>
            <GithubIcon /> Sign in to Join
          </button>
          : userRole == null
          ? <button className='primary' onClick={actions.requestJoinGroup}>
            {isJoiningOrLeaving && <Spinner />} Join
          </button>
          : userRole.role === 'admin'
          // FIXME: add admin page
          ? <button className='primary' disabled>
            Go to admin page(on construction)
          </button>
          : <button className='danger' onClick={actions.requestLeaveGroup}>
            {isJoiningOrLeaving && <Spinner />} Leave
          </button>
        }
        <p><OrganizationIcon /> {group.roles.length}</p>
      </div>

      <style jsx>{`
        img {
          display: block;
          margin: 0 auto;
          width: 160px;
          border-radius: 15px;
        }
        div {
          text-align: center;
        }
      `}</style>
    </div>
  )
}

export default GroupAside
