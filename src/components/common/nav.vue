<template>
	<nav class="jackNav">
		<ul>
			<li v-for="nav in menu.list" :class="{navActive:nav.link==$route.name}">
<!-- :href 跳转的是url不是hash，需要route设置mode:"history" -->
				<!--<a :href="nav.link">{{nav.name}}</a>-->
				
<!-- router-link的to写成v-bind:to后可以支持data插入，router-link链接是hash跳转 -->
				<router-link  v-bind:to="{name:nav.link}">{{nav.name}}</router-link>
			</li>
		</ul>
	</nav>
</template>

<script>
export default{
	name: 'JackNav',
	data (){
		return {
	    	menu: {
	    		list: [
	    			{name:"Chat",link:"chat"},
	    			{name:"Shop",link:"book"},
	    			{name:"Laugh",link:"laugh"},
	    			{name:"About",link:"about"}
	    		]
	    	}
		}
	},
	mounted(){
		this.$nextTick(function(){
		})
	}
}
</script>

<style scoped>
	.jackNav .navActive{
		transform: scale(0.8);
		background: #7ec801;
		border: 0.1rem solid black;
		transition: all 0.8s;
	}
	.jackNav{
		margin: 3.3rem 0.6rem 0 0.6rem;
	}
	.jackNav ul{
		text-align: center;
	}
	.jackNav ul li{
		display: inline-block;
		margin: 0 0.2rem 0.37rem;
		border: 0.1rem solid gray;
		border-radius: 5rem;
		background: orange;
		transition: all 0.8s;
	}
	.jackNav ul li a{
		display: inline-block;
		padding: 0.2rem 0.8rem;
		color: white;
		font-size: 1.2rem;		
	}
</style>