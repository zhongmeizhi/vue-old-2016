<template>
  <div id="app">
    <router-view></router-view>
    <jack-nav></jack-nav>
  </div>
</template>

<script>
import jackNav from '@/components/nav'
	
export default {
  name: 'app',
	components:{jackNav},
}
</script>

<style>
.app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
