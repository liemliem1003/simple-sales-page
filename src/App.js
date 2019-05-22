import React from 'react'
import NavBar from './components/NavBar'
import Products from './pages/Products'
import Home from './pages/Home'
import About from './pages/About'
import Checkout from './pages/Checkout'
import './App.css'

class App extends React.Component {
  state = {
    activePage: 'about',
    productDetail: null,
    shoppingCart: [],
    successShoopingCart: [],
    products: [
      {
        id: '1',
        name: 'iPhone6',
        price: 650,
      },
      {
        id: '2',
        name: 'iPhone6 Plus',
        price: 700,
      },
      {
        id: '3',
        name: 'iPhone7',
        price: 750,
      },
      {
        id: '4',
        name: 'iPhone7 Plus',
        price: 800,
      },
    ],
  }

  onProductClick = product => {
    if(this.state.shoppingCart.length==0){
      product.quantity=1
      this.state.shoppingCart=[...this.state.shoppingCart,product]
    }else {
      for (var i = 0; i < this.state.shoppingCart.length; i++) {
        if (this.state.shoppingCart[i].id===product.id) {
          this.state.shoppingCart[i].quantity++
          break
        }
        else{
          if (i===this.state.shoppingCart.length-1) {
            product.quantity=1
            this.state.shoppingCart=[...this.state.shoppingCart,product]
            break
          }
        }
      }
    }
    const newShoppingCart = [...this.state.shoppingCart]
    const newState = {...this.state, shoppingCart: newShoppingCart}
    this.setState(newState)
  }

  onNavClick = activePage => {
    const newState = {...this.state, activePage}
    this.setState(newState)
  }

  addQuantity = quantity => {
    this.state.shoppingCart.forEach(function(element){
      if(element.id==quantity.id) {
        element.quantity++
      }
    })
    const newState = {...this.state, shoppingCart:this.state.shoppingCart}
    this.setState(newState)
  }

  subtractQuantity = quantity => {
    if (quantity.quantity>0) {
      this.state.shoppingCart.forEach(function(element){
        if(element.id==quantity.id) {
          element.quantity--
        }
      })
      const newState = {...this.state, shoppingCart:this.state.shoppingCart}
      this.setState(newState)
    }
  }

  numberWithCommas() {
    var x =0
    this.state.shoppingCart.forEach(function(element){
      x+=element.price*element.quantity
    })
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
  }
  render() {
    const pageMapper = {
      home: <Home />,
      about: <About />,
      products: (
        <Products products={this.state.products} onProductClick={this.onProductClick}/>
      ),
      checkout:(
        <div>
          <Checkout checkout={this.state.shoppingCart} addQuantity={this.addQuantity} subtractQuantity={this.subtractQuantity}/>
          {this.state.shoppingCart.length!=0 ? <div>Total Order: {this.numberWithCommas()}$</div>: <div></div>}
        </div>
      ),
    }
    return (
      <div className="App">
        <NavBar onClick={this.onNavClick} cartLength={this.state.shoppingCart.length} />
        <div style={{padding: 50}}>
          {pageMapper[this.state.activePage]}
        </div>
      </div>
    )
  }
}

export default App
