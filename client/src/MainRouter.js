import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navigation from './screens/Navigation/navigation.component';
import HomeScreen from './screens/Home/home.component';
import SignIn from './screens/SignIn/signIn.component';
import SignUp from './screens/SignUp/signUp.component';
import ProductScreen from './screens/ProductScreen/productScreen.component';

import Footer from './components/Footer/footer.component';

const MainRouter = () => {
  return (
    <Router>
      <Navigation />
      <main className='py-3'>
        <Container>
          <Route path='/product/:id' component={ProductScreen} />
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
