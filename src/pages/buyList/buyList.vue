<template>
	<div class="buyList">
		<div class="navBar clearFix">
			<p v-for="(item, index) in options" @click="selectClass(index)"><span :class="{active: item.isActive}">{{item.classes}}</span></p>
		</div>
		<div class="buyList-item" v-for="item in items" @click="goDetail(item)">
			<buy-list-item :item="item"></buy-list-item>
		</div>
		<paginator :hasMore="hasMore" @more="moreMethod"></paginator>
	</div>
</template>

<script>
	import { listHomeProductBuys } from '@/common/api/api';
	import buyListItem from './buyListItem.vue';
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
			buyListItem,
			paginator
		},
		created() {
			loading();
			this.listHomeProductBuysMethod1();
		},
		methods: {
			moreMethod() {
				this.param.pageNo ++;
				this.listHomeProductBuysMethod();
			},
			// 分页请求数据
			listHomeProductBuysMethod() {
				loading();
				listHomeProductBuys(this.param, (res) => {
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
				listHomeProductBuys(this.param, (res) => {
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
				console.log(this.options[e].value);
				this.param.buyTypes = this.options[e].value;
				this.param.pageNo = 1;
				this.listHomeProductBuysMethod1();
			},
			// 跳转详情页
			goDetail(e) {
				console.log(e.id);
				this.$router.push({
					path: '/buyDetail',
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
		.navBar {
			background: #fff;
			height: 32px
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
		background: #f2f2f2;
		.buyList-item {
			margin-top: 8px;
		}
	}
</style>
