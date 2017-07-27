<template>
	<div class="checkout">
		<router-link class="cartIcon" to="/cart">
			<span></span>
		</router-link>
	</div>
</template>

<script>
export default{
	data(){
		return {
			
		}
	}
}
</script>

<style scoped>
.cartIcon span{
	display: inline-block;
	width: 2rem;
	height: 2rem;
	background: url(/static/tiny/cart.svg) no-repeat;
	background-size: 2rem;
}
</style>