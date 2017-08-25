<template>
	<div class="jack-popUp">
		<div class="popUp-box">
			<slot></slot>
			<i @click="popUpClose()"></i>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		methods:{
			popUpClose(){
				this.$emit("popUpClose", true)
			}
		}
	}
</script>

<style scoped>
	.jack-popUp{
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		width: 100%;
		height: 100%;
		background: rgba(33, 33, 33, 0.75);
	}
	.popUp-box{
		position: fixed;
		z-index: 2000;
		top: 50%;
		left: 50%;
		transform: translateY(-50%) translateX(-50%);
   		-webkit-transform: translateY(-50%) translateX(-50%);
	}
	.popUp-box .content{
		width: 21rem;
		border-radius: 1rem;
	    background: white;
   		padding: 2.5rem 1.5rem 2rem;
	}
	.popUp-box i{
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