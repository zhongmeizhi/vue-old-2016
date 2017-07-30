<template>
	<div class="abc">
		<h2>Jokes API, Random of ten </h2>
		<div class="emoji">
			<div :style="imgStyle"></div>
		</div>
		<div class="emoji">
			<div v-for="img in imgSet">
				<div v-for="emoji in img">
					<div :style="emoji" class="emojiCell">
						
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script scoped>
	export default {
		data() {
			return {
				imgStyle:'',
				imgSet:[]
			}
		},
		methods: {
		},
		mounted() {
			this.$nextTick(()=> {
				this.getImg();
				console.log(this.imgStyle)
			})
		},
		methods: {
			getImg(){
				let space = {
					spaceX: 0.1,
					spaceY: 0.1,
					startX: 0,
					startY: 0,
					width:30.5,
					heigh:30.5,
					cell:14,
					row:8
				};
				this.imgStyle = 'background: url(/static/books/emoji.jpg) no-repeat -'+ space.startX +'px -'+ space.startY +'px;'; 
				
				let cellNext = (num)=> {
					return	space.startX + space.width*num + space.spaceX*num/2;	
				}
				let rowNext = (num)=> {
					return	space.startY + space.heigh*num + space.spaceY*num/2;
				} 
				
				for (let i=0; i<space.row; i++) {
					let H = rowNext(i);
					this.imgSet[i] = [];
					for (let j=0; j<space.cell; j++) {
						let W = cellNext(j);
						let emoji = 'background: url(/static/books/emoji.jpg) no-repeat -'+ W +'px -'+ H+'px;'; 
						this.imgSet[i].push(emoji);
						console.log(this.imgSet)
					}
				}
			}
		}
	}
</script>

<style>
.emoji div.emojiCell{
	width: 30px;
	height: 30px;
}
</style>