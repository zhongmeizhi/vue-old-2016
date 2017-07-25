<template>
	<div class="cart">
		<div v-for="book in getBooks" class="bookList" v-if="total!=null">
			<div class="bookL"><img :src="book.img" alt="book.name" /></div>
			<div class="bookR">
				<ul>
					<li class="name"><span>{{book.name}}</span></li>
					<li class="number">
						number:
						<span class="reduce">-</span>
						<span>{{book.num}}</span>
						<span class="add">+</span>
					</li>
					<li>price:<span>{{book.price}}</span></li>
					<li>subTotal:<span>{{book.num * book.price}}</span></li>
				</ul>
			</div>
			<div class="total">Total:&nbsp;￥<span>{{total}}</span>RMB</div>
		</div>
		<div class="proNull" v-if="total==null">
			Cart is blank lo...
		</div>
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
	    },
	    total(){
	    	let sum = 0;
	    	try{
	    		this.getBooks.forEach(function(v,i){
		    		sum += v.price * v.num
		    	})
	    	}catch(e){
	    		return null;
	    	}
	    	return sum;
	    }
	},
	watch:{
	},
	methods:{
	},
}
</script>

<style>
.bookList{
	overflow: hidden;
}
.bookList li img{
}
.bookList .bookL{
	float: left;
	width: 35%;
}
.bookList .bookR{
	float: right;
	width: 65%;
}
.bookR .name{
	text-align: center;
	font-size: 1.1rem;
	font-weight: 450;
}
.number .reduce,.number .add{
	background: gainsboro;
	font-weight: bold;
	padding: 0.1rem 0.3rem;
	color: blue;
}
.total{
	text-align: right;
	padding: 0.1rem 0.2rem;
	font-weight: bold;
	font-size: 1.2rem;
}
.total span{
	color: orangered;
	letter-spacing: 0.1rem;
}
</style>