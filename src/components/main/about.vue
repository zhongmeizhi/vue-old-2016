<template>
	<section class="about"	>
		<h1>Hi. My name is Jack.</h1>
		<baidu-map></baidu-map>
	</section>
</template>

<script>
import baiduMap from '@/components/main/section/map'
	
export default{
	data(){
		return {
		}
	},
	components:{
		'baidu-map': baiduMap
	}
}
	
</script>

<style scoped>
	.about h1{
		text-align: center;
	}
</style>