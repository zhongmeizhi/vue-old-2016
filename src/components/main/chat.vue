<template>
	<section class="chat" :class="{active:imgOpen||emojiOpen}">
		<!-- note chat box-->
		<div class="note">
			<div v-for="chat in chatData" :class="chat.people" class="clearfix">
				<i class="head"></i>
				<p v-if="chat.saying" class="chatSay">
					<span>{{chat.saying}}</span>
				</p>
				<p v-else  class="chatImg">
					<span class="imgCell" :style="chat.imgStyle"></span>
				</p>
			</div>
		</div>
		<!-- emoji swipe-->
		<div  class="booth" :class="{active:emojiOpen}">
			<swiper :options="swiperOption" ref="mySwiper">
				<swiper-slide  class="emojiBox" v-for="(emojiPage,i) in emojiSet">
					<span v-for="(emoji,j) in emojiPage" @click="sendEmoji(i,j)" :title="emoji.key">
						{{emoji.value}}
					</span>	
				</swiper-slide>
				<div class="swiper-pagination" slot="pagination"></div>
			</swiper>
		</div>
		<!-- img swipe-->
		<div class="booth" :class="{active:imgOpen}">
			<swiper :options="swiperOption" ref="mySwiper" >
				<swiper-slide class="imgBox" v-for="(imgPage,i) in imgSet" key="imgPage">
					<p v-for="(img,j) in imgPage" key="img">
						<i @click="sendImg(i,j)"   :style="img" class="imgCell"></i>
					</p>
				</swiper-slide>
				<div class="swiper-pagination" slot="pagination"></div>
			</swiper>
		</div>
		<!-- say input box-->
		<div class="footer" :class="{active:imgOpen||emojiOpen}">
			<input  v-focus-input type="text" name="talk" id="talk" value="" v-model="setSay" @keydown.enter="sendSay" @focus="emojiOpen = false;imgOpen = false;"/>
			<div class="talkIcon">
				<span class="face" @click="emojiOpen = true;imgOpen = false;"></span>
				<span class="love" @click="imgOpen = true;emojiOpen = false;"></span>
			</div>
		</div>
	</section>
</template>

<script scoped>
	export default {
		data() {
			return {
				emojiSet: [],
				emojiOpen: false,
				imgSet: [],
				imgOpen: false,
				setSay:"",
				chatData: [
					{people:"self",saying:"Ah, summer, what power you have to make us suffer and like it？"},
					{people:"other",saying:"Due to love. Because hot."},
					{people:"other",saying:"Summer is coming, haha. winter be far behind."},
				],
				swiperOption: {
					pagination: '.swiper-pagination',
					paginationClickable: true,					
				}
			}
		},
		mounted() {
			this.$nextTick(()=> {
				if(navigator.platform.indexOf("Win")!=-1 || navigator.platform.indexOf("Mac")!=-1){
//	  				alert(navigator.platform + " can't display emoji. ");
				}
				this.getEmoji();
				this.getImgs();
			})
		},
		methods: {
			getEmoji(){
				let row = 3;
				let column = 6;
				let pageNum = row * column;
				this.$http.get("/static/emoji.json").then((res)=> {
					res.data.people.forEach((v,i)=> {
						let page = Math.floor(i/pageNum);
						if(this.emojiSet[page]==undefined || this.emojiSet[page]=="undefined" ){
							this.emojiSet[page] = [];
						}
						this.emojiSet[page].push(v);
					})
				})
			},
			sendEmoji(i,j){
				let curEmoji = this.emojiSet[i][j].value;
				this.setSay += curEmoji;
			},
			getImgs(){
				let disply = {
					row: 2,
					column: 4
				}
				let space = {
					startX: 11,
					startY: 18,
					spaceX: 65,
					spaceY:102,
					width:61,
					heigh:47,
					cell:7,
					row:3,
				};
				let pageNum= disply.row * disply.column;
				let cellNext = (num)=> space.startX + space.width*num + space.spaceX*num/2;	
				let rowNext = (num)=> space.startY + space.heigh*num + space.spaceY*num/2;
				for (let i=0; i<space.row; i++) {
					let H = rowNext(i);
					for (let j=0; j<space.cell; j++) {
						let W = cellNext(j);
						let page = Math.floor((i*space.cell+j)/pageNum);
						if(this.imgSet[page]==undefined || this.imgSet[page]=="undefined" ){
							this.imgSet[page] = [];
						}
						let emoji = 'background-position: -'+ W +'px -'+ H+'px;'; 
						this.imgSet[page].push(emoji);
					}
				};
				// 图片最后一个不是表情 
				this.imgSet[2].pop();
			},
			sendImg(i){
				let curImg = {people:"self",imgStyle:this.imgSet[i]};
				this.chatData.push(curImg);
			},
			sendSay(){
				this.chatData.push({people:"self",saying:this.setSay});
				this.setSay = "";
			},
		},
		directives:{
			focusInput:{
				inserted(ele,bind,vNode){
					ele.focus();
				}
			}
		}
	}
</script>

<style scoped>
	/* chatBox*/
	.self .chatSay,.other .chatSay{
		border-radius: 0.4rem;
		max-width: 58%;
		padding: 0.2rem 1.3rem;
		font-size: 1.1rem;
		margin: 0.3rem;
	}
	.other .chatImg,.other .head,.other .chatSay{
		float: left;
	}
	.self .chatImg,.self .chatSay,.self .head{
		float: right;
	}
	.self .chatSay{
		background: aquamarine;
	}
	.other .chatSay{
		background: #F5DEB3;
	}
	.self .head{
		background: url(/static/tiny/talk.svg) no-repeat aquamarine;
	}
	.other .head{
		background: url(/static/tiny/talk.svg) no-repeat #F5DEB3;
	}
	.self .head,.other .head{
		background-size: 1.81rem;
		width: 1.81rem;
		height: 1.81rem;
		border-radius: 50%;
		margin: 0.3rem 0;
		position: relative;
	}
	/* imgBox */
	.emojiBox{
	    height: 14rem;
	}
	.booth{
		position: fixed;
	    margin-right: 0.6rem;
	    bottom: 0;
		height: 0;
	    overflow: hidden;
	    z-index: 33;
	    background: gainsboro;
	    width: 100%;
	    margin-left: -0.6rem;
	}
	.imgBox p{
		width: 25%;
		display: inline-block;
		text-align: center;
	}
	.imgCell{
		display: inline-block;
		width: 66px;
		height: 60px;
		background: url(/static/books/emoji.png) no-repeat;
	}
	.imgBox .imgCell{
		margin: 1rem 0;
	}
	/* emoji Box*/
	.emojiBox span{
		width: 16.6666%;
	    vertical-align: middle;
	    display: inline-block;
	    font: 2.2rem/4rem arial;
	    text-align: center;
	}
	/* footer talkBox*/
	.footer{
		margin-left: -0.6rem ;
		padding-left: 1.3rem;
		height: 3rem;
		line-height: 3rem;
		background: gainsboro;
		position: fixed;
		z-index: 22;
		bottom: 0;
		width: 100%;
		box-sizing: border-box;
		font-size: 0;
	}
	#talk,.talkIcon,.face,.love{
		height: 2.2rem;
	}
	#talk{
		box-sizing: border-box;
		border: none;
		outline: none;
		width: 73%;
		padding-left: 0.6rem;
		vertical-align: middle;
	}
	.talkIcon{
		width: 27%;
		position: relative;
		display: inline-block;
		vertical-align: middle;
	}
	.face,.love{
		position: absolute;
		display: inline-block;
		width: 2.2rem;
	}
	.face{
		background: url(/static/tiny/talk.svg) no-repeat;
		background-size: 2.2rem;
		left: 13%;
	}
	.love{
		background: url(/static/tiny/love.svg) no-repeat;
		background-size: 2.2rem;
		right: 13%;
	}
	/* active*/
	.chat.active{
		padding-bottom: 17.8rem;
	}
	.booth.active{
		transition: all 0.5s;
		height: 14.5rem;
	}
	.footer.active{
		transition: all 0.5s;
		padding-bottom: 17.5rem;
	}
	/* bench swipe */
	.booth .swiper-pagination{
		bottom: 0;
	}

</style>