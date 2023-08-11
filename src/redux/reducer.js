import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import storage from "redux-persist/lib/storage";
import { FILTER_BRAND, GET_PRODUCTS } from "./actions";
const persistConfig = {
  key: "root",
  //storage: storageSession,
  storage, //esta parte y la de arriba es para usar el localStorage en ves de la ssesion
};

const initialState = {
  products: [],
  filteredProducts: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {...state, products: action.payload };
    case FILTER_BRAND:
      const productsByBrand =
        action.payload === "todos"
          ? [...state.products]
          : [...state.products].filter((el) =>
              el.brand?.some((e) => e === action.payload)
            );

      return {
        ...state,
        filteredProducts: productsByBrand,
      };
      default:
      return { ...state };
  }
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
