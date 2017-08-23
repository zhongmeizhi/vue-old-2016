<template>
	<div>
		<!--  traffic -->
		<slot name="traffic"></slot>
		<!-- Search -->
		<slot name="mapSearch"></slot>		
		<!-- map -->
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
				userlocation: {
					lng: "",
					lat: ""
				}
			}
		},
		props: ['mapInput', 'start', 'end'],
		mounted() {
			this.$nextTick(function() {
				MP().then(BMap => {
					var th = this;
					var map = new BMap.Map("baidu-map"); // 创建Map实例
					var point = new BMap.Point(121.48, 31.24); // 创建点坐标
					var top_right_navigation = new BMap.NavigationControl({
						anchor: BMAP_ANCHOR_TOP_RIGHT,
						type: BMAP_NAVIGATION_CONTROL_SMALL
					}); //右上角
					map.centerAndZoom(point, 12);
					map.enableScrollWheelZoom(true);
					map.addControl(top_right_navigation);

					//	/* baidu API, get local */
					//					var geolocation = new BMap.Geolocation();
					//					geolocation.getCurrentPosition(function(r) {
					//						if(this.getStatus() == BMAP_STATUS_SUCCESS) {
					//							var mk = new BMap.Marker(r.point);
					//							map.addOverlay(mk);
					//							map.panTo(r.point);
					//							alert('您的位置：' + r.point.lng + ',' + r.point.lat);
					//						} else {
					//							alert('failed' + this.getStatus());
					//						}
					//					}, {
					//						enableHighAccuracy: true
					//					})
					
					const $mapSearch = document.getElementById("mapSearch");
					if($mapSearch){
						var ac = new BMap.Autocomplete( //建立一个自动完成的对象
							{
								"input": "mapSearch",
								"location": map
							})
						var myValue;
						ac.addEventListener("onconfirm", function(e) { //鼠标点击下拉列表后的事件
							var _value = e.item.value;
							myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
							this.mapInput = myValue
							setPlace();
						});
	
						function setPlace() {
							map.clearOverlays(); //清除地图上所有覆盖物
							function myFun() {
								th.userlocation = local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
								map.centerAndZoom(th.userlocation, 18);
								map.addOverlay(new BMap.Marker(th.userlocation)); //添加标注
							}
							var local = new BMap.LocalSearch(map, { //智能搜索
								onSearchComplete: myFun
							});
							local.search(myValue);
						}
					}


//	baidu APi, start-end way search;
					var $result = document.getElementById("result");
					if($result){
						var routePolicy = [BMAP_TRANSIT_POLICY_LEAST_TIME, BMAP_TRANSIT_POLICY_LEAST_TRANSFER, BMAP_TRANSIT_POLICY_LEAST_WALKING, BMAP_TRANSIT_POLICY_AVOID_SUBWAYS];
						var transit = new BMap.TransitRoute(map, {
							renderOptions: {
								map: map
							},
							policy: 0
						});
					
						$result.onclick = function() {
							map.clearOverlays();
							
							var $way = document.querySelector("#driving_way select")[0];
							var i = $way.attributes.value;
							search(th.start, th.end, routePolicy[i]);
	
							function search(start, end, route) {
								transit.setPolicy(route);
								transit.search(start, end);
							}
						};
					}

				})
			})
		},
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