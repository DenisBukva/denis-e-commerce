import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Form, Button } from 'react-bootstrap';
import { addToCart } from '../../store/actions/cart.actions';

const Cart = ({ cart, removeFromCart }) => {
    const dispatch = useDispatch()
    return (
        <ListGroup.Item key={cart.product}>
            <Row>
                <Col md={2}>
                    <Image src={cart.image} alt={cart.name} fluid rounded />
                </Col>
                <Col md={3}>
                    <Link to={`/product/${cart.product}`}>{cart.name}</Link>
                </Col>
                <Col md={2}>${cart.price}</Col>
                <Col md={2}>
                    <Form.Control
                        as='select'
                        value={cart.qty}
                        onChange={(e) =>
                            dispatch(
                                addToCart(cart.product, Number(e.target.value))
                            )
                        }
                    >
                        {[...Array(cart.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                                {x + 1}
                            </option>
                        ))}
                    </Form.Control>
                </Col>
                <Col md={2}>
                    <Button
                        type='button'
                        variant='light'
                        onClick={() => removeFromCart(cart.product)}
                    >
                        <i className='fas fa-trash'></i>
                    </Button>
                </Col>
            </Row>
        </ListGroup.Item>
    )
}

export default Cart;