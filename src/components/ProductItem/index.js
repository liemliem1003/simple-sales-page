
import React from 'react'
import Button from '../Button'
import './index.css'

function ProductItem(props){
  const {name, price, onClick} = props
  return (
    <div className="product">
      <h3>{name}</h3>
      <span>{price}</span>
      <Button onClick={onClick} text="Add to cart"/>
    </div>
  )
}

export default ProductItem