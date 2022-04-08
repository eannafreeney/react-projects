import React from 'react';
// (props) = { people: [{}, {}, {}] }

const List = ({ people }) => {

const calculateAge = (birthday) => {
  var today = new Date();
  var birthDate = new Date(birthday);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
  {
      age--;
  }
  return age;
}

  const addZero = (month) => {
    if(month < 10){
      return month = `0${month}`
    }
  }

  let date = new Date();
  let m = addZero(date.getMonth() + 1);	// Month	[mm]	(1 - 12)
  let d = date.getDate();
  const today = `${m}-${d}`;


  return (

    people.map((person)=>{
      const {id, image, name, dob} = person;
      const currentDate = dob.slice(5)

      return (
      <article key={id} className="person">
        <img src={image} alt={name}></img>
        <div>
          <h4>{name}</h4>
          <p>{calculateAge(dob)} years old</p>
          {
            today === currentDate ? <p>
            🎂 </p> : null
          }
        </div>
      </article>
      )
    })
  )
};

export default List;

