import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSingUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.comonent';
import { selectCurrentUser } from './redux/user/user.selector';
import { selectCollectionsForPreview } from './redux/shop/shop.selector';
import { checkUserSession } from './redux/user/user.actions';



class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {

    const {checkUserSession} = this.props;
    checkUserSession();

    // const { setCurrentUser } = this.props; 
    // const { setCurrentUser, collectionsArray } = this.props;

    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    //   if (userAuth) {
    //     const userRef = await creatUserProfileDocument(userAuth);

    //     userRef.onSnapshot(snapShot => {
    //       setCurrentUser({
    //         id: snapShot.id,
    //         ...snapShot.data()
    //       });
    //     });
    //   } 

    //   setCurrentUser(userAuth);
    // });
  }

  componentWillUnmount() {
    // this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route
            exact
            path='/signin'
            render={() =>
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSingUpPage />
              )
            }
          />
          <Route exact  path='/checkout' component={CheckoutPage}/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionsForPreview,
});

const mapDispatchToPrope = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession()),
})

export default connect(
  mapStateToProps,
  mapDispatchToPrope
)(App);