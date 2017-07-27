<template>
	<div class="book">
		<div class="searchBox clearfix">
			<div class="parentObj">
				<span @click="searchStart()" :class="{active:searchFlag}">
				</span>			
			</div>
			<div class="selectBox">
				<select name="orderByPrice" @change="orderPrice()" v-model="orderRule">
					<option value="low" selected="selected">price(low to high)</option>
					<option value="high">price(high to low)</option>
				</select>
			</div>
			<input v-if="searchFlag" @keydown.enter="searchStart()" @keydown.tab="searchStart()" type="text" name="search" id="search" v-model="search" placeholder="Search..."/>
			<span class="close" v-if="searchFlag" @click="searchFlag=false"></span>
		</div>
		<ul class="bookList">
			<li v-for="book in filterBook.books">
				<div class="bookBox">
					<div class="bookImg">
						<img :alt="book.name" :src="book.img"/>
					</div>
					<div class="bookDetail">
						<p>
							<span>Name: </span>{{book.name}}
						</p>
						<p>
							<span>Author: </span>{{book.author}}
						</p>
						<p>
							<span>Type: </span>{{book.type}}
						</p>
						<p>
							<span>Price: </span>{{book.price}}
						</p>
						<button class="payment">
							<router-link  to="/cart" @click.native="savePro(book)">Payment</router-link>
						</button>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				bookSet:[],
				testBook: [],
				filterBook:[],
				search:"",
				searchFlag:false,
				orderRule:"low"
			}
		},
		mounted(){
			this.$nextTick(function(){
			})
		},
		created() {
			this.$http.get('/static/test.json').then((response) => {
				this.testBook = response.data;
				this.testBook.books.sort(function(a,b){
					return a.price - b.price;
				});
				this.filterBook = JSON.parse(JSON.stringify(this.testBook));
			}).catch(function(response) {
				console.log(response)
			});
		},
		methods:{
			savePro(book){
				this.$store.commit("addToCart",book);
			},
			searchStart(){
				let self = this;
				if(self.searchFlag){
					self.filterBook.books = self.testBook.books.filter(function(v){
						for (var i in v) {
							if(v[i].toString().indexOf(self.search)!=-1){
								return true;
							}
						}
						return false;
					});
				}
				self.searchFlag = !self.searchFlag; 	
			},
			orderPrice(){
				let self = this;
				if (this.orderRule == "low") {
					self.filterBook.books.sort(function(a,b){
						return a.price - b.price;
					})
				} else{
					self.filterBook.books.sort(function(a,b){
						return b.price - a.price;
					})
				}
			},
		}
	}
</script>

<style scoped>
/* filter */
	.searchBox{
		position: relative;
		margin: 0.3rem 2rem;
	}
	.selectBox{
		float: right;
		margin-right: 1rem;
	}
	.parentObj span{
		display: inline-block;
		background: url(/static/tiny/search.svg) no-repeat;
		background-size: 1.8rem;
		height:1.8rem;
		width:1.8rem;
		position: absolute;
		left: 3rem;
	}
	.parentObj span.active{
		z-index: 333;
		left: 0.4rem;
	}
	#search{
		position: absolute;
		height: 2.5rem;
		top: -0.3rem;
		width: 100%;
		z-index: 33;
		padding-left: 2.6rem;
		font-size: 1.2rem;
		box-sizing: border-box;
	}
	.close{
		height: 1.3rem;
		width: 1.3rem;
		position: absolute;
		right: 1rem;
		top: 0;
		bottom: 0;
		margin: auto;
		z-index: 333;
		background: url(/static/tiny/close.svg) no-repeat;
		background-size: 1.3rem;
	}
	.selectBox select{
		font-size: 1.12rem;
		padding: 0.17rem 0.3rem;
		box-sizing: border-box;
		letter-spacing: 0.05rem;
	}
	.selectBox select:focus,.searchBox input:hover{
		outline: 0.18rem solid orchid;
	}
/* book list*/
	.bookBox{
		padding: 0.9rem 2rem;
		overflow: hidden;
	}
	.bookImg{
		width: 50%;
		float: left;
	}
	.bookImg img{
		height: 10.19rem;
	}
	.bookDetail{
		width: 50%;
		float: right;
	}
	.bookDetail p{
		margin: 0.4rem 0;
	}
	.bookDetail .payment{
		text-align: center;
		font-size: 1.1rem;
		font-weight: bold;
		background: orangered;
		border-radius: 2rem;
		cursor: pointer;
		margin-top: 0.43rem;
		width: 100%;
	}
	.payment a{
		color: white;
		padding: 0.4rem 0;
		width: 100%;
		height: 100%;
		display: inline-block;
	}
	.bookDetail p span{
		font-weight: bold;
		display: inline-block;
		width: 50%;
	}
	.bookList li{
		margin: 0.5rem;
		border: 1px solid wheat;
		box-shadow: 0 0 10px gray inset;
	}

</style>