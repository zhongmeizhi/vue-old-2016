<template>
	<div class="jackHeader">
		<router-link to="/">
			<div class="logo">
				<img src="../assets/logo.png"/>
				<span>Home</span>
			</div>
		</router-link>
	</div>
</template>

<script>
</script>

<style scoped>
	.jackHeader{
		position: absolute;
		top: 0;
		width: 100%;
		box-shadow: 0 0 5px gainsboro inset;
	}
	.jackHeader .logo,.jackHeader .logo img{
		height: 3rem;
		line-height: 3rem;
		font-size: 1.5rem;
	}
	.jackHeader .logo{
		text-align: center;
		cursor: pointer;
	}
	.jackHeader .logo span{
		display: inline-block;
		vertical-align: top;
		color: orange;
	}
</style>