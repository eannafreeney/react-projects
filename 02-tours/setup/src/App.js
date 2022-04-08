import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'

const url = 'https://course-api.com/react-tours-project'

function App() {

  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(()=>{
    getTours()
  }, [])

  const getTours = async() => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const tours = await response.json();
      setTours(tours)
      setIsLoading(false)
    } catch {
      setIsLoading(false)
    }
  }

  const handleDelete = (id) => {
    const filteredTours = tours.filter((tour) => tour.id !== id);
    setTours(filteredTours)
  }

  // loading state
  if(isLoading) {
    return (
      <main>
      <Loading />
    </main>
    )}

  // no tours left
  if(tours.length < 1) {
    return (
      <main>
        <div className="title">
          <h2>no tours left</h2>
          <div className="underline"></div>
          <button className="btn" onClick={() => getTours()}>Refetch Data</button>
        </div>
      </main>
    )}

  // full return
  return (
    <main>
      <Tours
        tours={tours}
        handleDelete={handleDelete}
        />
    </main>
  )
}

export default App
