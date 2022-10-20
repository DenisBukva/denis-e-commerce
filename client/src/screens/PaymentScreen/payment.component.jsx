import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';

import FormContainer from '../../components/FormContainer/formContainer.component';
import CheckoutSteps from '../../components/CheckoutSteps/checkOutSteps';

import { savePaymentMethod } from '../../store/actions/cart.actions';

const PaymentScreen = ({ history }) => {
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    if (!shippingAddress) {
        history.push('/shipping')
    };

    const [paymentMethod, setPaymentMethod] = useState();
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
    };

    return (
        <>
            <Helmet>
                <title>Denis-E-Commerce - Payment</title>
            </Helmet>
            <FormContainer >
                <CheckoutSteps step1 step2 step3 />
                <h1>Payment</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Label as='legend'>Payment Method</Form.Label>
                        <Col>
                            <Form.Check
                                style={{ marginBottom: '10px' }}
                                type='radio'
                                label='PayPal or CreditCart'
                                id='PayPal'
                                name='paymentMethod'
                                value='PayPal'
                                checked
                                onChange={(e) => setPaymentMethod(e.target.value)}>
                            </Form.Check>

                            <Form.Check
                                type='radio'
                                label='Stripe'
                                id='Stripe'
                                name='paymentMethod'
                                value='Stripe'
                                checked
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            ></Form.Check>
                        </Col>
                    </Form.Group>
                    <Button className='mt-3' type='submit' variant='primary'>
                        Continue
                    </Button>
                </Form>
            </FormContainer>
        </>
    )


}

export default PaymentScreen;
