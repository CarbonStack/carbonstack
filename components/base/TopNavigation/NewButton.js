import React from 'react'
import Link from 'next/link'

const NewButton = ({ route }) => (
  <div>
    <Link><a>New Post</a></Link>
    <style jsx>{`
      div {
        height: 50px;
        line-height: 50px;
      }
    `}</style>
  </div>
)

export default NewButton
