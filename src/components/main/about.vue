<template>
	<section class="about"	>
		<h1>
			Hi. My name is Jack.<br />
			<a href="https://github.com/zhongmeizhi" class="gitHub">
				Into My GitHub
			</a>
		</h1>
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
				    w = new Worker("static/plug/woker.js");
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
	.gitHub{
		color: #7ec801;
		text-shadow: 0.1rem 0.1rem 0.1rem green;
		padding: 0 1.2rem;
		background: gainsboro;
		border-radius: 0.6rem;
	}
</style>