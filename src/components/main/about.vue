<template>
	<section class="about"	>
		<h1>Hi. My name is Jack.</h1>
		<h2>{{msg}}</h2>
	</section>
</template>

<script>
	
export default{
	data(){
		return {
			msg: "",
		}
	},
	mounted(){
	  	this.$nextTick(()=>{
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
}
	
</script>

<style scoped>
	.about h1{
		text-align: center;
		margin: 2rem 0;
	}
	h2{
		min-height: 6rem;
		text-indent: 4rem;
		color: goldenrod;
	}
</style>