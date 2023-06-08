import React, { useState, useEffect } from 'react';

import Context from './Context';
import config from '../resources/config';
import apiFetch from '../resources/apiFetch';

const GlobalState = props => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        console.log(config);
        const newProducts = await apiFetch.get(
            `${config.siteURL}products?${config.wcCredentials}`);

        setProducts(newProducts);
        console.log(newProducts);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <Context.Provider
            value={{
                products,
            }}>
            {props.children}
        </Context.Provider>
    );
};

export default GlobalState;