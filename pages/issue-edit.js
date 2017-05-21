import React from 'react'
import DefaultLayout from '../components/layouts/DefaultLayout'
import styled from 'styled-components'
import { connect } from 'react-redux'
import api from '../lib/api'
import withBootstrap from '../lib/hocs/withBootstrap'
import { bindActionCreators } from 'redux'
import actions, {
  WORKING,
  ERROR,
  DONE
} from '../lib/redux/modules/nouveau/actions'
import media from '../lib/styles/media'
import {
  monospacedFontFamily,
  errorColor
} from '../lib/styles/variables'
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
    label {
      font-family: ${monospacedFontFamily};
    }
    select {
      vertial-align: middle;
      font-size: 1.2em;
      padding: 10px 20px;
      width: 175px;
      height: 30px;
      margin-left: 5px;
      font-family: ${monospacedFontFamily};
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
    border-radius: 0;
    border-width: 0 0 1px;
  }
  &>.content {
    .CodeMirror {
      height: 450px;
    }
  }
  &>.control {
    margin: 0.25em 0;
    text-align: right;
    .error {
      color: ${errorColor};
    }
    button {
      margin-left: 5px;
      padding: 0 15px;
      font-family: ${monospacedFontFamily};
      height: 35px;
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
        rv: getRvIdByUniqueName(props.rvs, 'carbonstack')
      }
    }
  }

  componentDidMount () {
    const { actions } = this.props

    actions.resetPage()
    this.refs.title.focus()
  }

  componentWillReceiveProps (nextProps) {
    const { route, rvs } = nextProps
    const previousRoute = this.props.route
    if (previousRoute.query !== route.query && route.query.rv != null) {
      const rvId = getRvIdByUniqueName(rvs, route.query.rv)
      this.setState({
        issue: {
          ...this.state.issue,
          rv: rvId
        }
      })
    }
  }

  onIssueChange = () => {
    this.setState({
      issue: {
        ...this.state.issue,
        title: this.refs.title.value,
        content: this.refs.content.value,
        rv: this.refs.rv.value
      }
    })
  }

  onBackButtonClick = () => {
    window.history.back()
  }

  onSubmitButtonClick = () => {
    const { actions, rvs } = this.props
    const { issue } = this.state

    const rvUniqueName = getRvUniqueNameById(rvs, issue.rv)
    actions.requestCreateIssue(issue, rvUniqueName)
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
              onChange={this.onIssueChange}
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

          <div className='title'>
            <input
              className='title-input'
              ref='title'
              type='text'
              value={issue.title}
              placeholder={'What\'s up? (title)'}
              onChange={this.onIssueChange}
            />
          </div>

          <div className='content'>
            <MarkdownEditor
              ref='content'
              value={issue.content}
              placeholder='Describe the issue! (content)'
              onChange={this.onIssueChange}
            />
          </div>

          <div className='control'>
            <span className='error'>
              {nouveau.error != null && nouveau.error.data.message}
            </span>
            <button
              onClick={this.onBackButtonClick}
            >Cancel</button>
            <button
              className='primary'
              disabled={nouveau.status === WORKING || nouveau.status === DONE}
              onClick={this.onSubmitButtonClick}
            >
              {nouveau.status === WORKING
                ? 'Submitting...'
                : nouveau.status === ERROR
                ? 'Retry'
                : 'Submit'
              }
            </button>
          </div>
        </Root>
      </DefaultLayout>
    )
  }
}

const mapStateToProps = ({ nouveau, route }) => {
  return {
    nouveau,
    route
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default withBootstrap(connect(mapStateToProps, mapDispatchToProps)(Nouveau))

function getRvUniqueNameById (rvs, rvId) {
  for (let rv of rvs) {
    if (rv._id === rvId) {
      return rv.uniqueName
    }
  }
  return null
}

function getRvIdByUniqueName (rvs, rvUniqueName) {
  for (let rv of rvs) {
    if (rv.uniqueName === rvUniqueName) {
      return rv._id
    }
  }
  return null
}
