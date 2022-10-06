import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { logout } from '../../store/actions/user.actions'


const Header = () => {
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () => {
        dispatch(logout());
    }

    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <Link to='/'>
                        <Navbar.Brand>E-SHOP</Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ml-auto' style={{ marginLeft: '60%' }}>
                            <Link className='text-decoration-none' to='/cart'>
                                <div className='nav-link'>
                                    Cart
                                </div>
                            </Link>
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <Link className='nav-link' to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </Link>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <Link className='text-decoration-none' to='sign-in'>
                                    <div className='nav-link' >
                                        Sign In
                                    </div>
                                </Link>
                            )}
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='adminmenu'>
                                    <Link to='/admin/userlist'>
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </Link>
                                    <Link to='/admin/productlist'>
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </Link>
                                    <Link to='/admin/orderlist'>
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </Link>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header