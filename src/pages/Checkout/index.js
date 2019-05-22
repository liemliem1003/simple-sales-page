import React from 'react'
import ProductList from '../../components/ProductList'
import './index.css'


function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}
function Checkout(props){
  var totalPrice = 0
  props.checkout.forEach(function(element){
    totalPrice+=element.price*element.quantity
  })

  const list=props.checkout.map((product, i) => (
      <div key={i} className="checkout-product">
        <div>Name: {product.name}</div>
        <div>Price: {product.price}</div>
        <div>Quantity: </div>
        <button onClick={() => props.subtractQuantity(product)}>-</button>
        <div>{product.quantity}</div>
        <button onClick={() => props.addQuantity(product)}>+</button>
      </div>
    )
  )
  return props.checkout.length==0
  ? (<div>There is no item ^^</div>)
  : (<div><div>{list}</div><div>Total Price: {numberWithCommas(totalPrice)}</div><button onClick={props.checkoutbtn}>Checkout</button></div>)
}
export default Checkout
