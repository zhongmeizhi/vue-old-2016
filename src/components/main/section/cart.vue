<template>
	<div class="cart">
		<hr />
		<div  v-if="total!=null">
			<div v-for="book in getBooks" class="bookList">
				<div class="bookL"><img :src="book.img" alt="book.name" /></div>
				<div class="bookR">
					<ul>
						<li class="name"><p>{{book.name}}</p></li>
						<li class="number">
							<p>Number:</p>
							<span class="reduce">-</span>
							<span>{{book.num}}</span>
							<span class="add">+</span>
						</li>
						<li>
							<p>Price:</p>
							<span>￥{{book.price}}</span>
						</li>
					</ul>
					<div class="subTotal">
						<p>SubTotal:</p>
						<span>￥{{book.num * book.price}}</span>
					</div>
				</div>
			</div>
			<hr />
			<div class="total">Total:&nbsp;<span>￥{{total}}</span></div>
		</div>
		
		<div class="cartEmpty" v-if="total==null">
			<object data="/static/tiny/cry.svg" type="image/svg+xml"></object>
			<h1>
				CART IS EMPTY...
				<br />
				I WANT SOMETHING...
			</h1>
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
	      return this.$store.state.bookSet;
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
	padding: 0.8rem 1rem;
}
.bookList .bookL{
	float: left;
}
.bookList .bookR{
	height: 10.18rem;
	padding: 0.6rem 1.5rem;
	box-sizing: border-box;
	background-color: rgba(84, 264, 237, 0.05);
	margin-left: 7.34rem;
	position: relative;
}
.bookL,.bookL img{
	height: 10.18rem;
	width: 7.34rem;
}
.bookR .name{
	text-align: center;
	font-size: 1.3rem;
	font-weight: 500;
	letter-spacing: 0.6rem;
}
.subTotal{
	position: absolute;
	bottom: 0.35rem;
	right: 1rem;
}
.subTotal p{
	display: inline-block;
}
.bookR li,.subTotal{
	padding: 0.2rem;
	font-size: 1.1rem;
}
.bookR li:not(.name) p{
	display: inline-block;
	width: 55%;
}
.bookR span{
	font-weight: 500;
	letter-spacing: 0.1rem;
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
.cartEmpty object{
	display: block;
	margin: 1.5rem auto 2.5rem;
	width: 80%;
}
.cartEmpty h1{
	color: orangered;
	text-align: center;
}
</style>