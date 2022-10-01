import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

//desc      Fetch all products
//route     GET /api/products
//access    Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};
});
