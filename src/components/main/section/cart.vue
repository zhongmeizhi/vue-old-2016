<template>
	<div class="cart">
		<ul v-for="book in getBooks" class="bookList">
			<li><img :src="book.img" alt="book.name" /></li>
			<li>Name: <span>{{book.name}}</span></li>
			<li>SubTotal: <span>{{book.price}}</span></li>
			<li>number: <span>{{book.num}}</span></li>
		</ul>
		<div>Total:<span>{{total}}</span></div>
	</div>
</template>

<script scoped>
export default{
	data() {
		return {
			nowBooks: [],
		}
	},
	created:function(){
		this.$nextTick(function(){
		})
	},
	computed:{
		getBooks () {
		  this.$store.commit('getInCart');
	      return this.$store.state.cartBook;
	    };
	    total(){
	    	this
	    }
	},
	watch:{
	},
	methods:{
	},
}
</script>

<style>
.bookList li{
	
}
</style>