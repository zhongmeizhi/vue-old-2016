<template>
	<header class="jackHeader">
		<div class="logo" :class="{homeActive:$route.name=='home'}">
			<router-link to="/">
				<img src="../../assets/logo.png"/>
				<span>Home</span>
			</router-link>
		</div>
		<div class="cartSvg" :class="{cartActive:$route.name=='cart'}">
			<router-link to="/cart">
				<span>
					{{bookNum}}
				</span>
			</router-link>
		</div>
	</header>
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
		transition: all 0.8s;
	}
	.logo span{
		color: orange;
		font-size: 1.5rem;
		text-shadow: 0.1rem 0.1rem 0.1rem sienna;
	}
	.logo img,.logo a{
		height: 2.5rem;
	}
	.jackHeader .homeActive{
		background: #7ec801;
		border-radius: 4rem;
		transform: scale(0.8);
		transition: all 0.8s;
	}
	.homeActive a span{
		color: white;
	}
	.cartSvg{
		float: right;
		margin-right: 1rem;
		padding: 0 0.5rem;
		transition: all 0.8s;
	}
	.logo img,.logo a,.cartSvg a,.logo span{
		display: inline-block;
		vertical-align: middle;
	}
	.cartSvg a{
		width: 2.5rem;
		height: 2.5rem;
	    background: url(/static/tiny/cart.svg) no-repeat;
	    background-size:2.3rem ;
	    padding-right: 1.4rem;
	    position: relative;
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
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0.1rem;
		margin: auto;
	}
	.cartSvg.cartActive{
		background: #7ec801;
		border-radius: 4rem;
		transition: all 0.8s;
	}
</style>