<template>
	<section class="about"	>
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