<template>
	<div>
		<!-- traffic  -->
		<slot></slot>
		<!-- Search -->
		<div id="baidu-map" class="baidu-map"></div>
		<!-- popUp 组件-->
		<jack-popUp v-show="pop.appear"  @popUpClose="pop.appear=false">
			<p v-html="pop.output"></p>
		</jack-popUp>
	</div>
</template>
<script>
	import popUp from "@/components/common/popUp"
	
	export default {
		data() {
			return {
				map: "",
				local: "",
				transit: "",
				ico: "",
				pop: {
					output: "",
					appear: false
				},
				start: {
					lng: "",
					lat: "",
					start: ""
				},
				end: ""
			}
		},
		props: [ "customers"],
		mounted() {
			this.$nextTick(function() {
				this.setMap().then(BMap => {
					this.initMap();
				})
			})
		},
		methods: {
			setMap() {
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
			initMap() {
				this.map = new BMap.Map("baidu-map"); // 创建Map实例
				var point = new BMap.Point(121.48, 31.24); // 创建点坐标。地点上海
				var top_right_navigation = new BMap.NavigationControl({
					anchor: BMAP_ANCHOR_TOP_RIGHT,
					type: BMAP_NAVIGATION_CONTROL_SMALL
				}); //右上角
				this.map.centerAndZoom(point, 12);
				this.map.enableScrollWheelZoom(true);
				this.map.addControl(top_right_navigation);
				//	ico标记
				this.icon = new BMap.Icon('/static/tiny/location.ico', new BMap.Size(32, 32), {
					anchor: new BMap.Size(16, 32)
				});

				//	智能搜索地点
				this.local = new BMap.LocalSearch(this.map, {
					onSearchComplete: this.addMark
				});

				//	导航方式：驾车出行
				this.transit = new BMap.DrivingRoute(this.map, {
					renderOptions: {
						map: this.map
					},
					onSearchComplete: this.trafficComplete
				});
				//	获取当前位置
				this.getLocation();
				//	标记现有顾客
				this.customersMark(this.customers);
			},
			showLocation(position) {
				// H5 获取地址
				this.start.lng = position.coords.longitude;
				this.start.lat = position.coords.latitude;
				let gpsPoint = new BMap.Point(this.start.lng, this.start.lat);
				console.log(gpsPoint);				
				
				// 百度地图矫正H5经纬度
				let translateCallback = (data) => {
					if(data.status === 0) {
						let markergps = new BMap.Marker(data.points[0], {
							icon: this.icon
						});
						this.map.addOverlay(markergps); //添加GPS标注  
						this.map.setCenter(data.points[0]);
						// 矫正经纬度
						this.start.lng = data.points[0].lng;
						this.start.lat = data.points[0].lat;
					}
				}

				setTimeout(function() {
					var convertor = new BMap.Convertor();
					var pointArr = [];
					pointArr.push(gpsPoint);
					convertor.translate(pointArr, 1, 5, translateCallback)
				}, 1000);

			},
			errorHandler(err) {
				if(err.code == 1) {
					this.pop.appear = true;
					this.pop.output = "不能定位到当前位置。";
					alert()
				} else if(err.code == 2) {
					this.pop.appear = true;
					this.pop.output =  "当前经纬度不可用。";
				}
			},
			getLocation() {
				if(navigator.geolocation) {
					let options = { timeout: 6000 };
					navigator.geolocation.getCurrentPosition(this.showLocation, this.errorHandler, options);
				} else {
					alert("Sorry, browser does not support geolocation!");
				}
			},
			addMark() {
				let userlocation = this.local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
				let mark = new BMap.Marker(userlocation);
				this.map.addOverlay(mark); //添加标注
			},
			customersMark(customer) {
				if(customer.length > 0) {
					customer.forEach((v, i) => {
						this.setPlace(v.address);
					})
				} 
			},
			setPlace(myV) {
				this.map.clearOverlays(); //清除地图上所有覆盖物
				this.local.search(myV);
			},
			traffic() {
				this.map.clearOverlays();
				//  获取当前位置
				this.start.start = new BMap.Point(this.start.lng, this.start.lat);
				this.transit.search(this.start.start, this.end);
			},
			trafficComplete(results) {
				if(this.transit.getStatus() != BMAP_STATUS_SUCCESS) return;
				let plan = results.getPlan(0);
				this.pop.output = `到${this.end}驾车需要${plan.getDuration(true)}</br>总路程为: ${plan.getDistance(true)}`;
				this.pop.appear = true;
			}
		},
		components: {
			"jack-popUp": popUp
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
	.popUp-box p{
		background: white;
		width: 18rem;
		padding: 2rem 1.5rem;
		font: 1rem/1.5rem arial;
		color: gray;
		border-radius: 1rem;
	}
</style>