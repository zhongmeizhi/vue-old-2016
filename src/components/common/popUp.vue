<template>
	<transition name="anm">
		<div class="jack-popUp">
			<div class="popUp-box">
				<slot></slot>
				<i @click="popUpClose()"></i>
			</div>
		</div>
	</transition>
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
	.anm-enter-active{
		opacity: 1;
	}
	.anm-enter,.anm-leave-active{
		opacity: 0;
		transform: scale(0.7);
	}
	.jack-popUp{
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		width: 100%;
		height: 100%;
		background: rgba(33, 33, 33, 0.75);
		transition: all 0.4s;
	}
	.popUp-box{
		position: fixed;
		z-index: 2000;
		top: 50%;
		left: 50%;
		transform: translateY(-50%) translateX(-50%);
   		-webkit-transform: translateY(-50%) translateX(-50%);
	}
	.popUp-box i{
		display: inline-block;
		width: 1.5rem;
		height: 1.5rem;
		background: url(~@/../static/tiny/close.svg);
		background-size: 1.5rem;
		position: absolute;
		top: 0.5rem;
		right: 1rem;
	}	
</style>