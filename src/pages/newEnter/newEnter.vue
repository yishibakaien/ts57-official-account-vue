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
		<div v-show="tabs[1].isActive">
			<div class="clearFix">
				<div class="item-box clearFix" v-for="item in items">
					<new-enter-item :itemObj="item"></new-enter-item>
				</div>
			</div>
			<paginator :hasMore="hasMore" @more="moreMethod(1)"></paginator>
		</div>
		<div v-show="tabs[2].isActive">
			<div class="clearFix">
				<div class="item-box clearFix" v-for="item2 in items2">
					<new-enter-item :itemObj="item2"></new-enter-item>

				</div>
			</div>
			<paginator :hasMore="hasMore" @more="moreMethod(2)"></paginator>
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
	import { paginator } from '../../components/index.js';
	import { findNewCompanys, totalCompanies, getCompanyBestList } from '@/common/api/api';
	export default {
		data() {
			return {
				param_chang: {
					companyType: 1,
					pageNo: 1,
					pageSize: 10
				},
				param_mao: {
					companyType: 2,
					pageNo: 1,
					pageSize: 10
				},
				items: [], // 入驻厂家
				items1: [], // 优质厂家
				items2: [], // 入驻贸易商
				factory: '',
				shop: '',
				modelShow: false,
				userType: '',
				hasMore: true,
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
			newEnterItem1,
			paginator
		},
		mounted() {
			this.getCompanyBestListMethod();
			this.totalCompaniesMethod();
			this.userType = localStorage.getItem('userType');
		},
		methods: {
			// 获取入住厂家列表
			findNewCompanysMethod() {
				findNewCompanys(this.param_chang, (res) => {
					if (res.code === 0) {
						this.items = this.items.concat(res.data.list);
						if (res.data.list.length < 10) {
							this.hasMore = false;
						}
					}
				}, (err) => {
					console.log(err);
				});
			},
			// 获取入住贸易商列表
			findNewCompanysMethod1() {
				findNewCompanys(this.param_mao, (res) => {
					if (res.code === 0) {
						this.items2 = this.items2.concat(res.data.list);
						if (res.data.list.length < 10) {
							this.hasMore = false;
						}
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
        if (Number(localStorage['limit']) === 2) {
          this.modelShow = true;
          return;
        }
				// if (this.userType === '2') {
				// 	this.modelShow = true;
				// 	return;
				// }
				this.$router.push({
					path: '/searchCompany',
					query: {
						keyWord: e
					}
				});
			},
			// tab切换
			activeTab(index) {
				// 贸易商只能看到入驻厂家
				// if (index === 1 || index === 2) {
				// 	if (this.userType === '2') {
				// 		this.modelShow = true;
				// 		return;
				// 	}
				// }
        //
        // 2017年8月4日15:44:57 cqw
        if (index === 1 || index === 2) {
          if (Number(localStorage['limit']) === 2) {
            this.modelShow = true;
            return;
          }
        }
				if (index === 1) {
					this.items = [];
					this.findNewCompanysMethod();
				}
				if (index === 2) {
					this.items2 = [];
					this.findNewCompanysMethod1();
				}
				this.tabs.forEach(item => {
					item.isActive = false;
				});
				this.tabs[index].isActive = true;
			},
			// 隐藏model
			hideModel() {
				this.modelShow = false;
				this.tabs.forEach(item => {
					item.isActive = false;
				});
				this.tabs[0].isActive = true;
			},
			// 加载更多
			moreMethod(e) {
				if (e === 1) {
					this.param_chang.pageNo++;
					this.findNewCompanysMethod();
					return;
				}
				if (e === 2) {
					this.param_mao.pageNo++;
					this.findNewCompanysMethod1();
					return;
				}
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
			box-sizing: border-box;
			width: 50%;
			float: left;
			margin-top: 10px;
			background: #fff;
		}
		.item1-box {
			padding-bottom: 20px;
			background: #fff;
		}
		.title {
			font-size: 14px;
      text-align: center;
			span {
				// margin-left: 40px;
				line-height: 36px
        &:nth-of-type(2) {
          margin-left 30px
        }
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
