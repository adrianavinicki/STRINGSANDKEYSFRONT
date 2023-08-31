import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import storage from "redux-persist/lib/storage";
import {
  FILTER_BRAND,
  GET_PRODUCTS,
  FILTER_CATEGORY,
  EMPTY_STATES,
  ORDER_BY_PRICE,
  GET_PRODUCT_NAME,
  GET_PRODUCT_BY_ID,
  FILTER_PRICE,
  FILTER_PRICE_NAME,
  SET_PAGE,
  INCREASE_PRODUCT_QUANTITY,
  DECREASE_PRODUCT_QUANTITY,
  ADD_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  SET_MAIL,
  EMPTY_CART,
  GET_ORDERS_USERS_ID,
  EMPTY_ACTUAL_USER,
  EMPTY_ORDERS_ID,
  GET_USER,
  ORDER_PRODUCTS_ADMIN,
  CLEAN_DETAIL,
  GET_USER_ROL,
  GET_ALL_PURCHASES,
  GET_RATINGS_AVERAGES,
} from "./actions";
const persistConfig = {
  key: "root",
  //storage: storageSession,
  storage, //esta parte y la de arriba es para usar el localStorage en ves de la ssesion
};

const initialState = {
  products: [],
  filteredProducts: [],
  details: {},
  currentPage: 0,
  cartItems: [],
  ordersUsersID: [],
  actualUser: [],
  userEmail: [],
  currentPurchases: [],
  actualUserRol: [],
  ratingsAverage: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      if (!action.payload) {
        return {
          ...state,
          actualUser: ["vacio"],
        };
      } else
        return {
          ...state,
          actualUser: action.payload,
        };
    case SET_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case SET_MAIL:
      return {
        ...state,
        userEmail: action.payload,
      };
    case ORDER_BY_PRICE:
      const { payload } = action;
      let orderPrice;
      if (payload === "Ascendente") {
        orderPrice = state.filteredProducts.sort((a, b) => a.price - b.price);
      } else {
        orderPrice = state.filteredProducts.sort((a, b) => b.price - a.price);
      }
      return { ...state, filteredProducts: [...orderPrice] };

    case GET_PRODUCTS:
      return { ...state, products: action.payload };
    case ORDER_PRODUCTS_ADMIN:
      let orderAdmin;
      if (action.payload === "Pausados") {
        orderAdmin = state.products.sort((a, b) => a.product_status - b.product_status);
      } else if (action.payload === "Activos") {
        orderAdmin = state.products.sort((a, b) => b.product_status - a.product_status);
      } else if (action.payload === "ID") {
        orderAdmin = state.products.sort((a, b) => a.id - b.id);
      }
      else if (action.payload === "Menor Stock") {
        orderAdmin = state.products.sort((a, b) => a.quantity - b.quantity);
      } else if (action.payload === "Mayor Stock") {
        orderAdmin = state.products.sort((a, b) => b.quantity - a.quantity);
      }
       else {
        orderAdmin = state.products;
      }
      return { ...state, products: [...orderAdmin] };

    case GET_PRODUCTS:
      return { ...state, products: action.payload };

    case GET_PRODUCT_NAME:
      return {
        ...state,
        filteredProducts: action.payload,
        products: action.payload,
      };
    case FILTER_BRAND:
      const productsByBrand =
        action.payload === "todos"
          ? [...state.products]
          : [...state.filteredProducts].filter(
              (el) => el.brand === action.payload && el.product_status === true
            );

      return {
        ...state,
        filteredProducts: productsByBrand,
      };
    case FILTER_CATEGORY:
      const productsByCategory =
        action.payload === "todos"
          ? [...state.products].filter((el) =>  el.product_status === true)
          : [...state.products].filter((el) => el.category === action.payload && el.product_status === true);

      return {
        ...state,
        filteredProducts: productsByCategory,
      };
    case FILTER_PRICE:
      const productsByPrice = state.products.filter((el) => {
        if (action.payload.bra) {
          return (
            el.price <= action.payload.val &&
            el.category === action.payload.cat &&
            el.brand === action.payload.bra
          );
        } else if (action.payload.cat) {
          return (
            el.price <= action.payload.val && el.category === action.payload.cat
          );
        } else {
          return el.price <= action.payload.val;
        }
      });
      return {
        ...state,
        filteredProducts: productsByPrice,
      };
    case GET_PRODUCT_BY_ID:
      return {
        ...state,
        details: action.payload,
      };

    case EMPTY_STATES:
      return {
        ...state,
        filteredProducts: [],
      };

    case ADD_TO_CART:
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingItemIndex !== -1) {
        // If the item already exists in the cart, update its quantity, revisar lo de abajo
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[existingItemIndex].quantity++;

        return {
          ...state,
          cartItems: updatedCartItems,
        };
      } else {
        // If the item doesn't exist in the cart, add it with a quantity of 1
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
        };
      }

    case REMOVE_PRODUCT_FROM_CART:
      const updatedCartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        cartItems: updatedCartItems,
      };
    case DECREASE_PRODUCT_QUANTITY:
      const updatedItems = state.cartItems.map((item) => {
        if (item.id === action.payload) {
          const updatedQuantity = item.quantity - 1;

          if (updatedQuantity <= 0) {
            // Remove the item from the cart if quantity becomes 0 or less
            return null;
          }
          return {
            ...item,
            quantity: updatedQuantity,
          };
        }
        return item;
      });

      const filterCartItems = updatedItems.filter(Boolean); // Remove null items

      return {
        ...state,
        cartItems: filterCartItems,
      };

    case INCREASE_PRODUCT_QUANTITY:
      const IncreasedItems = state.cartItems.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }

        return item;
      });

      return {
        ...state,
        cartItems: IncreasedItems,
      };

    case EMPTY_CART:
      return {
        ...state,
        cartItems: [],
      };
    case EMPTY_ACTUAL_USER:
      return {
        ...state,
        actualUser: [],
      };
    case GET_ORDERS_USERS_ID:
      return {
        ...state,
        ordersUsersID: [...state.ordersUsersID, action.payload],
      };
    case EMPTY_ORDERS_ID:
      return {
        ...state,
        ordersUsersID: [],
      };
    case CLEAN_DETAIL:
      return {
        ...state,
        details: {},
      };
    case GET_USER_ROL:
      return {
        ...state,
        actualUserRol: action.payload,
      };

    case EMPTY_ACTUAL_USER:
      return {
        ...state,
        actualUserRol: [],
      };

    case GET_ALL_PURCHASES:
      return {
        ...state,
        currentPurchases: action.payload,
      };
    case GET_RATINGS_AVERAGES:
      return {
        ...state,
        ratingsAverage: action.payload
      }; 

    default:
      return { ...state };
  }
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
