import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import Message from '../../components/Message/message.component';
import Loader from '../../components/Loader/loader.component';
import { listUsers, deleteUser } from '../../store/actions/user.actions'


const UserList = ({ history }) => {
    const dispatch = useDispatch();

    const userList = useSelector(state => state.userList);
    const { loading, error, users } = userList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const userDelete = useSelector(state => state.userDelete);
    const { success: successDelete } = userDelete;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers());
        } else {
            history.push('/sign-in');
        };
        // eslint-disable-next-line
    }, [dispatch, history, userInfo, successDelete]);

    const deleteHandler = (id) => {
        confirmAlert({
            title: 'Delete User',
            message: 'Are you sure you want to delete this user?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => dispatch(deleteUser(id))
                },
                {
                    label: 'No',
                    onClick: () => history.push('/admin/userlist')
                }
            ]
        });
    };

    return (
        <>
            <Helmet>
                <title>Denis-E-Commerce - Users</title>
            </Helmet>
            <h1>Users</h1>
            {
                loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>ADMIN</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(({ _id, name, email, isAdmin }) => (
                                <tr key={_id}>
                                    <td>{_id}</td>
                                    <td>{name}</td>
                                    <td>
                                        <a href={`mailto:${email}`}>{email}</a>
                                    </td>
                                    <td>
                                        {isAdmin ? (
                                            <i className='fas fa-check' style={{ color: 'green' }}></i>
                                        ) : (
                                            <i className='fas fa-times' style={{ color: 'red' }}></i>
                                        )}
                                    </td>
                                    <td>
                                        <LinkContainer to={`/admin/user/${_id}/edit`}>
                                            <Button variant='light' className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button
                                            variant='danger'
                                            className='btn-sm'
                                            onClick={() => deleteHandler(_id)}
                                        >
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
        </>
    )

}
export default UserList;