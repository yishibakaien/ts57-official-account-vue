<template>
	<div>
		正在前往{{str}}页面...
	</div>
</template>

<script>
	export default {
		data() {
			return {
				str: ''
			};
		},
		created() {
			let userType = localStorage.getItem('userType');
			if (userType === '1') {
				this.$router.replace({
					path: '/buyList'
				});
				this.str = '求购列表';
				return;
			}
			this.$router.replace({
				path: '/supplyList'
			});
			this.str = '供应列表';
		}
	};
</script>

<style lang="stylus" scoped>
div {
	color: #333;
	font-size: 16px;
	text-align: center;
	line-height: 150px;
}
</style>
