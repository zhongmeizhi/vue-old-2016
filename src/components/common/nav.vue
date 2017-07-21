<template>
	<div class="jackNav">
		<ul>
			<li v-for="nav in menu.list">
<!-- :href 跳转的是url不是hash，需要route设置mode:"history" -->
				<!--<a :href="nav.link">{{nav.name}}</a>-->
				
<!-- router-link的to写成v-bind:to后可以支持data插入，router-link链接是hash跳转 -->
				<router-link  v-bind:to="{name:nav.link}">{{nav.name}}</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
export default{
	name: 'JackNav',
	data (){
		return {
	    	menu: {
	    		list: [
	    			{name:"Practice",link:"abc"},
	    			{name:"Book",link:"book"},
	    			{name:"VR",link:"vr"},
	    			{name:"About",link:"about"}
	    		]
	    	}			
		}
	}
}
</script>

<style scoped>
	.jackNav{
		margin: 3.2rem 0.6rem 0 0.6rem;
	}
	.jackNav ul li{
		display: inline-block;
		margin: 0 0.2rem 0.2rem 0.2rem;
		border: 0.1rem solid gray;
		border-radius: 5rem;
		background: orange;
	}
	.jackNav ul li a{
		display: inline-block;
		padding: 0.2rem 0.8rem;
		color: white;
		font-size: 1.2rem;		
	}
</style>