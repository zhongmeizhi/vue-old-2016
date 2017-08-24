<template>
	<div>
		<!--traffic  -->
		<input type="button" id="result" value="查询" @click="traffic"/>
		<!-- Search -->
		<input type="text" id="mapSearch" name="mapSearch" placeholder="address" v-model="mapInput" class="mapSearch">
		<div id="baidu-map" class="baidu-map"></div>
	</div>
</template>
<script>
	let MP = () => {
		const key = "DD279b2a90afdf0ae7a3796787a0742e";
		return new Promise((resolve, reject) => {
			window.init = () => {
				resolve(BMap)
			}
			var script = document.createElement("script");
			script.type = "text/javascript";
			script.src = `http://api.map.baidu.com/api?v=2.0&ak=${key}&callback=init`;
			script.onerror = reject;
			document.head.appendChild(script);
		})
	}

	export default {
		data() {
			return {
				map: "",
				mapInput: "", //详细地址
				transit: "",
				userlocation: {
					lng: "",
					lat: ""
				},
//				start: "",
//				end: ""
			}
		},
		props: ["start", "end"],
		mounted() {
			this.$nextTick(function() {
				MP().then(BMap => {
					this.map = new BMap.Map("baidu-map"); // 创建Map实例
					var point = new BMap.Point(121.48, 31.24); // 创建点坐标
					var top_right_navigation = new BMap.NavigationControl({
						anchor: BMAP_ANCHOR_TOP_RIGHT,
						type: BMAP_NAVIGATION_CONTROL_SMALL
					}); //右上角
					this.map.centerAndZoom(point, 12);
					this.map.enableScrollWheelZoom(true);
					this.map.addControl(top_right_navigation);

					//	/* baidu API, get local */
					//					var geolocation = new BMap.Geolocation();
					//					geolocation.getCurrentPosition(function(r) {
					//						if(this.getStatus() == BMAP_STATUS_SUCCESS) {
					//							var mk = new BMap.Marker(r.point);
					//							this.map.addOverlay(mk);
					//							map.panTo(r.point);
					//							alert('您的位置：' + r.point.lng + ',' + r.point.lat);
					//						} else {
					//							alert('failed' + this.getStatus());
					//						}
					//					}, {
					//						enableHighAccuracy: true
					//					})

					var ac = new BMap.Autocomplete( //建立一个自动完成的对象
						{
							"input": "mapSearch",
							"location": this.map
						})
					var myValue;
					ac.addEventListener("onconfirm", function(e) { //鼠标点击下拉列表后的事件
						var _value = e.item.value;
						myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
						this.mapInput = myValue
						setPlace();
					});

					var setPlace = ()=> {
						this.map.clearOverlays(); //清除地图上所有覆盖物
						var myFun = ()=> {
							this.userlocation = local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
							this.map.centerAndZoom(this.userlocation, 18);
							this.map.addOverlay(new BMap.Marker(this.userlocation)); //添加标注
						}
						var local = new BMap.LocalSearch(this.map, { //智能搜索
							onSearchComplete: myFun
						});
						local.search(myValue);
					}


//	baidu APi, start-end way search;
					  var output = "从上地到西单驾车需要";
						var searchComplete = (results)=> {
							if (this.transit.getStatus() != BMAP_STATUS_SUCCESS){
								return ;
							}
							var plan = results.getPlan(0);
							output += plan.getDuration(true) + "\n";                //获取时间
							output += "总路程为：" ;
							output += plan.getDistance(true) + "\n";             //获取距离
						}
						this.transit = new BMap.DrivingRoute(this.map, {renderOptions: {map: this.map},
							onSearchComplete: searchComplete,
							onPolylinesSet: function(){        
								setTimeout(function(){alert(output)},"1000");
						}});
				})
			})
		},
		methods: {
			traffic(){
				this.map.clearOverlays();
				this.transit.search("富锦路", "中山北路");
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