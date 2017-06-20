<template>
	<div class="search-bar">
		<div>
			<input type="text" v-model="searchText" placeholder="输入厂家或贸易商名称进行搜索" />
			<i class="iconfont icon-wenbensousuo" @click="goSearch"></i>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				searchText: ''
			};
		},
		methods: {
			goSearch() {
				if (!this.searchText) {
					alert('请填写关键词');
					return;
				}
				this.$emit('goSearch', this.searchText);
			}
		}
	};
</script>

<style lang="stylus" scoped>
	.search-bar {
		height: 40px;
		background: #fff;
		div {
			width: 80%;
			line-height: 38px;
			text-align: center;
			margin: 0 auto;
			input {
				width: 80%;
				border: 0;
				&::-webkit-input-placeholder {
					font-size: 14px;
					text-align: center;
				}
			}
		}
	}
</style>
