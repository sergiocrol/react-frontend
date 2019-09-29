import React from 'react'

const PillBox = (props) => {
  const user = props.user;

  const level = () => {
    const level = user.difficulty;
    const res = [];
    for (let i = 1; i <= 5; i++) {
      i <= level ? res.push(<label key={i} htmlFor="5">•</label>) : res.push(<label key={i} htmlFor="5">◦</label>);
    }
    return res;
  }

  const rate = () => {
    const rate = (user.rate / user.reviewers).toFixed(1);
    if (rate == 0) { return 1 }
    return rate.toString().split('.')[1] === '0' ? rate.toString().split('.')[0] : rate;
  }

  return (
    <div className="pill-box-container">
      <div className="pill-box-container-title"><span className="title-span">{user.name}</span> <div>{user.fromLanguage} <span>&#8651;</span> {user.toLanguage}</div></div>
      <p className="pill-box-container-description">{user.description}</p>
      <p className="pill-box-container-level"><span className="l">level: {level()}</span> {user.rate !== undefined ? <span className="rate-box">{rate()}</span> : null}</p>
    </div>
  )
}

export default PillBox

