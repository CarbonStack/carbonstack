import React from 'react'
import GroupItem from './GroupItem'
import { Search } from '../shared/octicons'
import Link from 'next/link'
import {
  placeholderColor
} from '../../lib/styles/variables'

class GroupList extends React.PureComponent {
  constructor () {
    super()

    this.state = {
      search: ''
    }
  }

  onSearchChange = e => {
    this.setState({
      search: e.target.value
    })
  }

  filterBySearch (groups) {
    const { search } = this.state
    if (search.trim().length === 0) {
      return groups
    }
    return groups
      .filter(group => group.name.match(search) || group.uniqueName.match(search))
  }

  render () {
    const { groups } = this.props
    const filteredGroups = this.filterBySearch(groups)
    return (
      <div>

        <div className='search'>

          <input
            type='text'
            placeholder='Search some groups...'
            onChange={this.onSearchChange}
          />
          <button>
            <Search className='svg' />
          </button>

        </div>

        <div className='newGroup'>
          <Link href='/new-group'><a>Or, create a new group</a></Link>
        </div>

        <ul className='groupList'>
          {filteredGroups
            .map(group => <GroupItem key={group._id} group={group} />)
          }
          {filteredGroups.length === 0 &&
            <li className='empty'>No result found.</li>
          }
        </ul>

        <style jsx>{`
          .search {
            margin: 0 auto;
            padding: 25px 0 15px;
            text-align: center;
          }
          input[type=text] {
            font-size: 1.5em;
            text-align: center;
          }
          .newGroup {
            text-align: center;
          }
          .groupList {
            list-style: none;
            padding: 0;
            max-width: 480px;
            margin: 25px auto;
          }
          .empty {
            text-align: center;
            color: ${placeholderColor};
          }
        `}</style>
      </div>
    )
  }
}

export default GroupList
