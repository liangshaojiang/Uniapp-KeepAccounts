<template>

	<!-- //微信登陆 -->
	<view class="content">

		<!-- #ifdef MP-WEIXIN -->
		<view class="mp_login">
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
		<!-- #endif -->
		<!-- #ifdef APP-PLUS || H5 -->
		<view class="applogin margin"  >
			<view class="flex padding justify-center" style="height: 200upx;">
			 
			</view>
		<view class="flex padding justify-center"> 
			<view class="cu-avatar round xl bg-yellow iconfont icon-jizhangben text-white"></view> 
		</view>
			<form>
				<view class="cu-form-group margin-top">
					<view class="title">用户名</view>
					<input placeholder="登录名/手机号" v-model="userModel.Phone" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">密码</view>
					<input placeholder="请输入密码" type="password" v-model="userModel.Password" name="input"></input>
				</view>
				<button class="cu-btn block bg-yellow margin-top lg text-white " @click="appUserLogin">
					<!-- cuIcon-loading2 -->
					<text class="cuIconfont-spin"></text> 登录 </button>
			</form>
		</view>
		<!-- #endif -->
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
				userModel: {
					Phone: '',
					Password: '',
					LoginType: 1
				}
			}
		},
		onLoad(option) {
			console.log("option", option)
			this.backUrl = option.backurl || '/pages/index/index'
		},
		methods: {
			appUserLogin: function() {
				var that = this;
				login(that.userModel, (res) => {
					if (res.Status === 1) {
						uni.setStorageSync("slToken", res.Data.Token)
						uni.showToast({
							title: '登录成功',
							duration: 2000,
							icon: 'none'
						});
						uni.redirectTo({
							url: that.backUrl
						}); 
					} else {
						uni.showToast({
							title: res.Msg,
							duration: 2000,
							icon: 'none'
						});
					}
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
				const that = this;
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
										url: that.backUrl
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
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>
