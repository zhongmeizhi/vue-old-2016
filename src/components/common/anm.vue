<template>
	 <transition v-if="!show" @enter="enter">
		<div class="text">
			<p class="step1">每天叫醒你的是什么？</p>
			<object  class="step2" data="/static/tiny/clock.svg" type="image/svg+xml" />
			<p class="step3">不</p>
			<p class="step4">是</p>
			<p class="step5">梦</p>
			<p class="step6">想</p>
		</div>
	</transition>
</template>

<script>
	import  Velocity from 'velocity-animate'
	
	export default{
		props: ["show"],
		mounted(){
			this.$nextTick(()=>{
				this.enter();
			})
		},
		methods: {
			enter(ele){
				// querySelectorAll 获取静态DOM
				let eleAll = document.querySelectorAll(".text p,.text object");
				let [$s1, $s2, $s3, $s4, $s5, $s6] = eleAll;
				// step1，掉下来，反弹，被压住
				Velocity($s1,{
					top: "20rem",
				},400);
				Velocity($s1,{
					translateY: -20,
					rotateZ: 1,
					scale: 1.02
				},{
					duration: 200,
					loop: 1
				});
				Velocity($s1,{
					rotateX: 45,
					color: "#1a1a1a",
					scale: 0.5
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
				// step3 展现+由小变大，弹跳
				Velocity($s3,{
					opacity: 1,
					scale: 20
				},{
					duration: 300,
					delay: 2700
				});
				Velocity($s3,{
					scale: 23
				},{
					duration: 100,
					loop: 2
				});
				// step4 出现前，step1,2,3消失
				Velocity($s3,{
					color: "#ffffff"
				},{
					duration: 1,
				});
				// step4 展现+由小变大+旋转
				Velocity([$s4,$s5,$s6],{
					opacity: 1,
					scale: 10,
					rotateZ: 1800
				},{
					duration: 1000,
					delay: 3800
				});
			}
		}
	}
</script>

<style scoped>
	.text{
		margin: 1rem 0;
		text-align: center;
		position: relative;
		color: orangered;
		height: 32rem;
		overflow: hidden;
	}
	.text object,.text p{
		position: absolute;
	}
	.step1{
		top: -3rem;
		left: 2rem;	
		font-size: 1.9rem;
		font-weight: bold;			
	}
	.step2{
		opacity: 0;
		left: 7rem;
		width: 7rem;
	}
	.step3,.step4,.step5,.step6{
		left: 50%;
		opacity: 0;
	}
	.step3{
		top: 40%;
		background: white;
	}
	.step4,.step5,.step6{
		color: black
	}
	.step4{
		top: 15%;
	}
	.step5{
		top: 45%;
	}
	.step6{
		top: 75%;
	}
</style>