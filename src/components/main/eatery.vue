<template>
	<section class="about"	>
		<baidu-map :start="map.start" :end="map.end">
			<input type="text" name="start" id="start" v-model="map.start"/>
			<input type="text" name="end" id="end" v-model="map.end"/>
		</baidu-map>
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