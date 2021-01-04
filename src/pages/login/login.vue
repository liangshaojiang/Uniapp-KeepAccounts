<template>
	<view class="content">

		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">登录</block>
		</cu-custom>
		<view class="flex padding justify-center" style="height: 400upx;">


		</view>

		<view class="flex padding justify-center">

			<view class="cu-avatar round xl bg-yellow iconfont icon-jizhangben text-white"></view>

		</view>
		<button class="cu-btn block bg-yellow margin-xl lg text-white " @getuserinfo="userLogin" open-type="getUserInfo">
			<!-- cuIcon-loading2 -->
			<text class="cuIconfont-spin"></text> 授权登录 </button>

	</view>
</template>

<script>
	import {
		login,
		getUserInfo,
		oAuthLogin
	} from '@/api/index/index.js'; //引入需要的api

	export default {
		data() {
			return {
				title: 'Hello',
				backUrl: '',
			}
		},
		onLoad(option) {
			console.log("option",option)
			this.backUrl = option.backurl || '/pages/index/index'
		},
		methods: {
			userLogin: function() {
				var that = this;
				login({
					"Phone": "15617541119",
					"Password": "123456",
					"LoginType": 1
				}, (res) => {
					uni.setStorageSync("slToken", res.Data.Token)
					that.userInfo = res.Data;
				})
			},
			alertShow: function() {

				/* uni.showToast({
				    title: '测试',
				    duration: 2000,
					icon:'none'
				}); */
				uni.showLoading({
					title: '加载中'
				});
			},
			userLogin: function(e) {
				const that=this;
				if (e.detail.errMsg === "getUserInfo:ok") {
					uni.login({
						success(res) {

							oAuthLogin({
								Code: res.code,
								OAuthType: 1,
								UserInfo: e.detail.userInfo
							}, res => {
								if (res.Status === 1) {
									uni.setStorageSync("slToken", res.Data.Token)
									uni.redirectTo({
										url:that.backUrl
									});
									uni.showToast({
										title: '登录成功',
										duration: 2000,
										icon: 'none'
									});
								
								} else {
									uni.showToast({
										title: res.Msg,
										duration: 2000,
										icon: 'none'
									});
								}
							});
						}
					})
				} else {
					uni.showToast({
						title: '登录失败',
						duration: 2000,
						icon: 'none'
					});
				}

			}

		}
	}
</script>

<style scoped>
	.backgroundimage {
		width: 100%;
		height: auto;
	}
</style>
