<template>
  <div class="laugh">
    <div class="joke">
    	<h2>Laugh Daily</h2>
    	<ul>
			<li v-for="(joke,index) in jokes">
				<b>Joke&nbsp;{{index+1}}:</b>{{joke.content}}
			</li>
		</ul>
		<button @click="addJokes">Add More</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
    	jokes: []
    }
  },
 	mounted() {
 		this.$nextTick(()=>{
	 		this.addJokes();
 		})
	},
  methods:{
  	addJokes(){
  		this.$http.get("https://bird.ioliu.cn/joke/rand?type=text").then(
			res=> {
				let data =  res.data.data;
				data.forEach((v,i)=>{
					this.jokes.push(v);
				})
			},
			res=> {
				this.jokes = res;
			}
		);
  	}
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.joke h2{
	text-align: center;
	color: #7ec801;
}
.joke li{
	border: 0.1rem solid orange;
	border-radius: 0.3rem;
	padding: 0.3rem;
	margin: 0.5rem 0.3rem;
}
.joke li b{
	color: green;
}
.joke button{
	margin-right: 2rem;
	background: #7ec801;
	color: white;
	height: 2.8rem;
	font-size: 1.26rem;
	font-weight: bold;
	width: 100%;
	animation: add 0.5s infinite;
}
@keyframes add {
	from{
		transform:scale(1.03); 
	}
	to{
		transform:scale(0.97);
	}
}
</style>
