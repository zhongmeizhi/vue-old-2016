<template>
	<div class="jackHeader">
		<div class="logo">
			<router-link to="/">
				<img src="../../assets/logo.png"/>
				<span>Home</span>
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
		height: 3rem;
		margin-left: 1rem;
	}
	.jackHeader .logo span{
		display: inline-block;
		vertical-align: middle;
		color: orange;
		font-size: 1.5rem;
	}
	.jackHeader .logo img{
		vertical-align: middle;
		height: 2.5rem;
	}
</style>