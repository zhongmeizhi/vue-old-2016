<template>
	<div class="jackHeader">
		<div class="logo" :class="{homeActive:$route.name=='home'}">
			<router-link to="/">
				<img src="../../assets/logo.png"/>
				<span>Home</span>
			</router-link>
		</div>
		<div class="cartSvg" :class="{cartActive:$route.name=='cart'}">
			<router-link to="/book/cart">
			</router-link>
		</div>
	</div>
</template>

<script>
</script>

<style scoped>
	.jackHeader{
		position: fixed;
		top: 0;
		width: 100%;
		box-shadow: 0 2px 8px gainsboro;
		background: white;
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
		background: orangered;
		border-radius: 4rem;
		color: white;
		font-weight: bold;
	}
	.cartSvg{
		float: right;
		margin-right: 1rem;
	}
	.logo img,.logo a,.cartSvg a,.logo span{
		display: inline-block;
		vertical-align: middle;
	}
	.cartSvg a{
		width: 3.5rem;
		height: 2.3rem;
	    background: url(/static/tiny/cart.svg);
	    background-size:3.5rem 2.3rem ;
	}
	.cartSvg.cartActive{
		background: orangered;
		border-radius: 4rem;
	}
</style>