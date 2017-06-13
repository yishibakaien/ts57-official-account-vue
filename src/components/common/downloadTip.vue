<template>
	<div class="wrap clear" v-if="show">
		<img class="fl" src="../../../static/images/logo.png" alt="logo" />
		<p class="fl">
			更多操作请下载App
		</p>
		<i class="fr iconfont icon-guanbi" @click="closeTip"></i>
		<a class="fr" href="http://a.app.qq.com/o/simple.jsp?pkgname=cn.ts57.app">下载</a>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				show: true
			};
		},
		methods: {
			closeTip() {
				this.show = false;
			}
		}
	};
</script>

<style lang="stylus" scoped>
	.wrap {
		margin-bottom: 10px;
		width: 100%;
		height: 50px;
		background: #fff;
		img {
			padding-top: 5px;
			padding-left: 18px;
			padding-right: 10px;
			width: 40px;
			height: 40px;
		}
		p {
			line-height: 50px;
			font-size: 14px;
			color: #333;
		}
		a {
			margin-right: 20px;
			margin-top: 13px;
			width: 50px;
			height: 24px;
			background: #4C93FD;
			border: 0;
			color: #FFF;
			font-size: 14px;
			border-radius: 3px;
			text-align: center;
			line-height: 24px;
		}
		.iconfont {
			margin-right: 20px;
			margin-top: 18px;
		}
	}
</style>
