<template>
  <div id="app">
    <jack-header></jack-header>
    <jack-nav v-if="true"></jack-nav>
    <router-view class="content"></router-view>
    <jack-footer></jack-footer>
  </div>
</template>

<script>
import jackNav from '@/components/common/nav'
import jackHeader from '@/components/common/header'
import jackFooter from '@/components/common/footer'

export default {
  name: 'app',
	components:{
		jackHeader,
		jackNav,
		jackFooter
	},
}
</script>

<style>
	html,body,div,ul,li,dl,dd,dt,p,span,img,h1,h2,h3,h4,h5,h6,table,td,tr,select,option,input,header,footer,nav,menu,aside,article,section{
			margin: 0;
			padding: 0;
			outline: none;
		}
	html{
		font-size: 15px;
	}
	@media only screen and (min-width:426px ) {
			html{
				font-size: 18px;
			}
	}
	@media only screen and (min-width:321px) and (max-width:376px ) {
			html{
				font-size: 14px;
			}
	}
	@media only screen and (max-width:321px ) {
			html{
				font-size: 13px;
			}
	}
	ul{
		list-style: none;
	}
	a{
			text-decoration: none;
			cursor: pointer;
			color: black;
		}
	.content{
		padding:0 0.6rem 3.1rem 0.6rem;
	}
</style>
