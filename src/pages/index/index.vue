<template>
	<view class="bg">
				<!-- 预设文本 -->
		<view class="drawer-title" v-if="msgList.length<=0">
				欢迎来到小熊智答（GTP3.5）
		</view>
		<scroll-view scroll-with-animation :scroll-y="true" style="width: 100%;height: 90%;" :scroll-into-view="intoindex"> 
			<!-- 消息 -->
			<view scroll-with-animation id="messageContainer">
				<view class="flex-column-start" v-for="(o,i) in msgList" :key="i" :id="'text'+i">
					<!-- 用户提问-->
					<view v-if="o.my" class="userinfo">
						<view class="flex justify-end my-info">
							<view class="usermsg" style="max-width: 500rpx;">
								<text style="word-break: break-all;font-size: 13px;">{{id+o.msg}}</text>
							</view>
							<view class="chat-img" style="margin-left:20rpx ;">
								<image style="height: 80rpx;width: 80rpx;" src="../../static/avatar.png" mode="aspectFit"></image>
							</view>
						</view>
					</view>
					<!-- AI回复 -->
					<view v-if="!o.my" class="aiinfo">
						<view class="chat-img ">
							<image style="height: 80rpx;width: 80rpx;" src="../../static/chatgpt.png" mode="scaleToFill">
							</image>
						</view>
						<view class="flex" style="max-width: 500rpx;">
							<view class="aimsg" style="border-radius: 35rpx;background-color: #f9f9f9;">
								<text style="word-break: break-all;font-size: 13px;">{{i+o.output}}</text>
							</view>
						</view>
					</view>
				</view>
				<!-- 防止消息底部被遮 -->
				<!-- <view style="height: 180rpx;" id="seanTest">
				</view> -->
			</view>
	    </scroll-view> 
		<!-- 底部导航栏 -->
		<view class="flex-column-center">
			<view class="inpubut">
				<input v-model="msg" class="dh-input" type="text" @confirm="sendMsg" confirm-type="search"
					placeholder-class="my-neirong-sm" placeholder="描述您的问题" @blur="isScroll=true;"
					@focus="isScroll=false;" />
				<button @click="sendMsg" :disabled="msgLoad"
					class="btn">发送</button>
			</view>
		</view>
	</view>
</template>

<script>
	import EasyTyper from 'easy-typer-js'
	export default {
		data() {
			return {
				errorMsg: '(￣ε ￣)不好意思呀~~~当前调用的人太多，服务器有点承受不过来，请稍后重试',
				config: {
					output: '',
					isEnd: false,
					speed: 100,
					singleBack: false,
					sleep: 0,
					type: 'normal',
					backSpeed: 40,
					sentencePause: false
				},
				intoindex: '',
				showShareBtn: true,
				rewardedVideoAd: null, //广告
				num: 5, //次数
				apiurl: 'https://chatgptest-node-chatgptest-node-oozhtxrqgh.us-west-1.fcapp.run', //后端转发地址
				api: '', //在此输入你的apikey
				isScroll: true, //是否可以滑动
				userAvatar: '', //头像
				msgLoad: false,
				isRequesting: false,
				msgList: [{
					output: '年轻人，我看你很迷茫。想要问些什么？',
					isEnd: false,
					speed: 80,
					singleBack: false,
					sleep: 0,
					type: 'normal',
					backSpeed: 40,
					sentencePause: false
				}],
				msgContent: [],
				msg: ""
			}
		},
		onLoad() {
			this.isScroll=true;
			this.intoindex="";
			this.msgList=[
				{	
					output: '',
					my:true,
					msg:"1帮我写一个简单的java代码",
					isEnd: false,
					speed: 80,
					singleBack: false,
					sleep: 0,
					type: 'normal',
					backSpeed: 40,
					sentencePause: false
				},
				{
					output: '好的，java代码如下，public static class',
					isEnd: false,
					speed: 80,
					singleBack: false,
					sleep: 0,
					type: 'normal',
					backSpeed: 40,
					sentencePause: false,
					my:false
				},{
					output: '',
					my:true,
					msg:"帮我写一个简单的java代码",
					isEnd: false,
					speed: 80,
					singleBack: false,
					sleep: 0,
					type: 'normal',
					backSpeed: 40,
					sentencePause: false
				},
				{
					output: '好的，java代码如下，public static class',
					isEnd: false,
					speed: 80,
					singleBack: false,
					sleep: 0,
					type: 'normal',
					backSpeed: 40,
					sentencePause: false,
					my:false
				},{
					output: '',
					my:true,
					msg:"帮我写一个简单的java代码",
					isEnd: false,
					speed: 80,
					singleBack: false,
					sleep: 0,
					type: 'normal',
					backSpeed: 40,
					sentencePause: false
				},				{
					output: '好的，java代码如下，public static class',
					isEnd: false,
					speed: 80,
					singleBack: false,
					sleep: 0,
					type: 'normal',
					backSpeed: 40,
					sentencePause: false,
					my:false
				},{
					output: '',
					my:true,
					msg:"帮我写一个简单的java代码",
					isEnd: false,
					speed: 80,
					singleBack: false,
					sleep: 0,
					type: 'normal',
					backSpeed: 40,
					sentencePause: false
				},
				{
					output: '好的，java代码如下，public static class',
					isEnd: false,
					speed: 80,
					singleBack: false,
					sleep: 0,
					type: 'normal',
					backSpeed: 40,
					sentencePause: false,
					my:false
				},{
					output: '',
					my:true,
					msg:"帮我写一个简单的java代码",
					isEnd: false,
					speed: 80,
					singleBack: false,
					sleep: 0,
					type: 'normal',
					backSpeed: 40,
					sentencePause: false
				}];
				this.msgList=[];
				this.scrollToBottom();
		
		},
		methods: {
			sendMsg() {
				this.scrollToBottom();
			},
			scrollToBottom() {
				setTimeout(() => {
					this.intoindex = 'text' + (this.msgList.length - 1);
				}, 100);  // 延时 100 毫秒，值可以根据实际情况调整

 		    }

		}
	}
</script>

<style>
	page {
		height: 100%;
	}

	.drawer-list{
		padding:0 20rpx;
	}
	.advertising {}

	.drawer-title{
		margin-top: 37%;
		text-align: center;
		padding: 20rpx;
		color:  #616161;
	}
	.drawer-list view{
		margin-top: 20rpx;
	}
	.ml-10{
		margin-left: 10rpx;
	}
	.bg {
		/* overflow: scroll; */
		/* background: url('../../static/6.png') no-repeat;
		background-size: 100% 100%; */
		width: 100%;
		height: 100%;
	}

	.bg-img {
		width: 100%;
		height: 100%;
		position: fixed;
	}

	.userinfo {
		animation: oneshow 0.8s ease 1;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		padding-right: 20rpx;
		margin-top: 20rpx;
	}

	.usermsg {
		margin-left: 20rpx;
		padding: 17rpx 20rpx;
		border-radius: 35rpx;
		background-color: #f9f9f9 !important;
		margin-top: 20rpx;
	}

	.my-info {
		display: flex;
		align-items: center;
	}

	.aiinfo {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-left: 20rpx;
		margin-top: 20rpx;
		animation: oneshow 0.8s ease 1;
	}

	.chat-img {
		overflow: hidden;
		border-radius: 50%;
		/* width: 100rpx;
		height: 100rpx; */
		background-color: #f7f7f7;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.aimsg {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-left: 20rpx;
		padding: 17rpx 20rpx;
	}

	.flex-column-center {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: fixed;
		bottom: 0px;
		width: 100%;
	}

	.inpubut {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		/* background-color: #f9f9f9; */
		width: 100%;
		height: 110rpx;
		font-size: 40rpx;
	}

	.dh-input {
		width: 70%;
		height: 80rpx;
		border-radius: 100rpx;
		padding-left: 40rpx;
		margin-left: 20rpx;

		background-color: #f0f0f0;
	}

	.my-neirong-sm {
		font-size: 32rpx;
		color: #616161;
	}

	.btn {
		height: 80rpx;
		line-height: 80rpx;
		white-space: nowrap;
		background: linear-gradient(to right, #008FFF, #29C8FC);
		color: #ffffff;
		font-size: 32rpx;
		;
		border-radius: 2500px;
		margin: 0 20rpx;

	}

	.popcls {
		width: 80vw;
		height: 40vh;
		background: white;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		justify-items: center;
		align-items: center;
	}

</style>