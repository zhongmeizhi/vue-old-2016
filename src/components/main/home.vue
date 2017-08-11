<template>
  <section class="home">
    <h2>{{msg}}</h2>
  </section>
</template>

<script>

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
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
