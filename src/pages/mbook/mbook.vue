<template>
	<view class="content">

		<view class="cu-custom" :style="[{height:CustomBar + 'px'}]">
			<view class="cu-bar search bg-white fixed" :style="style">
				<!-- :style="[{top:StatusBar + 'px'}]" -->
				<view class="margin-left iconfont icon-tubiao text-xxl text-yellow">
					<!-- 	<view class="cu-tag badge"></view> -->
				</view>
				<view class="search-form round" :style="[{top:StatusBar + 'px'}]">
					<text class="cuIcon-search"></text>
					<input :adjust-position="false" type="text" placeholder="每一笔都很重要" confirm-type="search"></input>
				</view>
				<!-- 	<view class="action" >
				<text>广州</text>
				<text class="cuIcon-triangledownfill"></text>
			</view> -->
			</view>
		</view>
		<view class="cu-card case bg-white padding-bottom" :class="'no-card'">
			<view class="shadow">
				<view class="image" style="background:url('https://jizhang.bayingu.cn/Resources/images/kejishishang.jpg')no-repeat center center;height: 314upx;background-size: 100% 100%;">
					<view class="flex padding-top-xl justify-center">
						<view class="content justify-center">
							<view class="text-white text-center text-xl">{{bookVm.Balance}}</view>
						</view>
					</view>
					<view class="flex padding-top-sm justify-center">
						<view class="content justify-center">
							<button class="cu-btn line-white xl" @click="selectMonth">{{query.YearMonth}} 资金结余</button>
						</view>
					</view>
					<view class="flex justify-between">
						<view class="padding-sm margin-xsradius ">
							<view class="text-white text-center text-xl">{{bookVm.TotalIncome }}</view>
							<view class="text-white text-center text-xl">本月收入</view>
						</view>
						<view class="padding-sm margin-xsradius ">
							<view class="text-white text-center text-xl">{{bookVm.TotalExpend}}</view>
							<view class="text-white text-center text-xl">本月支出</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-for="(dayItem,index) in bookVm.DayBookList" :key="index">
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="text-orange">{{dayItem.Day}}</text>
				</view>
				<view class="margin justify-end">
					<view class="text-grey text-xs"> 支出：{{dayItem.Expend}} 收入：{{dayItem.Income}}</view>
				</view>
			</view>
			<view class="cu-list menu-avatar">
				<view class="cu-item" :class="modalName=='move-box-'+ item.Id?'move-cur':''" v-for="(item,ii) in dayItem.BookList" :key="item.Id"
				 @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + item.Id">
					<view class="cu-avatar round lg iconfont text-white " :class="item.ClassIcon" :style="'background-color:'+item.ClassBg">

					</view>
					<view class="content">
						<view class="text-grey">{{item.ClassName}}</view>
						<view class="text-gray text-sm line">{{item.Remark}}</view>
					</view>
					<view class="action">
						<view class=" text-df" :class="item.BillType===1?'text-red':'text-grey'"> {{item.BillType===1?'-':''}}
							{{item.AmountOfMoney}}</view>
					</view>
					<view class="move">
						<!-- <view class="bg-grey">置顶</view> -->
						<view class="bg-red" @click="Delete(item.Id+'')">删除</view>
					</view>
				</view>
			</view>
		</view>

		<view class="selectPicker bg-white solid-top botton" v-if="visible"   > 
			<view class="pickerBtn padding flex flex-wrap justify-between align-center">
				<button class="cu-btn bg-white" @click="()=>{this.visible=false;}" >取消</button>
				<button class="cu-btn bg-yellow text-white " @click="okDate" :disabled="loadData"  >确定</button>
			</view>
			<picker-view :indicator-style="indicatorStyle" :value="value" @change="bindDateChange" @pickstart="(e)=>{this.loadData=true;}"  @pickend="(e)=>{this.loadData=false;}" class="picker-view">
				<picker-view-column>
					<view class="text-center" style="line-height: 50px;" v-for="(item,index) in years" :key="index">{{item}}年</view>
				</picker-view-column>
				<picker-view-column>
					<view class="text-center" style="line-height: 50px;" v-for="(item,index) in months" :key="index">{{item}}月</view>
				</picker-view-column>
			</picker-view>
		</view>

		<view class="cu-tabbar-height"></view>
	</view>
</template>

<script>
	import {
		getBookList,
		deleteBook
	} from "../../api/book/book.js"
	export default {
		data() {
			const date = new Date()
			const years = []
			const year = date.getFullYear()
			const months = []
			const month = date.getMonth() + 1
			const days = []
			const day = date.getDate()
			for (let i = 1990; i <= date.getFullYear(); i++) {
				years.push(i)
			}
			for (let i = 1; i <= 12; i++) {
				months.push(i)
			}
			for (let i = 1; i <= 31; i++) {
				days.push(i)
			}
			return {
				title: '账本',
				modalName: null,
				listTouchStart: 0,
				listTouchDirection: null,
				startTouches: null, //开始滑动

				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				bookVm: {},

loadData:false,
				currentMonth: "",
				query: {
					YearMonth: ''
				},


				years,
				year,
				months,
				month,
				days,
				day,
				value: [9999, month - 1, day - 1],
				visible: false,
				indicatorStyle: `height: 50px;`,
			}
		},
		computed: {
			style() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var bgImage = this.bgImage;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				if (this.bgImage) {
					style = `${style}background-image:url(${bgImage});`;
				}
				return style
			}
		},
		created() {
			this.getBookList();
		},
		methods: {
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
			selectMonth: function() {
				this.visible = true;
			},
			bindDateChange: function(e) {
				console.log("选择时间", e)
				const val = e.detail.value
				this.year = this.years[val[0]]
				this.month = this.months[val[1]]
				// this.day = this.days[val[2]]

				this.currentMonth = this.year + "年" + this.month + "月";
			},
			okDate: function() {
				this.query.YearMonth = this.currentMonth;
				this.visible=false;
				this.getBookList();
			},
			Delete: function(index) {
				 var that=this;
				uni.showModal({
				    title: '提示',
				    content: '确定要删除吗',
				    success: function (res) {
				        if (res.confirm) {
				        deleteBook({id:index},(res)=>{
				        	uni.showToast({
				        		title: '删除成功',
				        		duration: 2000,
				        		icon: 'none'
				        	});
				        	that.getBookList();
				        },)
				        } else if (res.cancel) {
				            // console.log('用户点击取消');
				        }
				    }
				});
				
			},
			getBookList: function() {
				var that = this; 
					console.log("getBookList")
				getBookList({
					YearMonth: that.query.YearMonth
				}, res => {
						console.log("getBookList66",res)
					if (res.Status === 1) {
						that.bookVm = res.Data;
					}

				});
			},
			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0] 
			},

			// ListTouch计算方向
			ListTouchMove(e) {
				console.log("计算方向ListTouchEnd e.touches[0]", e.touches[0])
				if (Math.abs(e.touches[0].pageX - this.listTouchStart.pageX) > Math.abs(e.touches[0].pageY - this.listTouchStart.pageY)) {
					this.listTouchDirection = e.touches[0].pageX - this.listTouchStart.pageX > 0 ? 'right' : 'left'
				}
			},

			// ListTouch计算滚动
			ListTouchEnd(e) {
				console.log("计算滚动ListTouchEnd e.touches[0]", e.touches[0])
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			},


		}
	}
</script>

<style scoped>
	.backgroundimage {
		width: 100%;
		height: auto;
	}

	.picker-view {
		width: 750rpx;
		height: 600rpx;
		margin-top: 20rpx;
	}
	.selectPicker{
		position: fixed;
		bottom: var(--window-bottom);
		width: 100%;
	}
</style>
