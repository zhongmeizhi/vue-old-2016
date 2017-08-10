<template>
	<section class="chat" >
<!-- note chat box-->
		<div class="note" :class="{active:imgOpen||emojiOpen}" @click="faceTF(0,0)">
			<div v-for="chat in curData" :class="chat.people" class="clearfix">
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
				<swiper-slide  class="emojiBox" v-for="(emojiPage,i) in emojiSet" key="emojiPage">
					<span v-for="(emoji,j) in emojiPage" @click="sendEmoji(i,j)" :title="emoji.key" key="emoji">
						{{emoji.value}}
					</span>	
				</swiper-slide>
				<div class="swiper-pagination" slot="pagination"></div>
			</swiper>
			<div class="send" @click="sendSay">
				Send
			</div>
		</div>
<!-- img swipe-->
		<div class="booth" :class="{active:imgOpen}">
			<swiper :options="swiperOption" ref="mySwiper" >
				<swiper-slide class="imgBox" v-for="(imgPage,i) in imgSet" key="imgPage">
					<p v-for="(img,j) in imgPage" key="img" @click="sendImg(i,j)">
						<i :style="img" class="imgCell"></i>
					</p>
				</swiper-slide>
				<div class="swiper-pagination" slot="pagination"></div>
			</swiper>
		</div>
<!-- say input box-->
		<div class="footer" :class="{active:imgOpen||emojiOpen}">
			<input  v-focus-input type="text" name="talk" id="talk" value="" v-model="setSay" @keydown.enter="sendSay" @focus="faceTF(0,0)"/>
			<div class="talkIcon">
				<span class="face" @click="faceTF(1,0)"></span>
				<span class="love" @click="faceTF(0,1)"></span>
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
				initData: [
					{people:"self",saying:"Ah, summer, what power you have to make us suffer and like it？"},
					{people:"other",saying:"Due to love. Because hot."},
					{people:"other",saying:"Summer is coming, haha. winter be far behind."},
				],
				curData:[],
				swiperOption: {
					pagination: '.swiper-pagination',
					paginationClickable: true,					
				}
			}
		},
		mounted() {
			this.$nextTick(()=> {
// curData
				if(sessionStorage.getItem("curData")==null){
					this.curData = this.initData;
					sessionStorage.setItem("curData",JSON.stringify(this.curData))
				}else{
					this.curData = JSON.parse(sessionStorage.getItem("curData"));
				};
//
				setTimeout(()=>{
					this.getEmoji();
					this.getImgs();
//  other response.
//	Simulation of the other letter
					setInterval(()=>{
						if(this.curData.length%3 != 0){
							this.otherResponse();
						}
					},1000);
				});
				this.noteDown();
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
// ES6 结构赋值插入变量真的很好用
						let emoji = `background-position: -${W}px -${H}px;`; 
						this.imgSet[page].push(emoji);
					}
				};
// 图片最后一个不是表情 
				this.imgSet[2].pop();
			},
			sendImg(i,j){
				let curImg = {people:"self",imgStyle:this.imgSet[i][j]};
				this.saveChatData(curImg);
				this.noteDown();
			},
			sendSay(){
				this.saveChatData({people:"self",saying:this.setSay});
				this.setSay = "";
				this.noteDown();
			},
			faceTF(emoji,img){
				this.emojiOpen = emoji;
				this.imgOpen = img;
				if(emoji || emoji){
					this.noteDown();
				}
			},
			noteDown(){
			//	when user are send message，
			//	then note will move to down
				setTimeout(()=>{
					document.getElementsByTagName("body")[0].scrollTop=999999;
				},0)
			},
			saveChatData(data){
				let oldData = JSON.parse(sessionStorage.getItem("curData"));
				oldData.push(data);
				sessionStorage.setItem("curData",JSON.stringify(oldData));
				this.curData = JSON.parse(sessionStorage.getItem("curData"));
			},
			otherResponse(){
				this.saveChatData({people:"other",saying:"hello world!"});
			//	receive other response ,
			//	when user are browsing history，
			//	then note don't move to down
				let $body = document.getElementsByTagName("body")[0];
				let scrollHeight = $body.scrollHeight;
				let scrollTop = $body.scrollTop;
				let innerHeight = window.innerHeight;
				if(scrollHeight-scrollTop-innerHeight<50){
					this.noteDown();
				}
			}
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
	.note{
		min-height: calc(100% - 9rem);
		transition: all 0.5s;
	}
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
	    transition: all 0.5s;
	}
	.booth .send{
		opacity: 0;
		transition: all 0.3s; 
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
	.note.active{
		padding-bottom: 17.8rem;
	}
	.booth.active{
		height: 14.5rem;
	}
	.booth.active .send{
		opacity: 1;
		position: absolute;
	    bottom: 5%;
    	right: 10%;
    	border: gray 0.2rem solid;
    	border-radius: 0.3rem;
    	padding: 0.1rem 0.3rem;
    	z-index: 789;
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