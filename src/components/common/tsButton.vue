<template>
	<div class="btn-wrap">
		<button @click="btnClick" v-if="!dis">{{title || '提交'}}</button>
		<button class="dis-btn" disabled v-else>提交</button>
	</div>
</template>

<script>
	export default {
		props: {
			title: '',
			dis: ''
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
	.dis-btn {
		background: #ccc;
	}
}
</style>
