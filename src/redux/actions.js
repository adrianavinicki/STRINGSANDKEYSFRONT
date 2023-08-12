import axios from "axios"

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const FILTER_BRAND = 'FILTER_BRAND';
export const GET_PRODUCT_NAME = 'GET_PRODUCT_NAME'

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

export function getProductName(name){
    return async function(dispatch){
        try{
            const productName = await axios.get(`${VITE_LOCAL_HOST}/products?name=${name}`);
            return dispatch({
                type:GET_PRODUCT_NAME,
                payload: productName.data,
            });
        } catch (error){
            console.log("Error al obtener el nombre del producto");
        }
    }
}

export const filterBrand = (brand) => {
    return {
        type: FILTER_BRAND,
        payload: brand,
    }
};


