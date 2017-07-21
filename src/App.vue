<template>
  <div id="app">
    <jack-header></jack-header>
    <jack-nav></jack-nav>
    <router-view class="content"></router-view>
    <jack-footer></jack-footer>
  </div>
</template>

<script>
import jackNav from '@/components/nav'
import jackHeader from '@/components/header'
import jackFooter from '@/components/footer'
	
export default {
  name: 'app',
	components:{
		jackHeader,
		jackNav,
		jackFooter
	}
}
</script>

<style>
	html,body,div,ul,li,dl,dd,dt,p,span,img,h1,h2,h3,h4,h5,h6,table,td,tr,select,option,input,header,footer,nav,menu,aside,article,section{
			margin: 0;
			padding: 0;
			outline: none;
		}
	html{
		font-size: 16px;
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
				font-size: 12px;
			}
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
