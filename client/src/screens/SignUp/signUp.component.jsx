import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';

import FormContainer from '../../components/FormContainer/formContainer.component';
import Loader from '../../components/Loader/loader.component';
import Message from '../../components/Message/message.component';

import { register } from '../../store/actions/user.actions';

const defaultFormFields = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
}


const SignUp = ({ location, history }) => {
    const [message, setMessage] = useState(null);
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { name, email, password, confirmPassword } = formFields;

    const dispatch = useDispatch();
    const userRegister = useSelector(state => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match!')
        } else {
            dispatch(register(name, email, password));
            resetFormFields();
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormFields({ ...formFields, [name]: value })
    }

    return (
        <>
            <FormContainer>
                <Helmet>
                    <title>Denis-E-Commerce - SignUp</title>
                </Helmet>
                <h1>Sign Up</h1>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Enter a Name'
                            required
                            onChange={handleChange}
                            value={name}
                            name='name'>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='email'>
                        <Form.Label className='mt-2'>Email</Form.Label>
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
                            name='password'
                            minLength="5">
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='confirmPassword'>
                        <Form.Label className='mt-2'>Confirm Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Confirm Password'
                            required
                            onChange={handleChange}
                            value={confirmPassword}
                            name='confirmPassword'
                            minLength="5">
                        </Form.Control>
                    </Form.Group>

                    <Button className='mt-3' type='submit' variant='primary'>
                        Sign Up
                    </Button>
                </Form>
                <Row className='py-3'>
                    <Col>
                        Already have an account?{' '}
                        <Link className='link-auth' to={redirect ? `/sign-in?redirect=${redirect}` : '/sign-in'}>
                            Login
                        </Link>
                    </Col>
                </Row>
            </FormContainer>
        </>
    )
};

export default SignUp;