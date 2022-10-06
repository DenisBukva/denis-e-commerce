import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, } from 'react-bootstrap';

import Message from '../../components/Message/message.component';
import Loader from '../../components/Loader/loader.component';
import FormContainer from '../../components/FormContainer/formContainer.component';
import { login } from '../../store/actions/user.actions';

const defaultFormFields = {
    email: '',
    password: ''
}

const SignIn = ({ location, history }) => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
        resetFormFields();
    };

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormFields({ ...formFields, [name]: value })
    };

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter Email'
                        required
                        onChange={handleChange}
                        value={email}
                        name='email'>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label className='mt-2'>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Password'
                        required
                        onChange={handleChange}
                        value={password}
                        name='password'>
                    </Form.Control>
                </Form.Group>

                <Button className='mt-4' type='submit' variant='primary'>
                    Sign In
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Don't have an account?{' '}
                    <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        Sign Up
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default SignIn;