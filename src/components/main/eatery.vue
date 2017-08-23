<template>
	<section class="about"	>
		<baidu-map>
			<div id="driving_way" slot="traffic">
				<input type="start" name="start" id="start" v-model="start"/>
				<input type="end" name="end" id="end" v-model="end"/>
				<select>
					<option value="0">最少时间</option>
					<option value="1">最少换乘</option>
					<option value="2">最少步行</option>
					<option value="3">不乘地铁</option>
				</select>
				<input type="button" id="result" value="查询"/>
			</div>
			<input slot="mapSearch" type="text" id="mapSearch" name="mapSearch" placeholder="Where do you want to go..." v-model="mapInput" class="mapSearch" mapInput="mapInput">
		</baidu-map>
	</section>
</template>

<script>
import baiduMap from '@/components/common/map'
	
export default{
	data(){
		return {
			mapInput: "",
			start: "",
			end: ""
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