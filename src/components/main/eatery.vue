<template>
	<section class="about"	>
		<input type="start" name="start" id="start" v-model="map.start" :start="map.start"/>
		<input type="end" name="end" id="end" v-model="map.end" :end="map.end"/>
		<baidu-map></baidu-map>
	</section>
</template>

<script>
import baiduMap from '@/components/common/map'
	
export default{
	data(){
		return {
			map: {
				start: "",
				end: ""
			}
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