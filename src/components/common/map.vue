<template>
	<div>
		<!-- traffic  -->
		<slot></slot>
		<input type="button" id="result" value="查询" @click="traffic"/>
		<!-- Search -->
		<input type="text" id="mapSearch" name="mapSearch" placeholder="address" v-model="mapInput" class="mapSearch">
		<div id="baidu-map" class="baidu-map"></div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				map: "",
				mapInput: "", //详细地址
				local: "",
				transit: "",
				userlocation: {
					lng: "",
					lat: ""
				},
			}
		},
		props: ["start", "end", "customers"],
		mounted() {
			this.$nextTick(function() {
				this.setMap().then(BMap => {
					this.initMap();
				})
			})
		},
		methods: {
			setMap(){
				const key = "DD279b2a90afdf0ae7a3796787a0742e";
				return new Promise((resolve, reject) => {
					window.init = () => {
						resolve(BMap)
					}
					let script = document.createElement("script");
					script.type = "text/javascript";
					script.src = `http://api.map.baidu.com/api?v=2.0&ak=${key}&callback=init`;
					script.onerror = reject;
					document.head.appendChild(script);
				})
			},
			initMap(){
				this.map = new BMap.Map("baidu-map"); // 创建Map实例
				var point = new BMap.Point(121.48, 31.24); // 创建点坐标。地点上海
				var top_right_navigation = new BMap.NavigationControl({
					anchor: BMAP_ANCHOR_TOP_RIGHT,
					type: BMAP_NAVIGATION_CONTROL_SMALL
				}); //右上角
				this.map.centerAndZoom(point, 12);
				this.map.enableScrollWheelZoom(true);
				this.map.addControl(top_right_navigation);

//	建立一个自动完成的对象				
				let ac = new BMap.Autocomplete({
						"input": "mapSearch",
						"location": this.map
					})

				ac.addEventListener("onconfirm", (e)=>{ //鼠标点击下拉列表后的事件
					let _value = e.item.value;
					let myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
					this.mapInput = myValue;
					this.setPlace(myValue);
				});

//	智能搜索地点
				this.local = new BMap.LocalSearch(this.map, 
					{onSearchComplete: this.addMark}
				);

//	导航方式：驾车出行
				this.transit = new BMap.DrivingRoute(this.map, 
					{renderOptions: {map: this.map}, onSearchComplete: this.trafficComplete}
				);
				
				this.customersMark(this.customers);
			},
			addMark(){
				this.userlocation = this.local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
				this.map.addOverlay(new BMap.Marker(this.userlocation)); //添加标注
				if(this.mapInput){
					//	聚焦
					this.map.centerAndZoom(this.userlocation, 17);
				}
			},
			customersMark(customer){
				if(customer.length>0){
					customer.forEach((v, i)=>{
						this.setPlace(v.address);
					})
				}else{
					return;
				}
			},
			setPlace(myV){
				this.map.clearOverlays(); //清除地图上所有覆盖物
				this.local.search(myV);
			},
			traffic(){
				this.map.clearOverlays();
				this.transit.search(this.start, this.end);
			},
			trafficComplete(results) {
				if (this.transit.getStatus() != BMAP_STATUS_SUCCESS) return ;
				let plan = results.getPlan(0);
				let output = `从${this.start}到${this.end}驾车需要${plan.getDuration(true)}${"\n"}总路程为: ${plan.getDistance(true)}`; 
				setTimeout(function(){alert(output)},"500");
			}
		}
	}
</script>

<style scoped>
	.mapSearch {
		width: calc(100% - 6.2rem);
		height: 2rem;
		margin: 2rem;
		padding: 0 1rem;
		font-size: 1.15rem;
	}
	
	.baidu-map {
		height: 30rem;
	}
</style>