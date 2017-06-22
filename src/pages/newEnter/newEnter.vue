<template>
	<div class="wrap">
		<search-bar @goSearch="goSearchCompany"></search-bar>
		<p class="title">
			<span>入住厂家<em> {{factory}} </em>家</span>
			<span>入住贸易商<em> {{shop}} </em>家</span>
		</p>
		<div class="nav-bar">
			<span :class="{active: isActive}" @click="activeTab1">最新入驻</span>
			<span :class="{active: !isActive}" @click="activeTab2">优质厂家</span>
		</div>
		<div class="item-box" v-for="item in items" @click="goStore" v-show="isActive">
			<new-enter-item :itemObj="item"></new-enter-item>
		</div>
		<div v-show="!isActive" class="item1-box clearFix">
			<new-enter-item1 v-for="(e, index) in items1" :itemObj="e" :key="index" class="fl"></new-enter-item1>
		</div>
	</div>
</template>

<script>
	import newEnterItem from './newEnter-item.vue';
	import newEnterItem1 from './newEnter-item1.vue';
	import {findNewCompanys, totalCompanies, getCompanyBestList} from '@/common/api/api';
	export default {
		data() {
			return {
				items: [],
				items1: [],
				factory: '',
				shop: '',
				isActive: true
			};
		},
		components: {
			newEnterItem,
			newEnterItem1
		},
		created() {
			this.findNewCompanysMethod();
			this.totalCompaniesMethod();
			this.getCompanyBestListMethod();
		},
		methods: {
			// 获取入住厂家列表
			findNewCompanysMethod() {
				findNewCompanys({}, (res) => {
					if (res.code === 0) {
						this.items = res.data;
					}
				}, (err) => {
					console.log(err);
				});
			},
			// 获取优质厂家
			getCompanyBestListMethod() {
				getCompanyBestList({pageNo: 1, pageSize: 9999}, (res) => {
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
			activeTab1() {
				this.isActive = true;
			},
			// tab切换
			activeTab2() {
				this.isActive = false;
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
		background: #fff;
		height: 36px;
		text-align: center;
		span {
			float: left;
			width: 50%;
			line-height: 36px;
			font-size: 14px;
		}
		.active {
			color: #4C93FD;
			border-bottom: 2px solid #4C93FD;			
		}
	}
}
</style>
