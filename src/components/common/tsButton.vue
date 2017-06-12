<template>
	<div class="btn-wrap">
		<button @click="btnClick">{{title || '提交'}}</button>
	</div>
</template>

<script>
	export default {
		props: {
			title: ''
		},
		methods: {
			btnClick() {
				this.$emit('btnClick');
			}
		}
	};
</script>

<style lang="stylus" scoped>
.btn-wrap {
	margin: 20px 0;
	button {
		margin-left: 2%;
		width: 96%;
		height: 44px;
		color: #fff;
		background: #4C93FD;
		border: 0;
	}
}
</style>
