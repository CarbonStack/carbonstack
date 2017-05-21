import React from 'react'
import DefaultLayout from '../components/base/DefaultLayout'
import withBootstrap from '../lib/hocs/withBootstrap'
import media from '../lib/styles/media'
import IssueList from '../components/rv/IssueList'
import {
  monospacedFontFamily,
  grayColor
} from '../lib/styles/variables'

class GroupPage extends React.Component {
  render () {
    const { bundle } = this.props
    const {
      group,
      issues
    } = bundle

    return (
      <DefaultLayout>
        <h1>{group.name} <small>/g/{group.uniqueName}</small></h1>
        <p className='description'>{group.description}</p>
        <IssueList
          issues={issues}
          group={group}
        />
        <style jsx>{`
          h1{
            small {
              font-size: 0.5em;
            }
          }
          ${media.small`
            width: 100%;
          `}
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
