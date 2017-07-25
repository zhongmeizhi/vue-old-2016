<template>
	<div class="abc">
		<table>
			<tr>
				<th>Header</th>
			</tr>
			<tr>
				<td>Data</td>
			</tr>
		</table>
	</div>
</template>

<script scoped>
	export default {
		data() {
			return {
				msg: []
			}
		},
		methods: {
			
		},
//		mounted: function() {
//			this.$http.get("http://211.149.193.19:8080/api/customers").then(
//				function(res) {
//					// 处理成功的结果
//					this.msg = res.body;
//					console.log(this.msg)
//				},
//				function(res) {
//					// 处理失败的结果
//				}
//			);
//		},
	}
</script>

<style>

</style>