<template>
	<div class="checkout">
		<div class="cartIcon">
			<router-link to="/cart"></router-link>		
		</div>
		<div class="shipBox">
			<ul class="shipList">
				<li>
					<label v-labelUp :class="{active:true}">Name</label>
					<input type="text" name="name" id="name" />
				</li>
				<li>
					<label v-labelUp>Address</label>
					<input type="text" name="address" id="address" />
				</li>
				<li>
					<label v-labelUp>Phone</label>
					<input type="tel" name="phone" id="phone" />
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default{
	data(){
		return {
			
		}
	},
	directives:{
		labelUp(ele,bind,vNode){
			ele.onclick = function(){
			}
		}
	}
}
</script>

<style scoped>
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
	z-index: 2;
	top: 0;
	color: gray;
	display: inline-block;
	padding-left: 1.8rem;
	line-height: 4rem;
	background: white;
}
.shipList input{
	padding: 0 0.71rem;
	border: 0.1rem gainsboro solid;
	border-radius: 0.3rem;
}
.shipList label,.shipList input{
	height: 4rem;	
	width: 100%;
	box-sizing: border-box;
	font-size: 1.2rem;
}
.shipList label.active{
	height: 0;
	top: -50%;
}
</style>