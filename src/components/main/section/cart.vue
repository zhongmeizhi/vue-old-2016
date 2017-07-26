<template>
	<div class="cart">
		<hr />
		<div  v-if="total">
			<div v-for="book in getBooks" class="bookList clearfix">
				<div class="bookL"><img :src="book.img" alt="book.name" /></div>
				<div class="bookR">
					<ul>
						<li class="name"><p>{{book.name}}</p></li>
						<li>
							<p>Price:</p>
							<span>￥{{book.price}}</span>
						</li>
						<li class="number">
							<p>Number:</p>
							<b  @click="count(book)" class="reduce"></b>
							<span>{{book.num}}</span>
							<b  @click="count(book,'add')" class="reduce"></b>
						</li>
					</ul>
					<div class="subTotal">
						<p>SubTotal:</p>
						<span>￥{{book.num * book.price}}</span>
					</div>
					<b class="closeP" @click="closePro(book)"></b>
				</div>
			</div>
			<hr />
			<div class="total">Total:&nbsp;<span>￥{{total}}</span></div>
		</div>
		
		<div class="cartEmpty" v-if="!total">
			<object data="/static/tiny/cry.svg" type="image/svg+xml"></object>
			<h1>
				OH. NO!
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
	    		return sum;
	    	}catch(e){
	    		return null;
	    	}
	    },
	},
	watch:{
	},
	methods:{
		count(book,param){
			this.$store.state.bookSet.forEach(function(v,i){
				if(v.name == book.name){
					if (param=="add") {
						v.num++;
					} else{
						if(v.num!=1){
							v.num--;
						}
					}
				}
			});
			localStorage.setItem("curBook",JSON.stringify(this.$store.state.bookSet));
		},
		closePro(book){
			this.$store.commit("delInCart",book);
		}
	},
}
</script>

<style scoped>
.bookList{
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
.bookR .closeP{
	position: absolute;
	top: 0.3rem;
	right: 1rem;
	width: 1.3rem;
	height: 1.3rem;
	background: url(/static/tiny/close.svg) no-repeat;
	background-size: 1rem;
}
.bookR span{
	font-weight: 500;
	letter-spacing: 0.1rem;
}
.number .reduce,.number .add{
	width: 1.2rem;
	height: 1.2rem;
	display: inline-block;
	vertical-align: text-top;
}
.number .reduce{
	background: url(/static/tiny/reduce.svg) no-repeat;
	background-size: 1.2rem;
}
.number .add{
	background: url(/static/tiny/add.svg) no-repeat;
	background-size: 1.2rem;
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
	margin: 1.5rem auto;
	width: 80%;
}
.cartEmpty h1{
	color: orangered;
	text-align: center;
}
</style>