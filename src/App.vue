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
	.content{
		padding:0 0.6rem 3.1rem 0.6rem;
	}
</style>
