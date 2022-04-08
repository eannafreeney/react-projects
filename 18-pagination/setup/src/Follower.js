import React from 'react'

const Follower = ({ avatar_url:avatar, html_url:html, login:username }) => {
  return (
  <article className="card">
    <img src={avatar} alt={username} />
    <h4>{username}</h4>
    <a href={html} className="btn">view profile</a>
  </article>
)}

export default Follower
