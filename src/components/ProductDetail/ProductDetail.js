import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productkey} = useParams()
    const product = fakeData.find(pd => pd.key === productkey)
    
    return (
        <div>
            <h1>Product detail</h1>
            <Product product={product} showAddToCart={false}></Product>
        </div>
    );
};

export default ProductDetail;