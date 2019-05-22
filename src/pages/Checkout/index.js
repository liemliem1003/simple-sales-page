import React from 'react'
import ProductList from '../../components/ProductList'
import './index.css'



function Checkout(props){
  let list=props.checkout.map((product, i) => (
      <div key={i} className="checkout-product">
        <div>Name: {product.name}</div>
        <div>Price: {product.price}</div>
        <div>Quantity: </div>
        <button onClick={() => props.subtractQuantity(product)}>-</button>
        <div>{product.quantity}</div>
        <button onClick={() => props.addQuantity(product)}>+</button>
      </div>
  ))
  return props.checkout.length==0 ? (<div>There is no item ^^</div>) : (<div>{list}</div>)
}

export default Checkout
