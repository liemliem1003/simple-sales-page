import React from 'react'
import ProductItem from '../ProductItem'
import './index.css'

function ProductList(props) {
  const {products, onClick} = props
  return (
    <div className="product-list">
      {products.map(product => (
        <ProductItem key={product.id} onClick={() => {onClick(product)}} name={product.name} price={product.price} />
      ))}
    </div>
  )
}

export default ProductList
