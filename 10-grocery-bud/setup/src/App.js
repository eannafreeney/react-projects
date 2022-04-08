import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if(list){
    return JSON.parse(localStorage.getItem('list'))
  } else {
    return []
  }
}

function App() {
  const [item, setItem] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({show: false, msg: '', type: ''});

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!item){
      // display alert
      showAlert(true, 'Please enter value', 'danger');
    } else if (item && isEditing) {
      // deal with edit
      setList(
        list.map((specificItem)=> {
          if(specificItem.id === editID){
            return {...specificItem, title: item}
          }
          return specificItem
      }))
      setItem('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true, 'Value Changed', 'success')
    } else {
      // show alert
      showAlert(true, 'Added Successfully', 'success');
      // grab current state of 'item' and create new object
      const newItem = {id: new Date(). getTime(). toString(), title: item};
      console.log(newItem)
      setList([...list, newItem]);
      setItem('');

    }
  }

  const showAlert = (show=false, msg='', type='') => {
    setAlert({show: show, type, msg})
  }

  const clearList = () => {
    showAlert(true, 'List Cleared!', 'danger');
    setList([])
  }

  const removeItem = (id) => {
    showAlert(true, 'removed', 'danger');
    const updatedList = list.filter((item) => item.id !== id);
    setList(updatedList);
  }

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setItem(specificItem.title)
  }

  useEffect(()=> {
    localStorage.setItem('list', JSON.stringify(list))
  },[list])

  return (
    <section className='section-center'>

      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} />}
        <h3>Grocery Buddy</h3>
        <div className='form-control'>
          <input
            type='text'
            className='grocery'
            placeholder='e.g. toothpaste'
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
          <button type='submit' className='submit-btn'>
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>

      {list.length > 0 &&
        <div className='grocery-container'>
        <List items={list} removeItem={removeItem} editItem={editItem} />
        <button className='clear-btn' onClick={clearList}>clear list</button>
      </div>
      }

    </section>
  )
}

export default App
