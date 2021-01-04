<template>
	<view class="content">
		<view class="bg-img flex align-center userbackground" style="background-image:url('https://jizhang.bayingu.cn/Resources/images/background2.png');height: 414upx;">
			<view class="padding-xl text-white">
				<view class="padding">
					<view class="cu-avatar round lg margin-left" :style="'background-image:url('+userInfo.HeaderImage+')'">
						<view class="cu-tag badge" :class="[userInfo.Sex===2?'cuIcon-female bg-pink':'',userInfo.Sex===1?'cuIcon-male bg-blue':'']"></view>
					</view>
					<view class="lg margin-sm ">
						{{userInfo.UserName}}
					</view>
				</view>
				<view class="padding-xs text-lg">

					<!-- Only the guilty need fear me. -->
				</view>
			</view>
		</view>
		<view class="cu-list menu" :class="[ 'sm-border', 'card-menu margin-top']">
			<view class="cu-item" :class=" 'arrow' ">
				<view class="content">
					<image src="/static/images/wujiao.png" class="png" mode="aspectFit"></image>
					<text class="text-grey">我的账单</text>
				</view>
			</view>
			<view class="cu-item" :class=" 'arrow' ">
				<view class="content">
					<image src="/static/images/cardbao.png" class="png" mode="aspectFit"></image>
					<text class="text-grey">我的卡包</text>
				</view>
			</view>
			<view class="cu-item" :class=" 'arrow' ">
				<view class="content">
					<image src="/static/images/qianbao.png" class="png" mode="aspectFit"></image>
					<text class="text-grey">我的积分</text>
				</view>
			</view>
			<view class="cu-item" :class=" 'arrow' ">
				<button class="cu-btn content" open-type="share">
					<image src="/static/images/feiji.png" class="png" mode="aspectFit"></image>
					<text class="text-grey">邀请好友</text>
				</button>
			</view>

			<view class="cu-item" :class=" 'arrow' ">
				<view class="content">
					<image src="/static/images/about.png" class="png" mode="aspectFit"></image>
					<text class="text-grey">关于开发者</text>
				</view>
			</view>

			<!-- 	<view class="cu-item" :class="'arrow'">
				<view class="content">
					<text class="cuIcon-warn text-green"></text>
					<text class="text-grey">文本</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">小目标还没有实现！</text>
				</view>
			</view> -->
		</view>


		<view class="cu-list menu" :class="[ 'sm-border', 'card-menu margin-top']">

			<view class="cu-item" :class=" 'arrow' ">
				<button class="cu-btn content" open-type="contact">
					<image src="/static/images/kefu.png" class="png" mode="aspectFit"></image>
					<text class="text-grey">联系客服</text>
				</button>
			</view>
			<view class="cu-item" :class="'arrow' ">
				<view class="content">
					<image src="/static/images/help.png" class="png" mode="aspectFit"></image>
					<text class="text-grey">帮助中心</text>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		getUserInfo
	} from "@/api/index/index.js"
	export default {
		data() {
			return {
				title: 'Hello',
				userInfo: {
					HeaderImage: '',
					UserName:''
				},
			}
		},
		onLoad() {

		},
		created() {
			this.getUserInfo();
		},
		methods: {
			getUserInfo: function() {
				var that = this;
				getUserInfo({}, res => {
					console.log("getUserInfo返回数据", res)
					that.userInfo = res.Data;
				})
			},
			alertShow: function() {

				uni.showToast({
					title: '测试',
					duration: 2000,
					icon: 'none'
				});
				// uni.showLoading({
				//     title: '加载中'
				// });
			}

		}
	}
</script>

<style scoped>
	.userbackground {
		border-bottom-left-radius: 25%;
		border-bottom-right-radius: 25%;
	}
</style>
