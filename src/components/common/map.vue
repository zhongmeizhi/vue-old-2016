<template>
	<div>
		<!-- traffic  -->
		<slot></slot>
		<input type="button" id="result" value="查询" @click="traffic" />
		<!-- Search -->
		<div id="baidu-map" class="baidu-map"></div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				map: "",
				local: "",
				transit: "",
				curPosition: {
					lg: "",
					la: ""
				},
				ico: ""
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
				this.map.centerAndZoom(point, 14);
				this.map.enableScrollWheelZoom(true);
				this.map.addControl(top_right_navigation);
				//	ico标记
				this.icon = new BMap.Icon('/static/tiny/man.ico', new BMap.Size(32, 32), {
					anchor: new BMap.Size(16, 16)
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
				let longitude = position.coords.longitude;
				let latitude = position.coords.latitude;
				let gpsPoint = new BMap.Point(longitude, latitude);

				let translateCallback = (data) => {
					if(data.status === 0) {
						let markergps = new BMap.Marker(data.points[0], {
							icon: this.icon
						});
						this.map.addOverlay(markergps); //添加GPS标注  
						this.map.setCenter(data.points[0]);
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
					console.error("Error: Access is denied!");
				} else if(err.code == 2) {
					console.error("Error: Position is unavailable!");
				}
			},
			getLocation() {
				if(navigator.geolocation) {
					let options = {
						timeout: 6000
					};
					navigator.geolocation.getCurrentPosition(this.showLocation, this.errorHandler, options);
				} else {
					alert("Sorry, browser does not support geolocation!");
				}
			},
			addMark() {
				let userlocation = this.local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
				let mark = new BMap.Marker(userlocation);
				this.map.addOverlay(mark); //添加标注
				mark.setLabel(new BMap.Label(this.local.ga.sd));
			},
			customersMark(customer) {
				if(customer.length > 0) {
					customer.forEach((v, i) => {
						this.setPlace(v.address);
					})
				} else {
					return;
				}
			},
			setPlace(myV) {
				this.map.clearOverlays(); //清除地图上所有覆盖物
				this.local.search(myV);
			},
			traffic() {
				this.map.clearOverlays();
				this.transit.search(this.start, this.end);
			},
			trafficComplete(results) {
				if(this.transit.getStatus() != BMAP_STATUS_SUCCESS) return;
				let plan = results.getPlan(0);
				let output = `从${this.start}到${this.end}驾车需要${plan.getDuration(true)}${"\n"}总路程为: ${plan.getDistance(true)}`;
				setTimeout(function() {
					alert(output)
				}, "500");
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