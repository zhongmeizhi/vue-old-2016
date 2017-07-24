<template>
	<div class="cart">
		<ul v-for="book in nowBooks" >
			<li>{{book.name}}</li>
			<li>{{book.author}}</li>
			<li>{{book.type}}</li>
			<li>{{book.price}}</li>
			<li>{{book.img}}</li>
			<li>number</li>
		</ul>
	</div>
</template>

<script>
export default{
	data() {
		return {
			nowBooks: [],
		}
	},
	mounted:function(){
		this.$nextTick(function(){
			this.getBooks();
		})
	},
	watch:{
	},
	methods:{
		getBooks:function(){
			this.nowBooks = JSON.parse(localStorage.getItem("curBook"))
		}
	},
}
</script>

<style>
</style>