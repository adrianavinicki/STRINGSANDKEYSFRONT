import axios from "axios"

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const FILTER_BRAND = 'FILTER_BRAND';
export const FILTER_CATEGORY = "FILTER_CATEGORY";
export const ORDER_BY_PRICE = "ORDER_BY_PRICE"
export const GET_PRODUCT_NAME = 'GET_PRODUCT_NAME'
export const GET_PRODUCT_BY_ID = 'GET_PRODUCT_BY_ID';
export const EMPTY_STATES = "EMPTY_STATES";
export const FILTER_PRICE = "FILTER_PRICE";
export const POST_PRODUCT = "POST_PRODUCT";
export const FILTER_PRICE_NAME = "FILTER_PRICE_NAME";
export const SET_PAGE = "SET_PAGE";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_PRODUCT_FROM_CART = "REMOVE_PRODUCT_FROM_CART";
export const DECREASE_PRODUCT_QUANTITY = "DECREASE_PRODUCT_QUANTITY";
export const INCREASE_PRODUCT_QUANTITY = "INCREASE_PRODUCT_QUANTITY";
export const EMPTY_CART = "EMPTY_CART";

const VITE_LOCAL_HOST = import.meta.env.VITE_LOCAL_HOST;


export const getProducts = () => {

    return async function (dispatch) {
        const response = await axios.get(`${VITE_LOCAL_HOST}/products`);
        const products = response.data;
        dispatch({
            type: GET_PRODUCTS,
            payload: products
        })
    };
};

export const setPage = (page) => {
    return {
      type: SET_PAGE,
      payload: page,
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

export const filterPrice = ({val,cat,bra}) => {
    return {
        type: FILTER_PRICE,
        payload: {val,cat,bra}
    }
};

export const getProductNamePrice = (name) => {
    return {
        type: FILTER_PRICE_NAME,
        payload: name
    }
}


export const filterCategory = (category) => {
    return {
        type: FILTER_CATEGORY,
        payload: category,
    }
};

export const orderByPrice = (status) => {
    return {
        type: ORDER_BY_PRICE,
        payload: status,
    }
};
export const emptyStates = () => {
    return {
      type: EMPTY_STATES,
    };
  };


export const getDetailProduct = (id) => {
    return async function (dispatch) {
        try {
            let response = await axios(`${VITE_LOCAL_HOST}/products/${id}`);
            return dispatch({
                type: GET_PRODUCT_BY_ID,
                payload: response.data
            })
        } catch (error) {
            throw new Error(error.message)
        }   
    }
}

export const PostProduct = (product) => {
    return async function (dispatch) {
        const response = await axios.post(`${VITE_LOCAL_HOST}/products/create`, product);
        console.log(response.data)
        return response;
      };
}

export const addProductToCart = (cart) => {
    return {
      type: ADD_TO_CART,
      payload: cart,
    };
  };

export const removeProductFromCart = (productID) => {
    return {
      type: REMOVE_PRODUCT_FROM_CART,
      payload: productID,
    };
  };

export const decreaseProductQuantity = (productID) => {
    return {
      type: DECREASE_PRODUCT_QUANTITY,
      payload: productID,
    };
  };
  
export const increaseProductQuantity = (productID) => {
    return {
      type: INCREASE_PRODUCT_QUANTITY,
      payload: productID,
    };
  };

export const emptyCart = () => {
  return {
    type: EMPTY_CART,
  };
};