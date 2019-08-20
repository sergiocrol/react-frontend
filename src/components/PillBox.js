import React from 'react'

const PillBox = (props) => {
  const user = props.user;
  return (
    <div className="pill-box-container">
      <h1>{user.name}</h1> <p>from {user.fromLanguage} to {user.toLanguage}</p>
      <p>{user.description}</p>
      <p>level: {user.difficulty}</p>
      <p>{user.topics}</p>
    </div>
  )
}

export default PillBox

