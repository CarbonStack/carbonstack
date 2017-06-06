import React from 'react'

class Footer extends React.PureComponent {
  render () {
    return <footer>
      <p>
        Copyright 2017 Junyoung Choi.&nbsp;<a href='https://github.com/CarbonStack/carbonstack' target='_blank'>Source code of Carbonstack</a>&nbsp;is published under MIT.
      </p>
      <style jsx>{`
        p {
          text-align: center;
          padding: 15px 0;
        }
      `}</style>
    </footer>
  }
}

export default Footer
