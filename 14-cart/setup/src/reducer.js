const reducer = (state, action) => {
  if(action.type === 'CLEAR_CART') {
    // return rest of state, change cart
    console.log('CLEAR_CART called')
    return {...state, cart: []}
  }

  if(action.type === 'REMOVE_ITEM'){
    return {
      ...state,
      cart:state.cart.filter((item)=>{
      return item.id !== action.payload
    })}
  }

  if(action.type === 'INCREASE_ITEMS'){
    let newCart = state.cart.map((cartItem)=>{
      if(cartItem.id === action.payload){
        return {...cartItem, amount: cartItem.amount + 1}
      }
      return cartItem
    })
    return {
      ...state, cart:newCart
    }
  }

  if(action.type === 'DECREASE_ITEMS'){
    let newCart = state.cart.map((cartItem)=>{
      if(cartItem.id === action.payload){
        return {...cartItem, amount: cartItem.amount - 1}
      }
      return cartItem
    }).filter((cartItem)=> cartItem.amount !== 0)
    // If amount does NOT equal zero, return to newCart. If it does, exclude (which deletes from carts)
    return {
      ...state, cart:newCart
    }
  }

  if(action.type === 'GET_TOTAL'){
    let { total, amount } = state.cart.reduce((cartTotal, cartItem)=>{
      const { price, amount } = cartItem
      const itemTotal = price * amount;

      cartTotal.total += itemTotal;
      cartTotal.amount += amount;
      return cartTotal;
    }, {
      total: 0,
      amount: 0
    })
    total = parseFloat(total.toFixed(2));
    return {
      ...state,
      total,
      amount
    }
  }

  if(action.type === 'LOADING'){
    return {...state, loading: true}
  }

  if(action.type === 'DISPLAY_ITEMS'){
    return {
      ...state,
      cart: action.payload,
      loading: false
    }
  }

  if(action.type === 'TOGGLE_AMOUNT'){
    let tempCart = state.cart.map((cartItem)=>{
      if(cartItem.id === action.payload.id){
        if(action.payload.type === 'inc'){
          return {...cartItem, amount:cartItem.amount + 1}
        }
        if(action.payload.type === 'dec'){
          return {...cartItem, amount:cartItem.amount - 1}
        }
      }
      return cartItem
    }).filter((cartItem) => cartItem.amount !== 0)
    return {...state, cart: tempCart}
  }

  //DEFAULT RETURN
  throw new Error('no matching action type')
}

export default reducer