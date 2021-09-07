import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import {
	productListReducer,
	productDetailReducer,
} from "./reducers/ProductReducer";
import { AddToCartReducer } from "./reducers/AddToCartReducer";

console.log();
const initialState = {
	cart: {
		cartItems: localStorage.getItem("cartItem")
			? JSON.parse(localStorage.getItem("cartItem"))
			: [],
	},
};

const reducer = combineReducers({
	productList: productListReducer,
	productDetail: productDetailReducer,
	cart: AddToCartReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	reducer,
	initialState,
	composeEnhancer(applyMiddleware(thunk))
);

export default store;
