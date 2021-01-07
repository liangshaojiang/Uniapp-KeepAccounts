<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">记账</block>
		</cu-custom>
		<scroll-view scroll-x class="bg-white nav text-center">
			<view class="cu-item" :class="model.BillType==1?'text-blue cur':''" @tap="tabSelect" :data-id="1">
				支出
			</view>
			<view class="cu-item" :class="model.BillType==2?'text-blue cur':''" @tap="tabSelect" :data-id="2">
				收入
			</view>
		</scroll-view>

		<view class="flex justify-between bg-white solid-bottom solid-top align-center">
			<view class="padding-sm margin-xsradius ">
				<view class="cu-avatar round lg margin-xsradius iconfont" :class="currentClass.IconName" :style="'background-color:'+currentClass.BgColor"></view>
				<text class="padding-left text-grey">{{currentClass.Name}}</text>
			</view>
			<view class="padding-sm ">
				<view class="text-black text-xxl contner">{{model.Money}}</view>
			</view>
		</view>
		<scroll-view scroll-x class="bg-white" style="height: 453upx;" scroll-y>
			<view class="cu-list grid col-5">
				<view class=" justify-center" v-for="(item,index) in bookclasslist" :key="index" @click="changeClass(item)">
					<view class="cu-avatar round lg margin-xs iconfont" :class="item.IconName" :style="item.Id===model.ClassId?'background-color:'+item.BgColor:''">

					</view>
					<view>{{item.Name}}</view>
				</view>
			</view>
		</scroll-view>
		<view class="input-calculator">

			<view class="cu-bar input" :class="InputBottom>0?'foot':''" :style="[{bottom:InputBottom+'px'}]">
				<view class="action">
					<text class="  text-grey">备注</text>
				</view>
				<input class="solid-bottom" :adjust-position="false" :focus="false" maxlength="300" v-model="model.Remark"
				 cursor-spacing="10" @focus="InputFocus" @blur="InputBlur"></input> <!-- @focus="InputFocus" @blur="InputBlur" -->
				<!-- 图片 选择图片 	<view class="action">
					<text class="cuIcon-emojifill text-grey"></text>
				</view> -->
			</view>

			<view class="cu-list grid col-4">
				<view class="cu-item border" @click="InputText" data-text="1">
					<text class="text-black">1</text>
				</view>
				<view class="cu-item border" @click="InputText" data-text="2">
					<text class="text-black">2</text>
				</view>
				<view class="cu-item border" @click="InputText" data-text="3">
					<text class="text-black">3</text>
				</view class="text-black">
				<view class="cu-item border">
					<!-- <text class="text-black"> -->

					<picker mode="date" :value="model.ConsumptionTime" @change="bindDateChange">
						<view class="text-black">
							{{model.ConsumptionTime}}
						</view>
					</picker>

					<!-- </text> -->
				</view>
				<view class="cu-item border" @click="InputText" data-text="4">
					<text class="text-black">4</text>
				</view>
				<view class="cu-item border" @click="InputText" data-text="5">
					<text class="text-black">5</text>
				</view>
				<view class="cu-item border" @click="InputText" data-text="6">
					<text class="text-black">6</text>
				</view>
				<view class="cu-item border" @click="InputText" data-text="+">
					<text class="text-black">+</text>
				</view>
				<view class="cu-item border" @click="InputText" data-text="7">
					<text class="text-black">7</text>
				</view>
				<view class="cu-item border" @click="InputText" data-text="8">
					<text class="text-black">8</text>
				</view>
				<view class="cu-item border" @click="InputText" data-text="9">
					<text class="text-black">9</text>
				</view>
				<view class="cu-item border" @click="InputText" data-text="-">
					<text class="text-black">-</text>
				</view>
				<view class="cu-item border" @click="InputText" data-text=".">
					<text class="text-black">.</text>
				</view>
				<view class="cu-item border" @click="InputText" data-text="0">
					<text class="text-black">0</text>
				</view>
				<view class="cu-item border" @click="Deltext">
					<text class="text-black">删除</text>
				</view>
				<view class="cu-item border" @click="CalculationTo" v-if="isCalculation">
					<text class="text-black">=</text>
				</view>
				<view class="cu-item border bg-green submit align-center" style="background-color: #f6c142;" @click="Submit" v-if="!isCalculation">
					<text class="text-bold block" style="color:#ffffff;">保存</text>

				</view>

			</view>

		</view>
	</view>
</template>

<script>
	import {
		accAdd,
		accSub,
		accMul,
		accDiv
	} from '@/common/calculation.js'
	import {
		getBookClassList
	} from '@/api/book/bookclass.js'
	import {
		bookSave
	} from '@/api/book/book.js'
	export default {
		data() {
			return {
				model: {
					BillType: 1,
					Money: '0',
					Remark: '',
					ConsumptionTime: this.getDate(),
					ClassId: ''
				},
				classLength: 30,
				InputBottom: 0,
				bookinclasslist: [],
				bookoutclasslist: [],
				bookclasslist: [],
				currentClass: {},
			}
		},
		methods: {
			tabSelect: function(e) {

				this.model.BillType = e.currentTarget.dataset.id;
				if (parseInt(this.model.BillType) === 2) {
					this.bookclasslist = this.bookinclasslist;


				} else if (parseInt(this.model.BillType) === 1) {
					this.bookclasslist = this.bookoutclasslist;
				}

				this.currentClass = this.bookclasslist[0];
				this.model.ClassId = this.currentClass.Id;

			},
			InputFocus: function(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur: function(e) {
				this.InputBottom = 0
			},
			bindDateChange: function(e) {
				this.model.ConsumptionTime = e.target.value
			},
			getDate: function(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			InputText: function(e) { //输入内容
				var text = e.currentTarget.dataset.text;
				this.model.Money+='';
				if (this.model.Money.length > 14) {
					uni.showToast({
						title: '输入金额过大',
						duration: 2000,
						icon: 'none'
					});
					return false;
				}
				
				switch (text) {
					case '+':
						{
							if (this.model.Money === "0") {
								return false;
							}
							this.model.Money = this.Calculation(this.model.Money); //如果之前的包括符号要计算掉
						}
						break;
					case '-':
						{
							if (this.model.Money === "0") {
								return false;
							}
							this.model.Money = this.Calculation(this.model.Money); //如果之前的包括符号要计算掉
						}
						break;
					case '.':
						{
							let str = this.model.Money + '';
							if (this.model.Money.indexOf('-') === 0 || this.model.Money.indexOf('+') === 0) { //第一个是负数
								str = str.substr(1, str.length)
							}
							if (str.indexOf('-') !== -1 && str.split('-')[str.split('-').length - 1].indexOf('.') !== -1) {
								return false;
							} else if (str.indexOf('+') !== -1 && str.split('+')[str.split('+').length - 1].indexOf('.') !== -1) {
								return false;
							}
						}
						break;
				}

				if (this.model.Money != 0) {
					this.model.Money += e.currentTarget.dataset.text + '';
				} else {
					this.model.Money = e.currentTarget.dataset.text;
				}

			},
			Calculation: function(money) {
				if (money.indexOf('-') !== -1 && money.indexOf('-') !== 0) { //减  
					return accSub(parseFloat(money.split('-')[0] || 0), parseFloat(money.split('-')[1] || 0)) + '';
				} else if (money.indexOf('+') !== -1) { //加
					return accAdd(parseFloat(money.split('+')[0] || 0), parseFloat(money.split('+')[1] || 0)) + '';
				} else if (money.indexOf('-') === 0 && money.split('-')[2]) { //减
					return accSub(parseFloat('-' + money.split('-')[1] || 0), parseFloat(money.split('-')[2] || 0)) + '';
				} else {
					return parseFloat(money) + '';
				}

			},
			CalculationTo: function(e) {
				this.model.Money = this.Calculation(this.model.Money);
			},
			Deltext: function(e) { //删除
				if (this.model.Money.length > 1) {
					this.model.Money = this.model.Money.substr(0, this.model.Money.length - 1)
					if (this.model.Money === '-' || this.model.Money === "+") {
						this.model.Money = "0"
					}
				} else {
					this.model.Money = "0"
				}

			},
			Submit: function(e) {
				console.log('点击了提交按钮', this.model)
				if (this.model.ClassId === "") {
					uni.showToast({
						title: "请选择分类",
						duration: 2000,
						icon: 'none'
					});
					return false;
				}

				if (!this.model.Money || this.model.Money == 0) {
					// AmountOfMoney
					uni.showToast({
						title: "请输入金额",
						duration: 2000,
						icon: 'none'
					});
					return false;
				}
				this.model.AmountOfMoney = parseFloat(this.model.Money)

				bookSave(this.model, res => {
					console.log(res)
					if (res.Status === 1) {
						uni.showToast({
							title: "保存成功",
							duration: 2000,
							icon: 'none'
						});
						uni.redirectTo({
							url:"/pages/index/index"
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


			//获取数据 
			getBookClassList: function() {
				console.log("获取数据")
				var that = this;
				getBookClassList({
					PageSize: 1000,
					PageIndex: 1
				}, res => {
					res.Data.List.forEach(item => {
						if (item.BillType === 1) {
							that.bookoutclasslist.push(item)
						} else {
							that.bookinclasslist.push(item)
						}
					})
					if (that.model.BillType == 1) {
						that.bookclasslist = that.bookoutclasslist
					} else {
						that.bookclasslist = that.bookinclasslist
					}
				})
			},
			changeClass: function(c) {
				this.currentClass = c;
				this.model.ClassId = c.Id;
			}

		},
		created() {
			this.getBookClassList();
		},
		computed: {
			isCalculation() {
				let str = this.model.Money + '';
				if (this.model.Money.indexOf('-') === 0 || this.model.Money.indexOf('+') === 0) { //第一个是负数
					str = str.substr(1, str.length)
				}

				return (str.indexOf('-') !== -1) || str.indexOf('+') !== -1
			}
		}
	}
</script>

<style scoped>
	.input-calculator {
		position: fixed;
		bottom: var(--window-bottom);
		width: 100%;
	}

	.submit:active {
		background-color: #f6cf4f !important;
	}
</style>
