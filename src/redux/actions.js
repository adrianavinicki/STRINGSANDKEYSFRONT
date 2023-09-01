import axios from "axios";

export const GET_PRODUCTS = "GET_PRODUCTS";
export const FILTER_BRAND = "FILTER_BRAND";
export const FILTER_CATEGORY = "FILTER_CATEGORY";
export const ORDER_BY_PRICE = "ORDER_BY_PRICE";
export const GET_PRODUCT_NAME = "GET_PRODUCT_NAME";
export const GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID";
export const EMPTY_STATES = "EMPTY_STATES";
export const FILTER_PRICE = "FILTER_PRICE";
export const POST_PRODUCT = "POST_PRODUCT";
export const FILTER_PRICE_NAME = "FILTER_PRICE_NAME";
export const SET_PAGE = "SET_PAGE";
export const EMPTY_ACTUAL_USER = "EMPTY_ACTUAL_USER"
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_PRODUCT_FROM_CART = "REMOVE_PRODUCT_FROM_CART";
export const DECREASE_PRODUCT_QUANTITY = "DECREASE_PRODUCT_QUANTITY";
export const INCREASE_PRODUCT_QUANTITY = "INCREASE_PRODUCT_QUANTITY";
export const EMPTY_CART = "EMPTY_CART";
export const GET_USER = "GET_USER"
export const SET_MAIL = "SET_MAIL"
export const ORDER_PRODUCTS_ADMIN = "ORDER_PRODUCTS_ADMIN"

export const GET_ORDERS_USERS_ID = "GET_ORDERS_USERS_ID";
export const EMPTY_ORDERS_ID = "EMPTY_ORDERS_ID";
export const CLEAN_DETAIL = 'CLEAN_DETAIL';
export const GET_USER_ROL = "GET_USER_ROL";
export const CLEAN_USER_ROL = "CLEAN_USER_ROL";
export const GET_ALL_PURCHASES = "GET_ALL_PURCHASES";
export const GET_RATINGS_AVERAGES = 'GET_RATINGS_AVERAGES';
export const GET_DATA_STATS = 'GET_DATA_STATS';

const VITE_LOCAL_HOST = import.meta.env.VITE_LOCAL_HOST;

export const getProducts = () => {
  return async function (dispatch) {
    try {
    const response = await axios.get(`${VITE_LOCAL_HOST}/products`);
    const products = response.data;
    dispatch({
      type: GET_PRODUCTS,
      payload: products,
    });
  } catch (error) {
    console.log("Error al obtener todos los productos");
  };
}
};

export const getUser = (email) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(`${VITE_LOCAL_HOST}/users/mail`, {email});
      return dispatch({
        type: GET_USER,
        payload: response.data,
      });
    } catch (error) {
      console.log("Error al obtener el usuario por mail");
    }
  }
}

export const setPage = (page) => {
  return {
    type: SET_PAGE,
    payload: page,
  };
};

export const setMail = (mail) => {
  return {
    type: SET_MAIL,
    payload: mail,
  };
};

export function getProductName(name) {
  return async function (dispatch) {
    try {
      const productName = await axios.get(
        `${VITE_LOCAL_HOST}/products?name=${name}`
      );
      return dispatch({
        type: GET_PRODUCT_NAME,
        payload: productName.data,
      });
    } catch (error) {
      console.log("Error al obtener el nombre del producto");
    }
  };
}

export const filterBrand = (brand) => {
  return {
    type: FILTER_BRAND,
    payload: brand,
  };
};

export const filterPrice = ({ val, cat, bra }) => {
  return {
    type: FILTER_PRICE,
    payload: { val, cat, bra },
  };
};

export const getProductNamePrice = (name) => {
  return {
    type: FILTER_PRICE_NAME,
    payload: name,
  };
};

export const filterCategory = (category) => {
  return {
    type: FILTER_CATEGORY,
    payload: category,
  };
};

export const orderByPrice = (status) => {
  return {
    type: ORDER_BY_PRICE,
    payload: status,
  };
};

export const orderProductsAdmin = (status) => {
  return {
    type: ORDER_PRODUCTS_ADMIN,
    payload: status,
  };
};

export const emptyStates = () => {
  return {
    type: EMPTY_STATES,
  };
};

export const emptyActualUser = () => {
  return {
    type: EMPTY_ACTUAL_USER,
  };
};

export const getDetailProduct = (id) => {
  return async function (dispatch) {
    try {
      let response = await axios(`${VITE_LOCAL_HOST}/products/${id}`);
      return dispatch({
        type: GET_PRODUCT_BY_ID,
        payload: response.data,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const PostProduct = (product) => {
  return async function (dispatch) {
    const response = await axios.post(
      `${VITE_LOCAL_HOST}/products/create`,
      product
    );
    console.log(response.data);
    return response;
  };
};

export const putProduct = (id, payload) => {
  return async function (dispatch) {
    const response = await axios.put(`${VITE_LOCAL_HOST}/products/update/${id}`, payload);
    return response;
  };
};

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

export const getOrdersIDArray = (idOrder) => {
  return {
    type: GET_ORDERS_USERS_ID,
    payload: idOrder,
  };
};

export const emptyOrdersId = () => {
  return {
    type: EMPTY_ORDERS_ID,
  };
};

export const PostUser = (payload) => {
  return async function(dispatch) {
    const response = await axios.post(`${VITE_LOCAL_HOST}/users/create`, payload);
    return response;
  }
}

export const cleanDetail = () => {
  return {
    type: CLEAN_DETAIL,
  }
};

export const putUser = (payload) => {
  return async function (dispatch) {
    const response = await axios.put(`${VITE_LOCAL_HOST}/users/update`, payload);
    return response;
  };
};

export const getUserRol = (email) => {
  return async function (dispatch) {
    const response = await axios.post(`${VITE_LOCAL_HOST}/users/mail`, {email: email});
    return dispatch({
      type: GET_USER_ROL,
      payload: response.data.role_id,
    });
  }
};

export const cleanUserRol = () => {
  return {
    type: CLEAN_USER_ROL
  };
};

export const getAllPurchases = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${VITE_LOCAL_HOST}/purchases/getAllPurchases?condition=ventas`)
      return dispatch({
        type: GET_ALL_PURCHASES,
        payload: response.data,
      })
      
    } catch (error) {
      console.log(error);
    }
  }
}

export const getRatingsAverages = () => {
  return async function (dispatch) {
    const response = await axios.get(`${VITE_LOCAL_HOST}/rating/average`);
    const ratingAverages = response.data;
    dispatch({
      type: GET_RATINGS_AVERAGES,
      payload: ratingAverages
    })
  };

};

export function getInfoPurchase(){
  return async function (dispatch){
    try{
      const dataPurchase = await axios.get(`${VITE_LOCAL_HOST}/purchases/dataStats`);
      return dispatch({
        type: GET_DATA_STATS,
        payload:dataPurchase
        });
      } catch (error){
        console.log("Error al obtener la data de Stats")
      }
  }
};

