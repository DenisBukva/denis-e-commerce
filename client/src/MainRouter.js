import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navigation from './screens/Navigation/navigation.component';
import HomeScreen from './screens/Home/home.component';
import SignIn from './screens/SignIn/signIn.component';
import SignUp from './screens/SignUp/signUp.component';
import ProductScreen from './screens/ProductScreen/productScreen.component';
import CartScreen from './screens/CartScreen/cartScreen.component';
import ProfileScreen from './screens/ProfileScreen/profileScreen.component';
import ShippingScreen from './screens/Shipping/shipping.compoinent';
import PaymentScreen from './screens/PaymentScreen/payment.component';
import OrderInformationScreen from './screens/OrderInformationScreen/orderInformation.component';
import OrderScreen from './screens/OrderScreen/orderScreen.component';
//Admin
import UserList from './screens/UserList/userList.component';
import UserEdit from './screens/UserEditScreen/editUser.component';
import ProductListScreen from './screens/ProductListScreen/productLis.screen.component';
import ProductEditScreen from './screens/AddProductScreen/addProduct.component';
import OrderListScreen from './screens/OrderList/orderList.component';

import Footer from './components/Footer/footer.component';

const MainRouter = () => {
  return (
    <Router>
      <Navigation />
      <main className='py-3'>
        <Container>
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/orderinformation' component={OrderInformationScreen} />

          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/cart/:id?' component={CartScreen} />

          {/* Admin Routes */}
          <Route path='/admin/userlist' component={UserList} />
          <Route path='/admin/user/:id/edit' component={UserEdit} />
          <Route
            path='/admin/productlist'
            exact
            component={ProductListScreen}
          />
          <Route
            path='/admin/productlist/:pageNumber'
            component={ProductListScreen}
            exact
          />
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
          <Route path='/admin/orderlist' component={OrderListScreen} />

          <Route path='/search/:keyword' component={HomeScreen} exact />
          <Route path='/page/:pageNumber' component={HomeScreen} exact />
          <Route
            path='/search/:keyword/page/:pageNumber'
            component={HomeScreen}
            exact
          />
          <Route path='/' component={HomeScreen} exact />
          <Route path='/sign-in' component={SignIn} />
          <Route path='/register' component={SignUp} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default MainRouter;
