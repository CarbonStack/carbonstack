import React from 'react'
import LanguageEmoji from '../shared/LanguageEmoji'
import Link from 'next/link'
import {
  border,
  placeholderColor
} from '../../lib/styles/variables'
import { Organization as OrganizationIcon } from '../shared/octicons'

const GroupItem = ({ group }) => (
  <li>

    <div className='left'>
      <img
        className='profileImage'
        src={group.photos != null && group.photos[0] != null
          ? group.photos[0].value
          : null
        }
      />
    </div>

    <div className='center'>
      <h3>
        <Link href={`/groups/show?groupUniqueName=${group.uniqueName}`} as={`/g/${group.uniqueName}`}>
          <a>
            {group.name} <small>/g/{group.uniqueName}</small>
          </a>
        </Link>&nbsp;
        <LanguageEmoji lang={group.language} />
      </h3>

      <p className='description'>
        {group.description == null || group.description.trim().length === 0
          ? <span className='empty'>No description</span>
          : group.description
        }
      </p>
    </div>
    <div className='right'>
      <span className='meta'>
        <span className='members'><OrganizationIcon /> {group.roles.length}</span>
      </span>
    </div>

    <style jsx>{`
      li {
        border-bottom: ${border};
        display: flex;
        height: 50px;
      }
      li:last-child{
        border-bottom: none;
      }
      .left {
        width: 50px;
        line-height: 50px;
      }
      .center {
        flex: 1;
      }
      .right {
        width: 50px;
        line-height: 50px;
      }
      .profileImage {
        width: 30px;
        height: 30px;
        vertical-align: middle;
        margin: 0 10px;
        border-radius: 6px;
      }
      h3 {
        margin: 0;
        height: 30px;
        line-height: 30px;
      }
      h3 small {
        font-size: 0.6em;
      }
      .meta {
        color: ${placeholderColor};
        font-size: 0.9em;
      }
      .meta .members {
        margin: 0 4px;
      }
      p.description {
        margin: 0;
        height: 20px;
        line-height: 14px;
      }
      p.description .empty {
        color: ${placeholderColor};
      }
    `}</style>
  </li>
)

export default GroupItem
