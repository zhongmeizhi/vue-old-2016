<template>
	<section class="checkout">
		<div class="cartIcon">
			<router-link to="/cart"></router-link>		
		</div>
		<div class="infoBox">
			<ul>
				<li v-show="login" @click="login=!login">Fast Buy</li>
				<li v-show="!login" @click="login=!login">Sign In</li>
			</ul>
		</div>
		<!-- login -->
		<jack-login v-if="login"></jack-login>
		<!-- new Info -->
		<jack-ship v-else></jack-ship>
	</section>
</template>

<script>
	import ship from "@/components/main/section/ship/shipBox"
	import login from "@/components/main/section/ship/loginBox"
	
	export default{
		data(){
			return {
				login:false
			}
		},
		components: {
			"jack-ship": ship,
			"jack-login": login
		}
	}
</script>

<style scoped>
	.checkout{
		margin-top: 3.8rem;
	}
	.cartIcon{
		text-align: center;
		margin: 1rem 0;
	}	
	.cartIcon a{
		display: inline-block;
		width: 3rem;
		height: 3rem;
		background: url(~@/../static/tiny/cart.svg) no-repeat;
		background-size: 2.8rem;
	}
	.infoBox{
		margin: 0 1rem;
	}
	.infoBox li{
		display: inline-block;
		width: 100%;
		height: 3rem;
		text-align: center;
		border-radius: 0.4rem;
		background: orange;
		color: white;
		font: 1.2rem/3rem arial bold;
	}
	.infoBox li:first-child{
		margin-bottom: 1.3rem;
	}
</style>