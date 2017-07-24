<template>
	<div class="book">
		<div class="searchBox">
			<input type="text" name="search" id="search" v-model="search" placeholder="Search your love..."/>
			<select name="orderByPrice">
				<option value="">price(low to high)</option>
				<option value="">price(high to low)</option>
			</select>
		</div>
		<ul class="bookList">
			<li v-for="book in test.books">
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
						<p class="payment">
							<router-link  to="/book/cart" @click.native="savePro(book)">Payment</router-link>
						</p>
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
				test: [],
				search:"",
				bookSet:[],
				sendBooks:[]
			}
		},
		mounted:function(){
			this.$nextTick(function(){
			})
		}
		,
		created: function() {
			this.$http.get('/static/test.json').then((response) => {
				this.test = response.data;
			}).catch(function(response) {
				console.log(response)
			});
		},
		methods:{
			bookSearch:function(search){
			},
			savePro:function(book){
				let nowBooks = localStorage.getItem("curBook");
				if(nowBooks==null || nowBooks == "null"){
					this.bookSet[0] = book;
				}else{
					this.bookSet = JSON.parse(nowBooks).concat(book);
				}
				localStorage.setItem("curBook",JSON.stringify(this.bookSet));
			}
		}
	}
</script>

<style>
	.searchBox{
		margin: 0.3rem 0;
		padding: 0.01rem;
		width: 100%;
	}
	.searchBox label{
		font-size: 1.1rem;
		font-weight: bold;
		color: darkgoldenrod;
	}
	.searchBox label{
	}
	.searchBox input{
		color: black;
		padding: 0.4rem;
		border: 0.02rem gray solid;
	}
	.searchBox input:hover{
		border: 0.02rem blue solid;
	}
	.bookList{
	
	}
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
		color: white;
		background: red;
		border-radius: 2rem;
		cursor: pointer;
	}
	.payment a{
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