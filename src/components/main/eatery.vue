<template>
	<section class="about"	>
		
		<div class="customerBox">
			<div>
				<p @click="appearDetail=true">顾客地址列表</p>
			</div>
		</div>
		<!-- Customers List-->
		<jack-popUp v-if="appearDetail" @popUpClose="popUpClose">
			<h3>顾客清单</h3>
			<ul class="content">
				<li v-for="customer in customers">
					<div>
						<p>
							<span class="name">{{customer.name}}</span>
							<span class="phone">{{customer.phone}}</span>
							<span class="food">{{customer.food}}</span>
						</p>
						<p class="address">
							{{customer.address}}
						</p>
					</div>
				</li>
			</ul>
		</jack-popUp>
		<!-- Baidu Map-->
		<baidu-map :start="map.start" :end="map.end" :customers="customers">
			<input type="text" name="start" id="start" v-model="map.start"/>
			<input type="text" name="end" id="end" v-model="map.end"/>
		</baidu-map>
	</section>
</template>

<script>
import baiduMap from '@/components/common/map'
import popUp from "@/components/common/popUp"
	
export default{
	data(){
		return {
			map: {
				start: "",
				end: ""
			},
			customers: [
				{name: "刘先生", food: "猪排饭", address: "中山北路470号", phone: 1868686886},
				{name: "徐先生", food: "上海猪杂饭", address: "广中西路777号", phone: 1383838438},
				{name: "朱女士", food: "哈根达斯", address: "五角场地铁站", phone: 1520520520},
			],
			appearDetail: false
		}
	},
	components:{
		'baidu-map': baiduMap,
		"jack-popUp": popUp
	},
	methods: {
	  	popUpClose() {
	  		this.appearDetail = false;
  		}
  	}
}
	
</script>

<style scoped>
	.about h1{
		text-align: center;
	}
	.popUp-box h3{
		position: absolute;
		text-indent: 3rem;
		top: 0.5rem;
	}
</style>