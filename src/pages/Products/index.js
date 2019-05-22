import React from 'react'
import ProductList from '../../components/ProductList'

function Products(props){
  return (
    <ProductList products={props.products} onClick={props.onProductClick}/>
  )
}

export default Products