import axios from "axios"

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const FILTER_BRAND = 'FILTER_BRAND';
export const GET_PRODUCT_BY_ID = 'GET_PRODUCT_BY_ID';

const VITE_LOCAL_HOST = import.meta.env.VITE_LOCAL_HOST;


export const getProducts = () => {

    return async function(dispatch) {
        const response = await axios.get(`${VITE_LOCAL_HOST}/products`);
        const products = response.data;
        dispatch({
            type:GET_PRODUCTS,
            payload:products
        })
    };
};

export const filterBrand = (brand) => {
    return {
        type: FILTER_BRAND,
        payload: brand,
    }
};

export const getDetailProduct = (id) => {
    return async function (dispatch) {
        try {
            let response = await axios(`http://localhost:3010/products/${id}`);
            return dispatch({
                type: GET_PRODUCT_BY_ID,
                payload: response.data
            })
        } catch (error) {
            throw new Error(error.message)
        }   
    }
}


