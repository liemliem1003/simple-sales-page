import React from 'react'
import ProductList from '../../components/ProductList'
import './index.css'

function Products(props){
  return (
    <div>
    <div className="group-sort-btn">
      <input type="text" placeholder="input product's name" onChange={(value)=>props.findProductsByName(value.target.value)}/>
    </div>
    <div className="group-sort-btn">
      <button onClick={()=>props.sortByName(true)}>Sort By Name A-Z</button>
      <button onClick={()=>props.sortByName(false)}>Sort By Name Z-A</button>
      <button onClick={()=>props.sortByPrice(true)}>Sort By Price (Descending)</button>
      <button onClick={()=>props.sortByPrice(false)}>Sort By Price (Aescending)</button>
    </div>
      <ProductList products={props.products} onClick={props.onProductClick}/>
    </div>
  )
}

export default Products
