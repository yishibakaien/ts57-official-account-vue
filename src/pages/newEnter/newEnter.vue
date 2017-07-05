<template>
	<div class="wrap">
		<search-bar @goSearch="goSearchCompany"></search-bar>
		<p class="title">
			<span>入住厂家<em> {{factory}} </em>家</span>
			<span>入住贸易商<em> {{shop}} </em>家</span>
		</p>
		<div class="nav-bar">
			<span v-for="(tab, index) in tabs" :class="{active: tab.isActive}" @click="activeTab(index)">{{tab.name}}</span>
		</div>
		<div class="item-box" v-for="item in items" @click="goStore" v-show="tabs[1].isActive">
			<new-enter-item :itemObj="item"></new-enter-item>
		</div>
		<div v-show="tabs[0].isActive" class="item1-box clearFix">
			<new-enter-item1 v-for="(e, index) in items1" :itemObj="e" :key="index" class="fl"></new-enter-item1>
		</div>
		<ts-model-t v-show="modelShow" @cancelMethod="hideModel">
			<p class="tipsInfo">
				成为会员，请联系热线电话：4008013357
			</p>
		</ts-model-t>
	</div>
</template>

<script>
	import newEnterItem from './newEnter-item.vue';
	import newEnterItem1 from './newEnter-item1.vue';
	import { findNewCompanys, totalCompanies, getCompanyBestList } from '@/common/api/api';
	export default {
		data() {
			return {
				items: [],
				items1: [],
				factory: '',
				shop: '',
				modelShow: false,
				tabs: [{
					name: '优质厂家',
					isActive: true
				}, {
					name: '入驻厂家',
					isActive: false
				}, {
					name: '入驻贸易商',
					isActive: false
				}]
			};
		},
		components: {
			newEnterItem,
			newEnterItem1
		},
		mounted() {
			this.findNewCompanysMethod();
			this.totalCompaniesMethod();
			this.getCompanyBestListMethod();
		},
		methods: {
			// 获取入住厂家列表
			findNewCompanysMethod() {
				findNewCompanys({}, (res) => {
					if (res.code === 0) {
						this.items = res.data.filter(item => {
							return item.companyType === 1;
						}); // 厂家数据筛选
					}
				}, (err) => {
					console.log(err);
				});
			},
			// 获取优质厂家
			getCompanyBestListMethod() {
				getCompanyBestList({ pageNo: 1, pageSize: 9999 }, (res) => {
					if (res.code === 0) {
						this.items1 = res.data.list;
					}
				}, (err) => {
					console.log(err);
				});
			},
			//  统计厂家和店铺数量
			totalCompaniesMethod() {
				totalCompanies({}, (res) => {
					if (res.code === 0) {
						this.factory = res.data.factory;
						this.shop = res.data.shop;
					}
				}, (err) => {
					console.log(err);
				});
			},
			// 跳转搜索结果页
			goSearchCompany(e) {
				this.$router.push({
					path: '/searchCompany',
					query: {
						keyWord: e
					}
				});
			},
			// 跳转店铺
			goStore() {
				console.log(111);
			},
			// tab切换
			activeTab(index) {
				this.tabs.forEach(item => {
					item.isActive = false;
				});
				this.tabs[index].isActive = true;
				if (index === 2) {
					this.modelShow = true;
				}
			},
			// 隐藏model
			hideModel() {
				this.modelShow = false;
				this.tabs.forEach(item => {
					item.isActive = false;
				});
				this.tabs[0].isActive = true;
			}
		}
	};
</script>

<style lang="stylus" scoped>
	.wrap {
		width: 100%;
		min-height: 100vh;
		background: #f2f2f2;
		.item-box {
			margin-top: 10px;
		}
		.item1-box {
			padding-bottom: 20px;
			background: #fff;
		}
		.title {
			font-size: 14px;
			span {
				margin-left: 40px;
				line-height: 36px;
			}
			em {
				color: #FF8400;
			}
		}
		.nav-bar {
			padding-bottom: 3px;
			background: #fff;
			height: 36px;
			text-align: center;
			span {
				float: left;
				width: 33%;
				line-height: 36px;
				font-size: 14px;
			}
			.active {
				color: #4C93FD;
				border-bottom: 2px solid #4C93FD;
			}
		}
		.tipsInfo {
			text-align: center;
			font-size: 14px;
			line-height: 40px;
		}
	}
</style>
