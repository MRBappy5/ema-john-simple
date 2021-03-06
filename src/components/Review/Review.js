import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';

const Review = () => {
    const [cart, setCart] = useState([])
    const [orderPlaced, setOrderPlaced] = useState(false)

    const handlePlaceOrder = () => {
        setCart([])
        setOrderPlaced(true)
        processOrder();
        
    }

    const removeProduct = (productKey) => {
        console.log('remove key');
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey)
    }
    useEffect(()=>{
        const saveCart = getDatabaseCart() 
        const productKeys = Object.keys(saveCart)
        const cartProducts = productKeys.map(key =>{
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = saveCart[key]
            return product;
        })
        setCart(cartProducts)
    }, []);

    let thankYou;
    if(orderPlaced){
        thankYou = <h1>Thank You</h1>
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                {/* <h1> {cart.length} review</h1> */}
                {
                    cart.map(pd => <ReviewItem removeProduct={removeProduct} product={pd}></ReviewItem>)
                } 
                {thankYou}           
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                  <button onClick={handlePlaceOrder} className="button-main">Place Order</button>  
                </Cart>    
            </div>
        </div>
    );
};

export default Review;