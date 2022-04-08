import React from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {
  const { filtered_products:products, grid_view } = useFilterContext();

  if(products.length < 1){
    return <h5 style={{textTransform:'none'}}>No products found</h5>
  }

  // LIST VIEW
  if(grid_view === false){
    return <ListView products={products}/>
  }

  // DEFAULT GRID VIEW
  return (
    <GridView products={products}>product list</GridView>
  )
}

export default ProductList
