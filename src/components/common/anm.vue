<template>
	 <transition v-if="show" @enter="enter">
		<div class="text">
			<p class="step1">每天叫醒你的是什么？</p>
			<object  class="step2" data="/static/tiny/clock.svg" type="image/svg+xml" />
			<p class="step3">不</p>
			<p  class="step4">😍 QwQ 是梦想</p>
			<p class="step5"></p>
		</div>
	</transition>
</template>

<script>
	import  Velocity from 'velocity-animate'
	
	export default{
		data(){
			return {
				show: false
			}
		},
		mounted() {
			this.$nextTick(()=>{
				this.show = true;
			})
		},
		methods: {
			enter(ele){
				// querySelectorAll 获取静态DOM
				let eleAll = ele.querySelectorAll("p,object");
				let [$s1, $s2, $s3, $s4, t$s5] = eleAll;
				// step1，掉下来，被压住
				Velocity($s1,{
					top: "20rem"
				},1000);
				Velocity($s1,{
					rotateX: 45,
					color: "#1a1a1a"
				},{
					duration: 300,
					delay: 800
				});
				// step2 出现+摔下来，反弹一下
				Velocity($s2,{
					opacity: 1,
					rotateZ: -85,
					top: "13.5rem"
				},{
					duration: 1000,
					delay: 1000
				});
				Velocity($s2,{
					translateX: 5,
					rotateZ: -80,
					
				},{
					duration: 300,
					loop: 1
				});
				// step3 展现+由小变大
			}
		}
	}
</script>

<style scoped>
	.text{
		margin: 1rem;
		text-align: center;
		position: relative;
		color: orangered;
		height: 30rem;
		overflow: hidden;
	}
	.text object,.text p{
		position: absolute;
	}
	.step1{
		top: -3rem;
		left: 6rem;				
	}
	.step2{
		opacity: 0;
		left: 7rem;
		width: 7rem;
	}
	.step3{
		top: 50%;
		left: 50%;
	}
</style>