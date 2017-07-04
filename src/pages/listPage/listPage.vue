<template>
	<div class="buyList">
		<div class="navBar clearFix">
			<p v-for="(item, index) in options" @click="selectList(index)" :class="{active: item.isActive}"><span>{{item.classes}}</span></p>
		</div>
		<div class="item-box">
			<div class="buyList-item" v-for="item in items" @click="goDetail(item)" v-if="options[1].isActive">
				<buy-list-item :item="item"></buy-list-item>
			</div>
			<div class="buyList-item" v-for="item in items" @click="goDetail1(item)" v-if="options[0].isActive">
				<supply-list-item :item="item"></supply-list-item>
			</div>
		</div>
		<paginator :hasMore="hasMore" @more="moreMethod"></paginator>
		<ts-model-t v-show="modelShow" @cancelMethod="hideModel">
			<p class="tipsInfo">
				成为会员，请联系热线电话：4008013357
			</p>
		</ts-model-t>
	</div>
</template>

<script>
	import { listHomeProductBuys, listHomeCompanySupplys } from '@/common/api/api';
	import buyListItem from './buyListItem.vue';
	import supplyListItem from './supplyListItem.vue';
	import { paginator } from '../../components/index.js';
	import { loading, hide } from '../../common/js/tip/toast';
	export default {
		data() {
			return {
				param: {
					buyShapes: '', // 求购形态
					buyTypes: '', // 求购类型
					pageNo: 1, // 第几页
					pageSize: 10 // 每页记录数
				},
				param1: {
					supplyTypes: '', // 供应类型
					pageNo: 1, // 第几页
					pageSize: 10 // 每页记录数
				},
				options: [{ classes: '厂家供应', isActive: true },
					{ classes: '贸易商求购', isActive: false }
					//					{ classes: '大边', value: 100011, isActive: false },
					//					{ classes: '小边', value: 100012, isActive: false },
					//					{ classes: '睫毛', value: 100013, isActive: false }
				],
				items: [],
				userType: '',
				hasMore: true,
				modelShow: false
			};
		},
		components: {
			buyListItem,
			supplyListItem,
			paginator
		},
		created() {
			loading();
			this.userType = localStorage.getItem('userType');
			this.listHomeCompanySupplysMethod();
		},
		methods: {
			moreMethod() {
				if (this.options[0].isActive) {
					this.param1.pageNo++;
					this.listHomeCompanySupplysMethod();
				}
				if (this.options[1].isActive) {
					this.param.pageNo++;
					this.listHomeProductBuysMethod();
				}
			},
			// 请求求购列表数据
			listHomeProductBuysMethod() {
				loading();
				listHomeProductBuys(this.param, (res) => {
					if (res.code === 0) {
						hide();
						if (this.userType === '2') {
							res.data.list.forEach(item => {
								item.userName = item.userName.slice(0, 1) + '***';
							});
							this.items = this.items.concat(res.data.list);
						} else {
							this.items = this.items.concat(res.data.list);
						}
						if (res.data.list.length < 10) {
							this.hasMore = false;
						}
						console.log(this.items);
					}
				}, (err) => {
					console.log(err);
				});
			},
			// 请求供应列表数据
			listHomeCompanySupplysMethod() {
				loading();
				listHomeCompanySupplys(this.param1, (res) => {
					if (res.code === 0) {
						hide();
						if (this.userType === '1') {
							res.data.list.forEach(item => {
								item.userName = item.userName.slice(0, 1) + '***';
							});
							this.items = this.items.concat(res.data.list);
						} else {
							this.items = this.items.concat(res.data.list);
						}
						if (res.data.list.length < 10) {
							this.hasMore = false;
						}
					}
				}, (err) => {
					console.log(err);
				});
			},
			// tab切换
			selectList(index) {
				this.options.forEach(item => {
					item.isActive = false;
				});
				this.options[index].isActive = true;
				if (index === 0) {
					this.items = [];
					this.listHomeCompanySupplysMethod();
					return;
				}
				if (index === 1) {
					this.items = [];
					this.listHomeProductBuysMethod();
					return;
				}
			},
			// 跳转求购详情页
			goDetail(e) {
				if (this.userType === '2') {
					this.modelShow = true;
					return;
				}
				this.$router.push({
					path: '/buyDetail',
					query: {
						id: e.id
					}
				});
			},
			// 跳转供应详情页
			goDetail1(e) {
				if (this.userType === '1') {
					this.modelShow = true;
					return;
				}
				this.$router.push({
					path: '/supplyDetail',
					query: {
						id: e.id
					}
				});
			},
			// 隐藏弹窗
			hideModel() {
				this.modelShow = false;
			}
		}
	};
</script>

<style lang="stylus" scoped>
	.buyList {
		position: relative;
		.navBar {
			position: fixed;
			top: 0;
			width: 100%;
			background: #fff;
			height: 32px;
			border-bottom: 1px solid #e5e5e5;
			z-index: 999;
			p {
				float: left;
				width: 50%;
				text-align: center;
				box-sizing: border-box;
				span {
					padding-bottom: 5px;
					line-height: 32px;
					font-size: 14px;
					color: #333;
				}
			}
			.active {
				color: #4C93FD;
				border-bottom: 3px solid #4C93FD;
			}
		}
		background: #f2f2f2;
		.item-box {
			margin-top: 40px;
		}
		.buyList-item {
			margin-bottom: 10px;
		}
		.tipsInfo {
			text-align: center;
			font-size: 14px;
			line-height: 40px;
		}
	}
</style>
