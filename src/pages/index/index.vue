<template>
	<view>
		<basics v-if="PageCur=='basics'"></basics>
		<components v-if="PageCur=='component'"></components>
		<plugin v-if="PageCur=='plugin'"></plugin> 
	<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action " :class="PageCur == 'basics'?'text-yellow':'text-gray'"  @click="NavChange" data-cur="basics">
				<view class="cuIcon-homefill"></view> 账本
			</view> 
			<view class="action text-white add-action" :class="PageCur == 'component'?'text-yellow':'text-white'" @click="NavTo" data-url="/pages/addmbook/addmbook" data-cur="component">
				<button class="cu-btn cuIcon-add bg-yellow shadow text-white"></button>
				记账
			</view> 
			<view class="action " @click="NavChange" :class="PageCur == 'plugin'?'text-yellow':'text-gray'" data-cur="plugin">
				<view class="cuIcon-my">
				<!-- 	<view class="cu-tag badge"></view> -->
				</view>
				我的
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
		return {
				PageCur: 'basics'
			}
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			},
			NavTo:function(e){
				uni.navigateTo({
					url: e.currentTarget.dataset.url
				})
			}
		}
	}
</script>

<style>

</style>
