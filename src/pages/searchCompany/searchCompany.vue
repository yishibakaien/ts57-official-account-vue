<template>
	<div class="search-resault-wrap">
		<search-bar @goSearch="searchCompany"></search-bar>
		<div class="search-resault-box" v-if="items.length > 0">
			<search-item v-for="item in items" :itemObj="item" :key="item.id"></search-item>
		</div>
		<paginator :hasMore="hasMore" @more="moreMethod" v-if="items.length > 0"></paginator>
		<div class="search-resault-box default-box" v-else>
			<p>暂无数据</p>
		</div>
	</div>
</template>

<script>
	import searchItem from './searchCompany-item.vue';
	import {paginator} from '@/components';
	import {searchCompany} from '@/common/api/api';
	export default {
		data() {
			return {
				param: {
					companyName: '',
					companyType: '',
					pageNo: 1,
					pageSize: 10
				},
				items: [],
				hasMore: true
			};
		},
		components: {
			searchItem,
			paginator
		},
		created() {
			let keyWord = this.$route.query.keyWord;
			if (keyWord) {
				this.param.companyName = keyWord;
				this.searchCompanyMethod();
			}
		},
		methods: {
			searchCompanyMethod() {
				searchCompany(this.param, (res) => {
					if (res.code === 0) {
						this.items = res.data.list;
						if (res.data.list.length < this.param.pageSize) {
							this.hasMore = false;
						}
					}
				}, (err) => {
					alert(err);
				});
			},
			searchCompany(e) {
				this.param.pageNo = 1;
				this.param.companyName = e;
				this.searchCompanyMethod();
			},
			moreMethod() {
				this.param.pageNo ++;
				searchCompany(this.param, (res) => {
					if (res.code === 0) {
						this.items = this.items.concat(res.data.list);
						if (res.data.list.length < this.param.pageSize) {
							this.hasMore = false;
						}
					}
				}, (err) => {
					alert(err);
				});
			}
		}
	};
</script>

<style lang="stylus" scoped>
.search-resault-wrap {
	min-height: 100vh;
	background: #f2f2f2;
	.search-resault-box {
		margin: 5px 0;
		background: #fff;
		p {
			text-align: center;
			line-height: 150px;
		}	
	}
	.default-box {
		min-height: 100vh;
	}
}
</style> 
