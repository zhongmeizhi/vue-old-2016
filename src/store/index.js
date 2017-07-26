import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
	state:{
		bookSet:[]
	},
	mutations: {
    	addToCart(state,book){
    		state.bookSet = JSON.parse(localStorage.getItem("curBook")) || [];
			if(state.bookSet.length == 0){
				book.num = 1;
				state.bookSet[0] = book;
			}else{
				let flag = true;
				state.bookSet.forEach(function(v,i){
					if(v.name == book.name){
						v.num++;
						flag = false;
					}
				});
				if(flag){
					book.num = 1;
					state.bookSet = state.bookSet.concat(book);
				}
			}
			localStorage.setItem("curBook",JSON.stringify(state.bookSet));
			state.bookSet = JSON.parse(localStorage.getItem("curBook"));
   		},
    	getInCart(state){
    		state.bookSet = JSON.parse(localStorage.getItem("curBook"));
    	},
    	delInCart(state,book){
			let collection = JSON.parse(JSON.stringify(state.bookSet));
			state.bookSet.forEach(function(v,i){
				if(v.name == book.name){
					collection.splice(i,1);
				}
			});
			localStorage.setItem("curBook",JSON.stringify(collection));
			state.bookSet = JSON.parse(localStorage.getItem("curBook"));
    	}
    	
	},
	actions:{
		
	}
})

export default store