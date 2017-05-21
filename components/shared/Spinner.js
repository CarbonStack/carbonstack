import React from 'react'

const Spinner = ({  }) => (
  <span>
    <style jsx>{`
      span {
        width: 1em;
        display: inline-block;
        height: 1em;
        box-sizing: border-box;

        border: solid 2px transparent;
        border-top-color: #29d;
        border-left-color: #29d;
        border-radius: 50%;

        -webkit-animation: nprogress-spinner 400ms linear infinite;
                animation: nprogress-spinner 400ms linear infinite;
      }

      @keyframes nprogress-spinner {
        0%   { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

    `}</style>
  </span>
)

export default Spinner
