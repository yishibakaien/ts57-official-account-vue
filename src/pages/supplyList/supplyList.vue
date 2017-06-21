<template>
	<div class="buyList">
		<div class="navBar clearFix">
			<p v-for="(item, index) in options" @click="selectClass(index)"><span :class="{active: item.isActive}">{{item.classes}}</span></p>
		</div>
		<div class="item-box">
		<div class="buyList-item" v-for="item in items" @click="goDetail(item)">
			<supply-list-item :item="item"></supply-list-item>
		</div>
		</div>
		<paginator :hasMore="hasMore" @more="moreMethod"></paginator>
	</div>
</template>

<script>
	import { listHomeCompanySupplys } from '@/common/api/api';
	import supplyListItem from './supplyListItem.vue';
	import { paginator } from '../../components/index.js';
	import { loading, hide } from '../../common/js/tip/toast';
	export default {
		data() {
			return {
				param: {
//					supplyShapes: '', // 供应形态
//					supplyStatus: '', // 供应状态
					supplyTypes: '', // 供应类型
					pageNo: 1, // 第几页
					pageSize: 10 // 每页记录数
				},
				options: [{classes: '全部', value: '', isActive: true},
				{classes: '面料', value: 100010, isActive: false},
				{classes: '大边', value: 100011, isActive: false},
				{classes: '小边', value: 100012, isActive: false},
				{classes: '睫毛', value: 100013, isActive: false}],
				items: [],
				hasMore: true
			};
		},
		components: {
			supplyListItem,
			paginator
		},
		created() {
			loading();
			this.listHomeCompanySupplys();
		},
		methods: {
			moreMethod() {
				this.param.pageNo ++;
				this.listHomeCompanySupplys();
			},
			// 请求供应列表数据
			listHomeCompanySupplys() {
				loading();
				listHomeCompanySupplys(this.param, (res) => {
					if (res.code === 0) {
						hide();
						this.items = this.items.concat(res.data.list);
						if (res.data.list.length < 10) {
							this.hasMore = false;
						}
					}
				}, (err) => {
					console.log(err);
				});
			},
			// 分类请求数据
			listHomeProductBuysMethod1() {
				listHomeCompanySupplys(this.param, (res) => {
					if (res.code === 0) {
						hide();
						this.items = res.data.list;
					}
				}, (err) => {
					console.log(err);
				});
			},
			// 分类
			selectClass(e) {
				this.options.forEach(item => {
					item.isActive = false;
				});
				this.options[e].isActive = true;
				this.param.supplyTypes = this.options[e].value;
				this.param.pageNo = 1;
				this.hasMore = true;
				this.listHomeProductBuysMethod1();
			},
			// 跳转详情页
			goDetail(e) {
				console.log(e.id);
				this.$router.push({
					path: '/supplyDetail',
					query: {
						id: e.id
					}
				});
			}
		}
	};
</script>

<style lang="stylus" scoped>
	.buyList {
		background: #f2f2f2;
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
				width: 20%;
				text-align: center;
				box-sizing: border-box;
				span {
					padding-bottom: 5px;
					line-height: 32px;
					font-size: 14px;
					color: #333;
				}
				.active {
					color: #4C93FD;
					border-bottom: 3px solid #4C93FD;
				}
			}
		}
		.item-box {
			margin-top: 40px;
		}
		.buyList-item {
			margin-bottom: 10px;
		}
	}
</style>
