import React, { useState } from 'react';

const Tour = ({ id, image, name, price, info, handleDelete }) => {

  const [readMore, setReadMore] = useState(true);
  const showAllText = info.length < 100 || !readMore;

  return (
    <article key={id} className="single-tour">
      <img src={image} alt={name} />
      <footer>
        <div className="tour-info">
          <h4>{name}</h4>
          <h4 className="tour-price">€{price}</h4>
        </div>
        <p>
          {showAllText ? info : info.slice(0, 100)}
          {info.length > 100 && (
            <button onClick={() => setReadMore(!readMore)}>
            {readMore ? "read more..." : "show less"}
            </button>
          )}
        </p>
        <button className="delete-btn" onClick={() => handleDelete(id)}>Not Interested</button>
      </footer>
    </article>
  )

};

export default Tour;
