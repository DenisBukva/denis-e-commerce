import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import CheckoutSteps from '../../components/CheckoutSteps/checkOutSteps';
import FormContainer from '../../components/FormContainer/formContainer.component';
import { saveShippingAddress } from '../../store/actions/cart.actions';


const ShippingScreen = ({ history }) => {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        history.push('/payment');
    };

    return (
        <>
            <Helmet>
                <title>Denis-E-Commerce - Shipping</title>
            </Helmet>
            <FormContainer>
                <CheckoutSteps step1 step2 />
                <h1>Shipping</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='address'>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            className='form-control form-control-lg'
                            type='text'
                            placeholder='Enter a address'
                            value={address || ''}
                            required
                            onChange={(e) => setAddress(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='city' className='mt-3'>
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            className='form-control form-control-lg'
                            type='text'
                            placeholder='Enter a city'
                            value={city || ''}
                            required
                            onChange={(e) => setCity(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='postal Code' className='mt-3'>
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control
                            type='text'
                            className='form-control form-control-lg'
                            placeholder='Enter a postal code'
                            value={postalCode || ''}
                            required
                            onChange={(e) => setPostalCode(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='country' className='mt-3'>
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter a country'
                            value={country || ''}
                            required
                            onChange={(e) => setCountry(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Button className='mt-4 btn-lg' type='submit' variant='primary'>
                        Continue
                    </Button>
                </Form>
            </FormContainer>
        </>
    );
};

export default ShippingScreen;