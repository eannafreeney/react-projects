import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'
import { Home, About, Cart, CheckOut, ErrorPage, Products, SingleProduct, PrivateRoute, AuthWrapper } from './pages';

function App() {
  return (
    <AuthWrapper>
      <Router>
        <Navbar />
        <Sidebar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/cart">
              <Cart />
            </Route>
            <Route exact path="/products">
              <Products />
            </Route>
            <Route exact path="/products/:id">
              <SingleProduct />
            </Route>
            <PrivateRoute exact path="/checkout">
              <CheckOut />
            </PrivateRoute>
            <Route exact path="*">
              <ErrorPage />
            </Route>
          </Switch>
        <Footer/>
      </Router>
    </AuthWrapper>
  )
}

export default App
