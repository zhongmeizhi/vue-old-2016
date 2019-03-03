<template>
	<section class="about"	>
		
		<div class="customerBox">
			<div>
				<span class="customerDetail" @click="appearDetail=true">顾客详情</span>
				<span class="customerShow" @click="getLocation">当前地址</span>
				<span class="customerShow" @click="customerShow">显示顾客</span>
			</div>
		</div>
		<!-- Customers List-->
		<jack-popUp v-show="appearDetail" @popUpClose="popUpClose">
			<h3>顾客清单</h3>
			<ul class="pop-content">
				<li v-for="customer in customers" class="customer" :key="customer.id">
					<p>
						<span class="name">{{customer.name}}</span>
						<span class="phone">{{customer.phone}}</span>
						<span class="food">{{customer.food}}</span>
					</p>
					<p class="address">
						{{customer.address}}
						<button @click="goToPosition(customer.address)">到这去</button>
					</p>
				</li>
			</ul>
		</jack-popUp>
		<!-- Baidu Map-->
		<baidu-map  :customers="customers" ref="sonMap"></baidu-map>
	</section>
</template>

<script>
import baiduMap from '@/components/common/map'
import popUp from "@/components/common/popUp"
	
export default{
	data(){
		return {
			customers: [
				{id: 1, name: "刘先生", food: "猪排饭", address: "上海市中山北路470号3号楼", phone: 1868686886},
				{id: 2, name: "徐先生", food: "上海猪杂饭", address: "上海市广中西路777号多媒体大厦", phone: 1383838438},
				{id: 3, name: "朱女士", food: "哈根达斯", address: "上海市五角场地铁站", phone: 1520520520},
				{id: 4, name: "梁女士", food: "必胜客披萨", address: "上海市浦东新区郭守敬路498号", phone: 1581001011},
				{id: 5, name: "范女士", food: "必胜客披萨", address: "上海市浦东新区耀华支路39弄9号", phone: 1581008611},
				{id: 6, name: "贾先生", food: "必胜客披萨", address: "上海市徐汇区田林路487号20号楼", phone: 1581258011},
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
  		},
  		goToPosition(end){
  			this.popUpClose();
//	更改子组件属性end，调用子组件的方法traddic();
  			this.$refs.sonMap.end = end;
  			this.$refs.sonMap.traffic();
  		},
  		customerShow(){
  			this.$refs.sonMap.customersMark(this.customers);
  		},
  		getLocation(){
  			this.$refs.sonMap.getLocation();
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
	.pop-content{
		width: 21rem;
		border-radius: 1rem;
	    background: white;
   		padding: 2.5rem 1.5rem 2rem;
	}
	.customerBox{
		text-align: center;
	}
	.customerBox .customerDetail, .customerBox .customerShow{
		display: inline-block;
		text-align: center;
		font: bold 1.1rem/1.5rem arial;
		border: 0.1rem dotted black;
		border-radius: 1rem;
		background: rgba(111,111,111,0.2);
		padding: 0.3rem 1rem;
	}
	.pop-content .customer{
		outline: solid 0.1rem gray;
		margin: 0.5rem 0;
		padding: 0.5rem;
	}
	.pop-content span{
		padding-right: 0.5rem;
	}
	.pop-content button{
		background: none;
		float: right;
	}
</style>