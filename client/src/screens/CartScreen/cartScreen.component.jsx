import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Button, Card } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';

import Message from '../../components/Message/message.component';
import Cart from '../../components/Cart/cart.component';
import { addToCart, removeFromCart } from '../../store/actions/cart.actions';

const CartScreen = ({ match, location, history }) => {
    const dispatch = useDispatch();
    const productId = match.params.id;
    const qty = location.search ? Number(location.search.split('=')[1]) : 1;

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart;

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty]);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    const checkOutHandler = () => {
        history.push('/sign-in?redirect=shipping')
    };

    return (
        <>
            <Helmet>
                <title>Denis-E-Commerce - Cart</title>
            </Helmet>
            <Row>
                <Col md={8}>
                    <h1>Shopping Cart</h1>
                    {
                        cartItems.length === 0 ? (
                            <Message>
                                Your cart is empty <Link to='/'>Go Back</Link>
                            </Message>
                        ) : (
                            <ListGroup variant='flush'>
                                {cartItems.map((item) => (
                                    <React.Fragment key={item.product}>
                                        <Cart cart={item} removeFromCart={removeFromCartHandler} />
                                    </React.Fragment>
                                ))}
                            </ListGroup>
                        )}
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>
                                    Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                                    items
                                </h2>
                                $
                                {cartItems
                                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                                    .toFixed(2)}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn-block'
                                    disabled={cartItems.length === 0}
                                    onClick={checkOutHandler}
                                >
                                    Proceed To Checkout
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )


}

export default CartScreen;