<template>
	<div class="jackHeader">
		<div class="logo" :class="{homeActive:$route.name=='home'}">
			<router-link to="/">
				<img src="../../assets/logo.png"/>
				<span>Home</span>
			</router-link>
		</div>
		<div class="cartSvg" :class="{cartActive:$route.name=='cart'}">
			<router-link to="/cart">
			</router-link>
			<span>
				{{bookNum}}
			</span>
		</div>
	</div>
</template>

<script>
export default{
	data(){
		return {
			
		}
	},
	computed:{
		bookNum(){
			this.$store.commit("getBookNum");
			return this.$store.state.bookNum;
		}
	},
	method:{
	}
}
</script>

<style scoped>
	.jackHeader{
		position: fixed;
		top: 0;
		width: 100%;
		box-shadow: 0 2px 8px gainsboro;
		background: white;
		z-index: 444;
	}
	.jackHeader .logo{
		float: left;
		height: 2.5rem;
		margin-left: 1rem;
		padding: 0 0.5rem;
	}
	.logo span{
		color: orange;
		font-size: 1.5rem;
	}
	.logo img,.logo a{
		height: 2.5rem;
	}
	.jackHeader .homeActive{
		transform: scale(0.8);
		background: #7ec801;
		border-radius: 4rem;
	}
	.homeActive a span{
		color: white;
	}
	.cartSvg{
		float: right;
		margin-right: 1rem;
		padding: 0 0.5rem;
	}
	.logo img,.logo a,.cartSvg a,.logo span{
		display: inline-block;
		vertical-align: middle;
	}
	.cartSvg a{
		width: 2.5rem;
		height: 2.5rem;
	    background: url(/static/tiny/cart.svg);
	    background-size:2.3rem ;
	}
	.cartSvg span{
		color: white;
		font-weight: bold;
		background: orange;
		text-align: center;
		display: inline-block;
		height: 1.5rem;
		line-height: 1.5rem;
		width: 1.5rem;
		border-radius: 3rem;
	}
	.cartSvg.cartActive{
		background: #7ec801;
		border-radius: 4rem;
	}
</style>