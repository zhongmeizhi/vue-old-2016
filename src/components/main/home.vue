<template>
  <div class="home">
    <h2>{{addText()}}</h2>
  </div>
</template>

<script>

export default {
  name: 'home',
  data () {
    return {
    	welcome: "Welcome to my blog. This is vue project of wap. Just for practice.",
    	msg: "",
    	num: 0,
    }
  },
  computed:{
  },
  watch:{
  },
  methods:{
  	addText:function(){
  		let self = this;
  		let welcomeLen = self.welcome.length;
  		let tot = setTimeout(function(){
  				if (self.num<welcomeLen) {
	  				self.msg += self.welcome[self.num];
	  				self.num++;
	  			} else{
	  				clearTimeout(tot);
	  			}
  			},50)
  		return this.msg;
  	}  
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
