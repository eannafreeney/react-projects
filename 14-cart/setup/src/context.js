import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext();

const initialState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const clearCart = () => {
    dispatch({type: 'CLEAR_CART'})
  }

  const removeItem = (id) => {
    console.log('removeItem called')
    dispatch({type: 'REMOVE_ITEM', payload: id})
  }

  const increaseItems = (id)=> {
    dispatch({type: 'INCREASE_ITEMS', payload: id})
  }

  const decreaseItems = (id)=> {
    dispatch({type: 'DECREASE_ITEMS', payload: id})
  }

  const fetchData = async() => {
    dispatch({type: 'LOADING'});
    const response = await fetch(url);
    const cart = await response.json();
    dispatch({type: 'DISPLAY_ITEMS', payload: cart})
  }

  const toggleAmount = (id, type) => {
    dispatch({type: 'TOGGLE_AMOUNT', payload:{id, type}})
  }

  useEffect(()=>{
    fetchData();
  },[])

  useEffect(()=> {
    dispatch({type: 'GET_TOTAL'})
  }, [state.cart])

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        increaseItems,
        decreaseItems,
        toggleAmount
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }

