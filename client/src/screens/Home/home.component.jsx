import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Paginate from '../../components/Paginate/paginate.component';
import Product from '../../components/Product/product.component';
import Message from '../../components/Message/message.component';
import Loader from '../../components/Loader/loader.component';
import ProductCarousel from '../../components/ProductCarousel/productCarousel.component';

import { listProducts } from '../../store/actions/productActions'


const HomeScreen = ({ match }) => {
    const dispatch = useDispatch();
    const keyword = match.params.keyword;
    const pageNumber = match.params.pageNumber || 1;

    const productList = useSelector(state => state.productList);
    const { loading, error, products, page, pages } = productList;

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])
    return (
        <>
            <Helmet>
                <title>Denis-E-Commerce - Home</title>
            </Helmet>
            {!keyword ? (
                <ProductCarousel />
            ) : (
                <Link to='/' className='btn btn-light'>
                    Go Back
                </Link>
            )}
            <h1>Latest Products</h1>
            {
                loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <>
                        <Row>
                            {products.map((product) => (
                                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                    <Product product={product} />
                                </Col>
                            ))}
                        </Row>
                        <Paginate
                            pages={pages}
                            page={page}
                            keyword={keyword ? keyword : ''}
                        />
                    </>
                )
            }
        </>
    )
}

export default HomeScreen;