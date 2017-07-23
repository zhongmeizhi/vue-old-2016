<template>
	<div class="book">
		<div class="searchBox">
			<label for="search">Search Books: </label>
			<input type="text" name="search" id="search" v-model="search" />
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
				search:""
			}
		},
		created: function() {
			this.$http.get('/static/test.json').then((response) => {
				this.test = response.data;
			}).catch(function(response) {
				console.log(response)
			});
		},
		methods:{
			bookSearch:function(search){
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
	.searchBox label,.searchBox input{
		font-size: 1.1rem;
		font-weight: bold;
		color: darkgoldenrod;
	}
	.searchBox label{
	}
	.searchBox input{
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
		margin: 1rem 0;
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
	.bookList li:hover{
		border: 1px solid wheat;
		box-shadow: 0 0 10px orange inset;
	}
</style>