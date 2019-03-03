<template>
	<section class="book">
		<div class="searchBox clearfix">
			<div class="parentObj">
				<span @click="searchFilter()" :class="{active:searchFlag}">
				</span>			
			</div>
			<div class="selectBox">
				<select name="orderByPrice" @change="orderPrice()" v-model="orderRule">
					<option disabled="disabled" value="">popular</option>
					<option value="low">price(low to high)</option>
					<option value="high">price(high to low)</option>
				</select>
			</div>
			<transition name="search">
				<input v-if="searchFlag" @keydown.enter="searchFilter()" @keydown.tab="searchFilter()" type="text" name="search" id="search" v-model="search" placeholder="Search..."/>
			</transition>
			<span class="close" v-if="searchFlag" @click="searchFlag=false"></span>
		</div>
		<ul class="bookList">
			<li v-for="book in filterBook.books" :key="book.productID">
				<div class="bookBox">
					<div class="bookImg">
						<img :alt="book.name" :src="'@/..' + book.img"/>
					</div>
					<div class="bookDetail">
						<template v-for="(value,key) in book">
							<p v-if="key!=='productID' && key!='img'" :key="key">
								<span>{{key}}</span>{{value}}
							</p>
						</template>
						<button class="payment">
							<router-link  to="/cart" @click.native="savePro(book)">Buy Now</router-link>
						</button>
					</div>
				</div>
			</li>
		</ul>
	</section>
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
				orderRule:""
			}
		},
		mounted(){
			this.$nextTick(()=> {
			})
		},
		created() {
			this.$http.get('@/../static/test.json').then((response) => {
				this.testBook = response.data;
				this.filterBook = JSON.parse(JSON.stringify(this.testBook));
			}).catch(function(response) {
				console.error(response)
			});
		},
		methods:{
			savePro(book){
				this.$store.commit("addToCart",book);
			},
			searchFilter(){
				if(this.searchFlag){
					this.filterBook.books = this.testBook.books.filter(v => {
						for (var i in v) {
							if(v[i].toString().indexOf(this.search)!=-1){
								return true;
							}
						}
						return false;
					});
				}
				this.searchFlag = !this.searchFlag; 	
			},
			orderPrice(){
				this.filterBook.books.sort((a,b) => {
					return  this.orderRule == "low" ? a.price - b.price : b.price - a.price;
				})
			},
		}
	}
</script>

<style scoped>
	.search-leave-active{
		transition: all 1s;
		opacity: 0;
	}
	.search-enter{
		opacity: 0;
	}
	.search-enter-to{
		transition: all 1s;
		opacity: 1;
	}
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
		background: url(~@/../static/tiny/search.svg) no-repeat;
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
		background: url(~@/../static/tiny/close.svg) no-repeat;
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
		text-transform: uppercase;
	}
	.bookList li{
		margin: 0.5rem;
		border: 1px solid wheat;
		box-shadow: 0 0 10px gray inset;
	}

</style>