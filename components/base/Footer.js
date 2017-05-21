import React from 'react'
import media, { largeBreakpoint } from '../../lib/styles/media'

class Footer extends React.PureComponent {
  render () {
    return <footer>
      <p>
        Copyright 2017 Junyoung Choi.&nbsp;<a href='https://github.com/CarbonStack/carbonstack' target='_blank'>Source code of Carbonstack</a>&nbsp;is published under MIT.
      </p>
      <style jsx>{`
        footer {
          height: 60px;
          display: flex;
          width: 100%;
          max-width: ${largeBreakpoint}em;
          margin: 0 auto;
          text-align: center;
        }
        p {
          width: 80%;
          margin: 0 auto;
          padding: 0 15px;
          line-height: 60px;
          ${media.small`
            width: 100%;
          `}
        }
      `}</style>
    </footer>
  }
}

export default Footer
