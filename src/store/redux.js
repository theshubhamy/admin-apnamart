import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userRegisterReducer,
  allUsersReducer,
} from "./reducers/userReducer";
import { orderReducer } from "./reducers/orderReducer";
import {
  newProductReducer,
  allProductsReducer,
  updateProductReducer,
  deleteProductReducer,
} from "./reducers/productReducer";
const reducer = combineReducers({
  users: allUsersReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  orders: orderReducer,
  newProduct: newProductReducer,
  allProducts: allProductsReducer,
  updateProduct: updateProductReducer,
  deleteProduct: deleteProductReducer,
});
let initialState = {
  userLogin: {
    userInfo: sessionStorage.getItem("userInfo")
      ? JSON.parse(sessionStorage.getItem("userInfo"))
      : null,
  },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
