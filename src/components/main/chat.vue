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
		<div class="footer">
			<input type="text" name="talk" id="talk" value="" />
			<div class="talkIcon">
				<span class="face"></span>
				<span class="love"></span>
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
.footer{
	margin-left: -0.6rem ;
	padding: 0.5rem 2rem;
	background: gainsboro;
	position: fixed;
	z-index: 555;
	bottom: 0;
	width: 100%;
	box-sizing: border-box;
	font-size: 0;
}
#talk{
	box-sizing: border-box;
	border: none;
	outline: none;
	height: 2.2rem;
	width: 73%;
	padding-left: 0.6rem;
}
.talkIcon{
	display: inline-block;
	width: 27%;
	height: 2.2rem;
	position: relative;
	vertical-align: top;
}
.face,.love{
	position: absolute;
	display: inline-block;
	height:2.2rem;
	width: 2.2rem;
}
.face{
	background: url(/static/tiny/talk.svg) no-repeat;
	background-size: 2.2rem;
	left: 10%;
}
.love{
	background: url(/static/tiny/love.svg) no-repeat;
	background-size: 2.2rem;
	right: 10%;
}
</style>