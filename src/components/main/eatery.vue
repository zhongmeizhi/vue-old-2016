<template>
	<section class="about"	>
		
		<div class="customerBox">
			<ul>
				<li v-for="customer in customers">
					{{customer.address}}
				</li>
			</ul>
		</div>
		<baidu-map :start="map.start" :end="map.end" :customers="customers">
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
			},
			customers: [
				{name: "刘先生", food: "猪排饭", address: "中山北路470号"},
				{name: "徐先生", food: "上海猪杂饭", address: "广中西路777号"},
				{name: "朱女士", food: "哈根达斯", address: "五角场地铁站"},
			]
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