import React from 'react'
import NavBar from './components/NavBar'
import Products from './pages/Products'
import Home from './pages/Home'
import About from './pages/About'
import Checkout from './pages/Checkout'
import './App.css'
import productsList from './Products.js'

class App extends React.Component {
  state = {
    firstProductList: productsList,
    activePage: 'products',
    productDetail: null,
    shoppingCart: [],
    successShoopingCart: [],
    products: productsList,
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

  sortByName = condition =>{
    const product = [...this.state.products]
    product.forEach(function(element){
      element.point=0
    })
    for (var i = 0; i < product.length; i++) {
      for (var j = 0; j < product.length; j++) {
        product[i].name.toUpperCase() > product[j].name.toUpperCase()
        ? product[i].point++
        : product[i].point+=0
      }
    }
    condition
    ? product.sort(function(a,b){
      return a.point - b.point
      })
    : product.sort(function(a,b){
      return b.point - a.point
      })
    product.forEach(function(a){
      delete a.point
    })
    const newState = {...this.state, products:[...product]}
    this.setState(newState)
  }

  sortByPrice = condition =>{
    const product = [...this.state.products]
    condition
    ? product.sort(function(a,b){
      return a.price - b.price
      })
    : product.sort(function(a,b){
      return b.price - a.price
      })
    const newState = {...this.state, products:[...product]}
    this.setState(newState)
      console.log(this.state.products)
  }

  findProductsByName = name =>{
    const products=[...this.state.firstProductList]
    var newproducts = []
    name=name.split("")
    products.forEach(function(element){
      var count =0;
      for (var i = 0; i < name.length; i++) {
        if (i==0) {
          element.name.toUpperCase().indexOf(name[i].toUpperCase()) > -1 ? count++ : count= count
        }else {
          element.name.toUpperCase().indexOf(name[i].toUpperCase(),element.name.toUpperCase().indexOf(name[i-1].toUpperCase())+1) > -1
          ? count++
          : count = count
        }
      }
      count == name.length ? newproducts = [...newproducts,element] : newproducts = newproducts
    })
    const newState = {...this.state, products:[...newproducts]}
    this.setState(newState)
  }
  render() {
    const pageMapper = {
      home: <Home />,
      about: <About />,
      products: (
        <Products findProductsByName={this.findProductsByName} sortByName={this.sortByName} sortByPrice={this.sortByPrice} products={this.state.products} onProductClick={this.onProductClick}/>
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
