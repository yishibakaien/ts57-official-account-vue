<template>
	<div class="wrap">
		<search-bar @goSearch="goSearchCompany"></search-bar>
		<p class="title">
			<span>入住厂家<em> {{factory}} </em>家</span>
			<span>入住贸易商<em> {{shop}} </em>家</span>
		</p>
		<div class="item-box" v-for="item in items" @click="goStore">
			<new-enter-item :itemObj="item"></new-enter-item>
		</div>
	</div>
</template>

<script>
	import newEnterItem from './newEnter-item.vue';
	import {findNewCompanys, totalCompanies} from '@/common/api/api';
	export default {
		data() {
			return {
				items: [],
				factory: '',
				shop: ''
			};
		},
		components: {
			newEnterItem
		},
		created() {
			this.findNewCompanysMethod();
			this.totalCompaniesMethod();
		},
		methods: {
			// 获取入住厂家列表
			findNewCompanysMethod() {
				findNewCompanys({}, (res) => {
					if (res.code === 0) {
						console.log(res);
						this.items = res.data;
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
}
</style>
