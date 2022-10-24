import React, { useEffect } from "react";
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { confirmAlert } from 'react-confirm-alert';

import Message from "../../components/Message/message.component";
import Loader from "../../components/Loader/loader.component";
import Paginate from "../../components/Paginate/paginate.component";
import OrderRow from "../../components/OrderRow/orderRow.component";
import { listProducts, createProduct, deleteProduct } from '../../store/actions/productActions';
import { PRODUCT_CREATE_RESET } from '../../store/constants/product.constants';

import 'react-confirm-alert/src/react-confirm-alert.css';

const ProductListScreen = ({ match, history }) => {
    const pageNumber = match.params.pageNumber || 1;
    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);
    const { loading, error, products, page, pages } = productList;

    const productDelete = useSelector(state => state.productDelete);
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;

    const productCreate = useSelector(state => state.productCreate);
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET });
        if (!userInfo.isAdmin) {
            history.push('/sign-in');
        };
        if (successCreate) {
            history.push(`/admin/product/${createdProduct._id}/edit`);
        } else {
            dispatch(listProducts('', pageNumber));
        };
    }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct, pageNumber]);

    const deleteHandler = (id) => {
        confirmAlert({
            title: 'Delete Product',
            message: 'Are you sure you want to delete this Product?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => dispatch(deleteProduct(id))
                },
                {
                    label: 'No',
                    onClick: () => history.push('/admin/products')
                }
            ]
        });

    };

    const createProductHandler = () => {
        dispatch(createProduct());
    };

    return (
        <>
            <Helmet>
                <title>Denis-E-Commerce - Products</title>
            </Helmet>
            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="text-right">
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> Create Product
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <>
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th></th>
                            </tr>
                        </thead>
                        {products.map(product => (
                            <React.Fragment key={product._id}>
                                <OrderRow product={product} deleteHandler={deleteHandler} />
                            </React.Fragment>

                        ))}

                    </Table>
                    <Paginate pages={pages} page={page} isAdmin={true} />
                </>
            )}
        </>
    )
}

export default ProductListScreen;