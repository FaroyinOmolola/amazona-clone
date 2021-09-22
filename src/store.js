import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import {
	productListReducer,
	productDetailReducer,
} from "./reducers/ProductReducer";
import { AddToCartReducer } from "./reducers/CartReducer";
import { CreateOrderRducer } from "./reducers/OrderReducer";
import { UserRegisterReducer, UserSigninReducer } from "./reducers/UserReducer";

const initialState = {
	cart: {
		cartItems: localStorage.getItem("cartItem")
			? JSON.parse(localStorage.getItem("cartItem"))
			: [],
		shippingAddress: localStorage.getItem("shippingAddress")
			? JSON.parse(localStorage.getItem("shippingAddress"))
			: {},
		paymentMethod: "PayPal",
	},
	userSignin: {
		userInfo: localStorage.getItem("userInfo")
			? JSON.parse(localStorage.getItem("userInfo"))
			: null,
	},
};

const reducer = combineReducers({
	productList: productListReducer,
	productDetail: productDetailReducer,
	cart: AddToCartReducer,
	userSignin: UserSigninReducer,
	userRegister: UserRegisterReducer,
	orderCreate: CreateOrderRducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	reducer,
	initialState,
	composeEnhancer(applyMiddleware(thunk))
);

export default store;
