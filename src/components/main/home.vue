<template>
  <section class="home">
    <h2>{{msg}}</h2>
    <laugh></laugh>
  </section>
</template>

<script>
import laugh from "@/components/main/section/laugh"

export default {
  name: 'home',
  data () {
    return {
    	msg: "",
    }
  },
  mounted(){
  	this.$nextTick(()=>{
			if(navigator.platform.indexOf("Win")!=-1 || navigator.platform.indexOf("Mac")!=-1){
				alert("Your platform is " + navigator.platform + ". Please use mobile!");
			};
			this.addText();
  	})
  },
  methods:{
  	addText(){
  		var w;
			if(typeof(Worker)!=="undefined"){
				if(typeof(w)=="undefined"){
			    w = new Worker("/static/plug/woker.js");
		    }
			  w.onmessage = (value)=> {
						this.msg = value.data; 
			  };
			}
  	}  
  },
  components: {
  	"laugh": laugh
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	h2{
		min-height: 6rem;
		text-shadow: 0.01rem 0.02rem 0.1rem gray;
	}
</style>
