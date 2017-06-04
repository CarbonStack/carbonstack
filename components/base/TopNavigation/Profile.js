import React from 'react'
import { ChevronDown } from '../../shared/octicons'
import SignOutButton from './SignOutButton'
import {
  border
} from '../../../lib/styles/variables'

class Profile extends React.PureComponent {
  state = {
    isPopupOpen: false
  }

  onToggleButtonClick = () => {
    this.setState({
      isPopupOpen: !this.state.isPopupOpen
    }, () => {
      this.state.isPopupOpen && this.popup.focus()
    })
  }

  onPopupBlur = e => {
    let el = e.relatedTarget
    while (el != null) {
      if (el === this.popup || el === this.toggleButton) {
        return
      }
      el = el.parentNode
    }
    this.setState({
      isPopupOpen: false
    })
  }

  render () {
    const { user, onSignOutButtonClick } = this.props
    const photoURL = user.photos[0].value
    const { isPopupOpen } = this.state

    return (
      <div className='root'>

        <button
          className='toggleButton'
          ref={toggleButton => (this.toggleButton = toggleButton)}
          onClick={this.onToggleButtonClick}
        >
          <img width='30' height='30' src={photoURL} />
          <ChevronDown />
        </button>

        {isPopupOpen &&
          <div
            className='popup'
            ref={popup => (this.popup = popup)}
            tabIndex='-1'
            onBlur={this.onPopupBlur}
          >
            <SignOutButton onClick={onSignOutButtonClick} />
          </div>
        }

        <style jsx>{`
          div.root {
            height: 50px;
            line-height: 50px;
            position: relative;
          }
          img {
            vertical-align: middle;
            height: 30px;
            width: 30px;
            border-radius: 6px;
          }
          .toggleButton {
            height: 50px;
            padding: 0 10px;
          }
          div.popup {
            position: absolute;
            top: 35px;
            right: 5px;
            background-color: white;
            border: ${border};
            border-radius: 4px;
            width: 120px;
            outline: none;
          }
        `}</style>
      </div>
    )
  }
}

export default Profile
