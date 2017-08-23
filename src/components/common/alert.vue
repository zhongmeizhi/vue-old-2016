<template>
	<div class="jack-alert">
		<div class="alert-context">
			<p>{{msg}}</p>
			<i @click="alertClose()"></i>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		props:['msg'],
		methods:{
			alertClose(){
				this.$emit("alertClose", true)
			}
		}
	}
</script>

<style scoped>
	.jack-alert{
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		width: 100%;
		height: 100%;
		background: rgba(33, 33, 33, 0.75);
	}
	.alert-context{
		height: 10rem;
		width: 18rem;
		background: white;
		position: absolute;
		z-index: 2000;
		top: 50%;
		left: 50%;
		margin: -5rem 0 0 -9rem;
		border-radius: 1rem;
	}
	.alert-context p{
		font: bold 1.3rem/2.2rem "arial, helvetica, sans-serif";
		color: orange;
	    position: absolute;
	    top: 50%;
   		transform: translateY(-50%);
   		-webkit-transform: translateY(-50%);
   		padding: 0 1.5rem;
	}
	.alert-context i{
		display: inline-block;
		width: 1.5rem;
		height: 1.5rem;
		background: url(/static/tiny/close.svg);
		background-size: 1.5rem;
		position: absolute;
		top: 0.5rem;
		right: 1rem;
	}
</style>