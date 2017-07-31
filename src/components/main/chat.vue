<template>
	<div class="chat">
		<div>
			<h2>Emoji Face</h2>
			<div class="say">
				{{curEmoji}}
			</div>
			<div class="emojiBox">
				<span v-for="(emoji,index) in emojiSet" @click="sendEmoji(index)" :title="emoji.key">
					{{emoji.value}}
				</span>
			</div>
		</div>
		<div>
			<h2>Picture Face</h2>
			<div class="text" v-html="curImg">
			</div>
			<div class="imgBox">
				<span @click="sendImg(index)" v-for="(img,index) in imgSet"  :style="img" class="imgCell"></span>
			</div>
		</div>
	</div>
</template>

<script scoped>
	export default {
		data() {
			return {
				emojiSet:[],
				curEmoji:"",
				imgSet:[],
				curImg:"",
			}
		},
		mounted() {
			this.$nextTick(()=> {
				this.getEmoji();
				this.getImgs();
			})
		},
		methods: {
			getEmoji(){
				this.$http.get("/static/emoji.json").then((res)=> {
					res.data.people.forEach((v,i)=> {
						this.emojiSet.push(v);
					})
				})
			},
			sendEmoji(i){
				this.curEmoji = this.emojiSet[i].value;
			},
			getImgs(){
				let space = {
					startX: 0,
					startY: 0,
					width:31,
					heigh:31,
					cell:14,
					row:8,
				};
				let cellNext = (num)=> space.startX + space.width*num;	
				let rowNext = (num)=> space.startY + space.heigh*num;
				for (let i=0; i<space.row; i++) {
					let H = rowNext(i);
					for (let j=0; j<space.cell; j++) {
						let W = cellNext(j);
						let emoji = 'background-position: -'+ W +'px -'+ H+'px;'; 
						this.imgSet.push(emoji);
					}
				}
			},
			sendImg(i){
				this.curImg = '<span style="'+ this.imgSet[i] +'" class="imgCell"></span>'
			}
		}
	}
</script>

<style>
.imgBox{
	border: 0.1rem solid orange;
	border-radius: 0.2rem;
}
.imgCell{
	display: inline-block;
	width: 30px;
	height: 29px;
	background: url(/static/books/emoji.jpg) no-repeat;
}
.say,.text{
	min-height: 3rem;
}
</style>