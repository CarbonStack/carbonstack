import React from 'react'
import DefaultLayout from '../components/layouts/DefaultLayout'
import styled from 'styled-components'

class Index extends React.Component {
  msg = 'yolo'

  onButtonClick () {
    console.log(this.msg)
  }
  onButtonClick2 () {
    this.msg += '!'
  }

  render () {
    return (
      <DefaultLayout title='Carbon Stack'>
        Welcome to Carbon Stack
        <button onClick={::this.onButtonClick}>Yolo</button>
        <button onClick={::this.onButtonClick2}>Bump</button>
      </DefaultLayout>
    )
  }
}

export default Index
