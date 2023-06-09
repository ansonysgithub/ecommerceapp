import React, { useState, useEffect } from 'react';

import Context from './Context';
import config from '../resources/config';
import apiFetch from '../resources/apiFetch';

const GlobalState = props => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [cartPrice, setCartPrice] = useState(0);

    const addProduct = product => {
        const newProducts = [...cart, product];
        setCart(newProducts);
    };

    const deleteProduct = productId => {
        const position = cart.findIndex(product => product.id === productId);

        console.log(position);

        if (position >= 0) {
            const newCart = [...cart];
            newCart.splice(position, 1);
            setCart(newCart);
        }
    };

    const thisProductIsInCart = productId => {
        const position = cart.findIndex(product => product.id === productId) >= 0;

        if (position > 0) {
            return true;
        } else {
            return false;
        }
    };

    const updateCartPrice = () => {
        let newCartPrice = 0;
        cart.map(product => newCartPrice = newCartPrice + parseFloat(product.price));
        setCartPrice(newCartPrice);
    };

    const fetchProducts = async () => {
        const newProducts = await apiFetch.get(
            `${config.siteURL}products?${config.wcCredentials}`);

        setProducts(newProducts);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        updateCartPrice();
    }, [cart]);

    return (
        <Context.Provider
            value={{
                products,
                cart,
                setCart,
                addProduct,
                deleteProduct,
                cartPrice,
                thisProductIsInCart,
                updateCartPrice
            }}>
            {props.children}
        </Context.Provider>
    );
};

export default GlobalState;