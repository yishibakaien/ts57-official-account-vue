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
					path: '/releaseSupply'
				});
				this.str = '发布供应';
				return;
			}
			this.$router.replace({
				path: '/releaseBuy'
			});
			this.str = '发布求购';
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
