import React from 'react'
import DefaultLayout from '../components/layouts/DefaultLayout'
import styled from 'styled-components'
import Link from 'next/link'
import withRedux from '../lib/redux/withRedux'
import { connect } from 'react-redux'
import api from '../lib/api'

const Root = styled.div`
  .hidden {
    display: none;
  }
`

class New extends React.Component {
  static async getInitialProps (ctx) {
    const { query } = ctx
    const { rvs } = await api.rendezvous.index(ctx)

    return {
      query,
      rvs
    }
  }

  constructor (props) {
    super(props)

    const type = props.query.type === 'link'
      ? 'link'
      : 'note'

    this.state = {
      issue: {
        title: '',
        photos: '',
        content: '',
        rv: 'carbonstack',
        link: '',
        type
      }
    }
  }

  onLinkButtonClick () {
    this.setState({
      issue: Object.assign({}, this.state.issue, {
        type: 'link'
      })
    })
  }

  onNoteButtonClick () {
    this.setState({
      issue: {
        ...this.state.issue,
        type: 'note'
      }
    })
  }

  onIssueChange () {
    this.setState({
      issue: {
        ...this.state.issue,
        link: this.refs.link.value,
        title: this.refs.title.value,
        image: this.refs.image.value,
        content: this.refs.content.value,
        rv: this.refs.rv.value
      }
    })
  }

  render () {
    const { rvs, session } = this.props
    /**
     * FIXME: this should be done before fetching rvs
     *
     * I'm going to create a custom error handler to intercept error
     * If user have no session or got 401 status from fetching req,
     * we should halt instantiating the page component and return null with redirecting task.
     */
    if (session.user == null && typeof window !== 'undefined') {
      window.location.href = '/login'
      return null
    }

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
          <div className='type-select'>
            <label>Issue Type</label>

            <div className='control'>
              <button onClick={::this.onNoteButtonClick}>Note</button>
              <button onClick={::this.onLinkButtonClick}>Just a link</button>
            </div>

            <details className='description'>
              <summary>What are they?</summary>
              <dl>
                <dt>Note</dt>
                <dd>You can write markdown note directly. It would be the best choice if you don't have blog yet. Somewhen, we are going to provide a way to export your own notes to your github pages. :)</dd>
                <dt>Just a link</dt>
                <dd>If you want to share some resource not yours or already posted other place like your blog or medium, this type of issue would be best choice. This type of issue is just like a posting of hacker news and reddit.</dd>
              </dl>
            </details>
          </div>

          <div className={`form-section${issue.type === 'link' ? '' : ' hidden'}`}>
            <label htmlFor='link'>Link</label>
            <input
              id='link'
              ref='link'
              type='text'
              value={issue.link}
              onChange={::this.onIssueChange}
            />
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
            <label htmlFor='image'>Image</label>
            <input
              id='image'
              ref='image'
              type='file'
              disabled
            />
            <blockqutoe>Image is not supported yet</blockqutoe>
          </div>

          {issue.type === 'note' &&
            <div className='form-section'>
              <label htmlFor='content'>Content</label>
              <textarea
                id='content'
                ref='content'
                value={issue.content}
                onChange={::this.onIssueChange}
              />
            </div>
          }
          <div>
            <button>Cancel</button>
            <button>Submit</button>
          </div>
          <pre>{JSON.stringify(issue, null, 2)}</pre>
        </Root>
      </DefaultLayout>
    )
  }
}

export default withRedux(connect(x => x)(New))
