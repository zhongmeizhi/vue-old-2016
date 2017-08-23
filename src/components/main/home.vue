<template>
  <section class="home">
    <laugh></laugh>
    <jack-alert v-if="web && platformAlert" msg="You're not a platform for mobile phones." @alertClose="alertClose"></jack-alert>
  </section>
</template>

<script>
import laugh from "@/components/common/laugh"
import alert from "@/components/common/alert"

export default {
  name: 'home',
  data () {
    return {
    	web: false,
    	platformAlert: true
    }
  },
  mounted() {
	  	this.$nextTick(()=>{
				if(navigator.platform.indexOf("Win")!=-1 || navigator.platform.indexOf("Mac")!=-1){
					this.web = true
					this.platformAlert = sessionStorage.getItem("platformAlert") ? false : true;
				};
	  	})
	},
  components: {
  	"laugh": laugh,
  	"jack-alert": alert
  },
  methods: {
  	alertClose() {
  		this.web=false;
  		sessionStorage.setItem("platformAlert","done");
  	}
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
