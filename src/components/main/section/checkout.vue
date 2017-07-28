<template>
	<div class="checkout">
		<div class="cartIcon">
			<router-link to="/cart"></router-link>		
		</div>
		<div class="infoBox">
			<ul>
				<li v-if="newInfo" @click="login=!login,newInfo=false" :class="{active:newInfo}">Sign In</li>
				<li v-if="login" @click="newInfo=!newInfo,login=false" :class="{active:login}">Fast Buy</li>
			</ul>
		</div>
		<!-- new Info -->
		<div class="shipBox" v-if="newInfo">
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
		<!-- login -->
		<div class="oldInfo" v-if="login">
			<ul>
				<li>
					<h1>
						There will be become... Sign In!<br />
						But, I don't want to do.
					</h1>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default{
	data(){
		return {
			shipList:[
				{label:"Name",type:"text",name:"name"},
				{label:"Address",type:"text",name:"address"},
				{label:"Phone",type:"tel",name:"phone"}
			],
			curName:"",
			newInfo:true,
			login:false
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
.checkout{
	margin-top: 3.8rem;
}
.cartIcon{
	text-align: center;
	margin: 1rem 0;
}	
.cartIcon a{
	display: inline-block;
	width: 3rem;
	height: 3rem;
	background: url(/static/tiny/cart.svg) no-repeat;
	background-size: 2.8rem;
}
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
.infoBox{
	margin: 0 1rem;
}
.infoBox li{
	display: inline-block;
	width: 100%;
	height: 3rem;
	text-align: center;
	border-radius: 0.4rem;
	background: #7ec801;
	color: white;
	font: 1.2rem/3rem arial bold;
}
.infoBox li:first-child{
	margin-bottom: 1.3rem;
}
.infoBox li.active{
	background: orange;
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