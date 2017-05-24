import React from 'react'

const GroupAside = ({ group }) => (
  <div>
    <img src={group.photos[0].value} />
    <h1>{group.name}</h1>
    <h2>/g/{group.uniqueName}</h2>
    <p className='description'>{group.description}</p>
    <style jsx>{`
      img {
        display: block;
        margin: 0 auto;
        width: 160px;
        border-radius: 15px;
      }
      div {
        text-align: center;
      }
    `}</style>
  </div>
)

export default GroupAside
