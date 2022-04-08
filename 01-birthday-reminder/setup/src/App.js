import React, { useState } from 'react';
import data from './data2';
import List from './List';
import defaultImage from './images/default.jpg'

function App() {

  const [people, setPeople] = useState(data);
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (e) => {
    e.preventDefault();
    const newPerson = {id: new Date().getTime().toString(), name: name, dob: dob, image: selectedFile};
    console.log([...people, newPerson]);
    setPeople([...people, newPerson]);
    setName('');
    setDob('')
  }

  return (
    <main>
      <section className="container">
        <h3>My Friends</h3>
        <List people={people}/>
        <form>
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="date"
            placeholder="date of birth"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          <input
          type="file"
          value={selectedFile}
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />
          <button type='submit' onClick={handleChange}>submit</button>
        </form>
        <button onClick={() => setPeople([])}>Clear all</button>
      </section>
    </main>

  )
}

export default App;
