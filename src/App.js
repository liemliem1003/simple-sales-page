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

  addQuantity = product => {
    this.state.shoppingCart.forEach(function(element){
      if(element.id==product.id) {
        element.quantity++
      }
    })
    const newState = {...this.state, shoppingCart:this.state.shoppingCart}
    this.setState(newState)
  }

  subtractQuantity = product => {
    if (product.quantity>1) {
      this.state.shoppingCart.forEach(function(element){
        if(element.id==product.id) {
          element.quantity--
        }
      })
      const newState = {...this.state, shoppingCart:this.state.shoppingCart}
      this.setState(newState)
    }else {
      for (var i = 0; i < this.state.shoppingCart.length; i++) {
        if(this.state.shoppingCart[i].id==product.id) {
          this.state.shoppingCart.splice(i,1)
        }
      }
      const newState = {...this.state, shoppingCart:this.state.shoppingCart}
      this.setState(newState)
    }
  }

  onCheckout = () => {
    const state = this.state
    const {shoppingCart, successShoopingCart} = state
    const newShoppingCart = []
    const newSuccessShoopingCart =
      successShoopingCart.length > 0
        ? [...successShoopingCart, shoppingCart]
        : [shoppingCart]
    const newAppState = {
      ...state,
      shoppingCart: newShoppingCart,
      successShoopingCart: newSuccessShoopingCart,
    }
    this.setState(newAppState)
    alert("Checkout successfully")
  }

  render() {
    console.log(this.state);
    const pageMapper = {
      home: <Home />,
      about: <About />,
      products: (
        <Products products={this.state.products} onProductClick={this.onProductClick}/>
      ),
      checkout:(
        <div>
          <Checkout checkout={this.state.shoppingCart} checkoutbtn={this.onCheckout} addQuantity={this.addQuantity} subtractQuantity={this.subtractQuantity}/>
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
