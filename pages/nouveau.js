import React from 'react'
import DefaultLayout from '../components/layouts/DefaultLayout'
import styled from 'styled-components'
import Link from 'next/link'
import { connect } from 'react-redux'
import api from '../lib/api'
import withBootstrap from '../lib/hocs/withBootstrap'
import { bindActionCreators } from 'redux'
import actions, {
  IDLE,
  WORKING,
  DONE,
  ERROR
} from '../lib/redux/modules/nouveau/actions'

const Root = styled.div`
  .hidden {
    display: none;
  }
`

class Nouveau extends React.Component {
  static async getInitialProps (ctx) {
    const { query } = ctx
    const { rvs } = await api.pages.nouveau(ctx)
    return {
      query,
      rvs
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      issue: {
        title: '',
        photos: '',
        content: '',
        rv: 'carbonstack',
        link: ''
      }
    }
  }

  onIssueChange () {
    this.setState({
      issue: {
        ...this.state.issue,
        title: this.refs.title.value,
        image: this.refs.image.value,
        content: this.refs.content.value,
        rv: this.refs.rv.value
      }
    })
  }

  onSubmitButtonClick () {
    const { actions } = this.props
    const { issue } = this.state

    actions.requestCreateIssue(issue)
  }

  render () {
    const { rvs, nouveau } = this.props
    const { issue } = this.state

    return (
      <DefaultLayout title='New issue - Carbon Stack'>
        <Root>

          <h1>New issue</h1>
          <div>
            <label htmlFor='rv'>Rendezvous point</label>
            <select
              id='rv'
              ref='rv'
              value={issue.rv}
              onChange={::this.onIssueChange}
            >
              {rvs.map(rv => {
                return <option
                  key={rv._id}
                  value={rv._id}
                >
                  {rv.name}
                </option>
              })}
            </select>
          </div>

          <div className='form-section'>
            <label htmlFor='title'>Title</label>
            <input
              id='title'
              ref='title'
              type='text'
              value={issue.title}
              onChange={::this.onIssueChange}
            />
          </div>

          <div className='form-section'>
            <label htmlFor='image'>Cover Image</label>
            <input
              id='image'
              ref='image'
              type='file'
              disabled
            />
            <blockqutoe>Image is not supported yet</blockqutoe>
          </div>

          <div className='form-section'>
            <label htmlFor='content'>Content</label>
            <textarea
              id='content'
              ref='content'
              value={issue.content}
              onChange={::this.onIssueChange}
            />
          </div>

          <div>
            <button>Cancel</button>
            {nouveau.status === WORKING
              ? <button
                disabled
              >Submitting...</button>
              : nouveau.status === ERROR
              ? <button>Error</button>
              : <button
                onClick={::this.onSubmitButtonClick}
              >Submit</button>
            }

          </div>
          <pre>{JSON.stringify(issue, null, 2)}</pre>
        </Root>
      </DefaultLayout>
    )
  }
}

const mapStateToProps = ({nouveau}) => {
  return {
    nouveau
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default withBootstrap(connect(mapStateToProps, mapDispatchToProps)(Nouveau))
