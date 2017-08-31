<template>
	<div class="shipBox">
		<ul class="shipList">
			<li v-for="list in shipList">
				 <!--@click="upLabel(list)"-->
				<label :class="{active:list.name==curName}" :for="list.name">{{list.label}}</label>
				<input :type="list.type" :name="list.name" :id="list.name"  @focus="upLabel(list)" @blur="downLabel(list)"/>
			</li>
		</ul>
		<div class="confirm">
			<router-link to="/payment/alipay">
				<button>Alipay 模拟</button>
			</router-link>	
			<router-link to="/payment/wechat">
				<button>WeChat 模拟</button>
			</router-link>
		</div>
	</div>

</template>

<script>
	export default{
		data() {
			return {
				shipList:[
					{label:"Name",type:"text",name:"name"},
					{label:"Address",type:"text",name:"address"},
					{label:"Phone",type:"tel",name:"phone"}
				],
				curName:"",
			}
		},
		methods:{
			upLabel(list){
				this.curName = list.name;
			},
			downLabel(list){
				this.curName = "";
			}
		}
	}
</script>

<style scoped>
	.shipList{
		margin: 0 1rem;
	}
	.shipList li{
		position: relative;
		margin: 1.3rem 0;
	}
	.shipList label{
		position: absolute;
		z-index: 55;
		color: gray;
		display: inline-block;
		margin-left: 1.4rem;
		padding: 0 0.2rem;
		background: white;
		font-size: 1.2rem;
		top: 1.36rem;
		transition: all 0.6s;
	}
	.shipList input{
		height: 4rem;	
		width: 100%;
		padding-left: 0.81rem;
		border: 0.1rem gainsboro solid;
		border-radius: 0.3rem;
		box-sizing: border-box;
		font-size: 1.2rem;
	}
	.shipList label.active{
		top: -0.74rem;
		transition: all 0.6s;
	}
	.confirm button{
		margin-right: 2rem;
		float: right;
		border-radius: 4rem;
		background: #7ec801;
		color: white;
		width: 12rem;
		height: 2.8rem;
		font-size: 1.26rem;
		font-weight: bold;
	}
</style>