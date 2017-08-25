<template>
  <section class="home">
  	<!-- laugh -->
    <laugh></laugh>
    <!-- popUp -->
    <jack-popUp v-if="web && platformPopUp" @popUpClose="popUpClose">
    	<p class="pop-content">{{msg}}</p>
    </jack-popUp>
  </section>
</template>

<script>
import laugh from "@/components/common/laugh"
import popUp from "@/components/common/popUp"

export default {
  name: 'home',
  data () {
    return {
    	msg: "You're not a platform for mobile phones.",
    	web: false,
    	platformPopUp: true
    }
  },
  mounted() {
	  	this.$nextTick(()=>{
				if(navigator.platform.indexOf("Win")!=-1 || navigator.platform.indexOf("Mac")!=-1){
					this.web = true
					this.platformPopUp = sessionStorage.getItem("platformPopUp") ? false : true;
				};
	  	})
	},
  components: {
  	"laugh": laugh,
  	"jack-popUp": popUp
  },
  methods: {
  	popUpClose() {
  		this.web=false;
  		sessionStorage.setItem("platformPopUp","done");
  	}
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.pop-content{
		font: bold 1.3rem/2.2rem "arial, helvetica, sans-serif";
		color: orange;
		width: 21rem;
		border-radius: 1rem;
    background: white;
		padding: 2.5rem 1.5rem 2rem;
	}
</style>
