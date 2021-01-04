<template>
	<view class="content">
		<view>
			extend
		</view>
	</view>
</template>

<script>
	import {
		login,
		getUserInfo
	} from '@/api/index/index.js'; //引入需要的api

	export default {
		data() {
			return {
				title: 'Hello',
				userInfo: {
					Email: "",
					IsVip: false,
					Token: "",
					VIPExpirationTime: "0001-01-01",
					create_sig_time: "2020-12-14",
					deptname: "总公司",
					fk_DepartmentID: 1,
					id: "",
					isok: 0,
					login_name: "",
					remark: '',
					status: 2,
					style: "1",
					suffix: "txl",
					true_name: "",
					usersig: "",
					worknum: "",
				},
			}
		},
		onLoad() {

		},
		methods: {

			getUserInfo: function() {
				console.log("点击")
				var that = this;
				login({}).then(res => {
					console.log(res)
					that.userInfo = res.Result;
				})
			},
			userLogin: function() {
				var that = this;
				login({
					"Phone": "15617541119",
					"Password": "123456",
					"LoginType": 1
				}).then(res => {
					console.log(res)
					that.userInfo = res.Result;
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
