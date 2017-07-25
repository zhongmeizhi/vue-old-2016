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
    		console.log(nowBooks);
			if(!nowBooks){
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
					state.bookSet = state.cartBook.concat(book);
				}
			}
			localStorage.setItem("curBook",JSON.stringify(state.bookSet));
			state.cartBook = JSON.parse(localStorage.getItem("curBook"));
   		},
    	getInCart(state){
    		state.cartBook = JSON.parse(localStorage.getItem("curBook"));
    	}
    	
	},
	actions:{
		
	}
})

export default store