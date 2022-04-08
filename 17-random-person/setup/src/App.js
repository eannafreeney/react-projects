import React, { useState, useEffect } from 'react'
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa'

const url = 'https://randomuser.me/api/'
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg'

function App() {

  // State variables for what we need
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState(null);
  const [title, setTitle] = useState('name');
  const [value, setValue] = useState('random person')

  // fetch person from url
  const getPerson = async () => {
    const res = await fetch(url);
    const data = await res.json();
    // person is first result in array always
    const person = data.results[0];

    // Destructuring from nested api
    const { phone, email } = person;
    const { large: image } = person.picture;
    const { login:{password} } = person;
    const { first, last } = person.name;
    const { dob:{age}} = person;
    const { street:{number, name}} = person.location;

    // Create new object and assign values from destructuring
    const newPerson ={
      image,
      phone,
      email,
      password,
      age,
      street: `${number} ${name}`,
      name: `${first} ${last}`
    }

    // set state to result
    setPerson(newPerson);
    // turn off loading
    setLoading(false);
    // set title back to name
    setTitle('name');
    // set value to newPerson.tom etc
    setValue(newPerson.name)
  }

  useEffect(()=> {
    getPerson()
  }, [])

  const handleValue = (e) => {
    // Does what we are targeting contain the class 'icon'?
    if(e.target.classList.contains('icon')){
      // if yes, get the label, put in newValue variable
      const newValue = e.target.dataset.label;
      // Set the title to that variable, re-render
      setTitle(newValue)
      //Set the value to be person[name/email/etc]
      setValue(person[newValue])
    }
  }

  return (
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="container">
          <img
            src={(person && person.image) || defaultImage}
            alt="random user" className='user-img' />
          <p className="user-title">my {title} is</p>
          <p className="user-value">{value}</p>
          <div className="values-list">
            <button className="icon" data-label="name" onMouseOver={handleValue}><FaUser/></button>
            <button className="icon" data-label="email" onMouseOver={handleValue}><FaEnvelopeOpen/></button>
            <button className="icon" data-label="age" onMouseOver={handleValue}><FaCalendarTimes/></button>
            <button className="icon" data-label="street" onMouseOver={handleValue}><FaMap/></button>
            <button className="icon" data-label="phone" onMouseOver={handleValue}><FaPhone/></button>
            <button className="icon" data-label="password" onMouseOver={handleValue}><FaLock/></button>
          </div>
          <button
            className="btn"
            type="button"
            onClick={getPerson}
            >{loading ? 'loading...' : 'random user'}</button>
        </div>
      </div>
    </main>
  )
}

export default App
