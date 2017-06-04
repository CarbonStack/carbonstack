import React from 'react'

class Footer extends React.PureComponent {
  render () {
    return <footer className='container row'>
      <p className='col-xs-12'>
        Copyright 2017 Junyoung Choi.&nbsp;<a href='https://github.com/CarbonStack/carbonstack' target='_blank'>Source code of Carbonstack</a>&nbsp;is published under MIT.
      </p>
      <style jsx>{`
        p {
          text-align: center;
          margin: 0 auto;
          line-height: 60px;
        }
      `}</style>
    </footer>
  }
}

export default Footer
