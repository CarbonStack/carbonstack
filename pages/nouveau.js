import React from 'react'
import DefaultLayout from '../components/layouts/DefaultLayout'
import styled from 'styled-components'
import Link from 'next/link'
import { connect } from 'react-redux'
import api from '../lib/api'
import Head from 'next/head'
import withBootstrap from '../lib/hocs/withBootstrap'
import { bindActionCreators } from 'redux'
import actions, {
  IDLE,
  WORKING,
  DONE,
  ERROR
} from '../lib/redux/modules/nouveau/actions'
import media from '../lib/styles/media'
import { monospacedFontFamily } from '../lib/styles/variables'
import MarkdownEditor from '../components/shared/MarkdownEditor'

const Root = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 0 15px;
  ${media.small`
    width: 100%;
  `}
  &>.rvSelect {
    margin-bottom: 0.5em;
    select {
      vertial-align: middle;
      font-size: 1.2em;
      padding: 10px 20px;
    }
  }
  &>.title {
    display: flex;
  }
  &>.title .title-input {
    font-size: 2em;
    font-family: ${monospacedFontFamily};
    flex: 1;
    min-width: 0;
  }
  &>.control {
    margin: 0.25em 0;
    text-align: right;
    button {
      margin-left: 5px;
      padding: 10px 25px;
    }
  }
`

class Nouveau extends React.Component {
  static async getInitialProps (ctx) {
    const { rvs } = await api.pages.nouveau(ctx)
    return {
      rvs
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      issue: {
        title: '',
        content: '',
        rv: 'carbonstack'
      }
    }
  }

  componentDidMount () {
    this.refs.title.focus()
  }

  onIssueChange () {
    this.setState({
      issue: {
        ...this.state.issue,
        title: this.refs.title.value,
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
          <div className='rvSelect'>
            <label htmlFor='rv'>To </label>
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
            <label htmlFor='rv'> rendezvous point</label>
          </div>

          <div className='title'>
            <input
              className='title-input'
              ref='title'
              type='text'
              value={issue.title}
              placeholder={'What\'s up?'}
              onChange={::this.onIssueChange}
            />
          </div>

          <div className='form-section'>
            <MarkdownEditor
              ref='content'
              value={issue.content}
              placeholder='Describe the issue...'
              onChange={::this.onIssueChange}
            />
          </div>

          <div className='control'>
            <button>Cancel</button>
            {nouveau.status === WORKING
              ? <button
                disabled
              >Submitting...</button>
              : nouveau.status === ERROR
              ? <button>Error</button>
              : <button className='primary'
                onClick={::this.onSubmitButtonClick}
              >Submit</button>
            }
          </div>
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
