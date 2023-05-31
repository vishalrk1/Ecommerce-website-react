import React from 'react';
import { Route } from 'react-router-dom';

import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSingUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth } from './components/firebase/firebase.util';



class App extends React.Component{
  constructor(){
    super();
    this.state = {
      currentUser: null,
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({currentUser: user});
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser}/>
        <switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route path='/signin' component={SignInAndSingUpPage}/>
        </switch>
      </div>
      // <div className="App">
      //   <HomePage />
      // </div>
    );
  }
}

export default App;
