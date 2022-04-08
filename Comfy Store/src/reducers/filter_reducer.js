import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  if(action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map((p) => p.price)
    maxPrice = Math.max(...maxPrice);
    return {
      ...state,
      all_products:[...action.payload],
      filtered_products:[...action.payload],
      filters:{
        ...state.filters,
        max_price: maxPrice,
        price: maxPrice
      }
     }
  }
  if(action.type === SET_GRIDVIEW){
    return {...state, grid_view: true,}
  }
  if(action.type === SET_LISTVIEW){
    return {...state, grid_view: false,}
  }
  if(action.type === UPDATE_SORT){
    return {
      ...state,
      sort_value: action.payload
    }
  }

  if(action.type === SORT_PRODUCTS){
    const { sort_value, filtered_products } = state;
    let tempProducts = [...filtered_products];

    if (sort_value === 'price-lowest'){
      tempProducts = tempProducts.sort((a,b) => a.price - b.price);
      //console.log('price-lowest');
    }
    if (sort_value === 'price-highest'){
      tempProducts = tempProducts.sort((a,b) => b.price - a.price)
      //console.log('price-lowest');
    }
    if (sort_value === 'name-a'){
      tempProducts = tempProducts.sort((a,b) => {
        return a.name.localeCompare(b.name)
      })
      //console.log('price-lowest');
    }
    if (sort_value === 'name-z'){
      tempProducts = tempProducts.sort((a,b) => {
        return b.name.localeCompare(a.name)
      })
      //console.log('price-lowest');
    }
    return {...state, filtered_products:tempProducts}
  }
  if(action.type === UPDATE_FILTERS){
    const { name, value } = action.payload;
    return {
      ...state,
      filters:{
        ...state.filters,
        [name]:value
      }
    }
  }
  if(action.type === FILTER_PRODUCTS){
    const { all_products } = state;
    const { text, category, company, color, price, shipping } = state.filters;
    let tempProducts = [...all_products]

    // search text
    if(text){
      tempProducts = tempProducts.filter((product) => {
        return product.name.toLowerCase().startsWith(text);
      })
    }
    // category
    if(category !== 'all'){
      tempProducts = tempProducts.filter((product) => {
        return product.category === category
      })
    }

    // company
    if(company !== 'all'){
      tempProducts = tempProducts.filter((product) => {
        return product.company === company
      })
    }

    // colors
    if(color !== 'all'){
      tempProducts = tempProducts.filter((product) => {
        return product.colors.find((c) => c ===color)
      })
    }

    // price
    tempProducts = tempProducts.filter((product) => {
        return product.price <= price
    })

    // shipping
    if(shipping){
      tempProducts = tempProducts.filter((product) => {
        return product.shipping === true
      })
    }

    return {
      ...state,
      filtered_products: tempProducts,
    }
  }
  if(action.type === CLEAR_FILTERS){
    console.log('clear!');
    return {
      ...state,
      filters: {
        ...state.filters,
        text:'',
        company: 'all',
        category:'all',
        color:'all',
        price:state.filters.maxPrice,
        shipping: false
      }
    }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
