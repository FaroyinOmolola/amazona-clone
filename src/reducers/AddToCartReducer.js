import {ADD_TO_CART_ITEM} from "../constants/AddToCartConstant"


export const AddToCartReducer  =(state={cartItems: []}, action)=>{
	
	switch (action.type) {
	  case ADD_TO_CART_ITEM:
	    const item = action.payload
	    const existItem = state.cartItems.find(x=>
	    	x.product === item.product)
	   
	    if(existItem){
	    	return{
	    		...state, 
	    		cartItems: state.cartItems.map(x => 
	    			x.product === existItem.product? item : x)
	    	}
	    } else { 
	    		return{...state, cartItems: [...state.cartItems, item]}
	    }
	  default:
	    return state
	}
}
