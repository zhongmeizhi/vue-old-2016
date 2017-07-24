import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
	state:{
		count:0,
		bookSet:[],
		cartBook:[]
	},
	mutations: {
    	increment (state) {
    		this.state.count++
    	},
    	addToCart(state,book){
    		let nowBooks = localStorage.getItem("curBook");
			if(nowBooks==null || nowBooks == "null"){
				state.bookSet[0] = book;
			}else{
				state.bookSet = JSON.parse(nowBooks).concat(book);
			}
			localStorage.setItem("curBook",JSON.stringify(state.bookSet));
    	},
    	getInCart(state){
    		state.cartBook = JSON.parse(localStorage.getItem("curBook"));
    	}
    	
	},
	actions:{
		
	}
})

export default store