import React, { useState } from 'react';
import Menu from './Menu';
import Categories from './Categories';
import data from './data';

const allCategories = ['all', ...new Set(data.map((item) => item.category))];

function App() {

  const [menuItems, setMenuItems] = useState(data);
  const [category, setCategory] = useState(allCategories)

  const filterItems = (category) => {
    if(category === 'all'){
      setMenuItems(data);
      return
    }
    const newItems = data.filter((item) => {
      return item.category === category
    });
    setMenuItems(newItems);
  }

  return (
    <main>
      <section className="menu section">
        <div className="title">
          <h2>our menu</h2>
          <div className="underline"></div>
        </div>
        <Categories categories={allCategories} filterItems={filterItems} />
        <Menu items={menuItems} />
      </section>
    </main>
  );
}

export default App;
