import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
	state:{
		bookSet:[],
		bookNum:0
	},
	mutations: {
    	addToCart(state,book){
    		state.bookSet = getStorage() || [];
			if(state.bookSet.length == 0){
				book.num = 1;
				state.bookSet[0] = book;
			}else{
				let flag = true;
				state.bookSet.forEach((v,i)=>{
					if(v.name == book.name){
						v.num++;
						flag = false;
						return;
					}
				});
				if(flag){
					book.num = 1;
					state.bookSet = state.bookSet.concat(book);
				}
			}
			setStorage(state.bookSet);
			state.bookSet = getStorage();
   		},
    	getInCart(state){
    		state.bookSet = getStorage();
    	},
    	delInCart(state,book){
			let collection = JSON.parse(JSON.stringify(state.bookSet));
			state.bookSet.forEach(function(v,i){
				if(v.name == book.name){
					collection.splice(i,1);
				}
			});
			setStorage(collection);
			state.bookSet = getStorage();
    	},
    	getBookNum(state){
    		state.bookNum = 0;
    		state.bookSet = getStorage();
    		if(state.bookSet==null || state.bookSet=="null"){
    			state.bookNum = 0;
    		}else{
    			state.bookSet.forEach(function(v,i){
    				state.bookNum += v.num 
    			})
    		}
    	}
    	
	},
	actions:{
	}
})

let getStorage = ()=> JSON.parse(localStorage.getItem("curBook"));


let setStorage = (save)=> localStorage.setItem("curBook",JSON.stringify(save));

export default store