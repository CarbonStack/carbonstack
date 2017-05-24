import React from 'react'

class Footer extends React.PureComponent {
  render () {
    return <footer className='container'>
      <p>
        Copyright 2017 Junyoung Choi.&nbsp;<a href='https://github.com/CarbonStack/carbonstack' target='_blank'>Source code of Carbonstack</a>&nbsp;is published under MIT.
      </p>
      <style jsx>{`
        footer {
          height: 60px;
        }
        p {
          text-align: center;
          margin: 0 auto;
          padding: 0 20px;
          line-height: 60px;
        }
      `}</style>
    </footer>
  }
}

export default Footer
