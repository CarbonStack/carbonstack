import React from 'react'
import { connect } from 'react-redux'
import DefaultLayout from '../components/base/DefaultLayout'
import withBootstrap from '../lib/hocs/withBootstrap'

import CommentListContainer from '../components/issue/CommentListContainer'
import IssueViewContainer from '../components/issue/IssueViewContainer'

class IssuePage extends React.Component {
  render () {
    const {
      route,
      session
    } = this.props
    const {
      issue,
      comments
    } = this.props.bundle

    return (
      <DefaultLayout>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12 col-sm-offset-1 col-sm-10 col-md-offset-2 col-md-8'>

              <IssueViewContainer
                route={route}
                session={session}
                issue={issue}
              />

              <hr />

              <CommentListContainer
                user={session.user}
                issue={issue}
                initialComments={comments}
              />

            </div>
          </div>
        </div>
      </DefaultLayout>
    )
  }
}

const mapStateToProps = state => ({
  route: state.route,
  session: state.session
})

export default withBootstrap(connect(mapStateToProps)(IssuePage))
