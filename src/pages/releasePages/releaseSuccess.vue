<template>
	<div class="wrap">
		<div class="content" v-if="show">
			<i class="iconfont icon-chenggong"></i>
			<p>已成功发布供应</p>
			<div class="btn-group">
				<button class="btn1">继续发布</button>
				<button class="btn2">求购列表</button>
			</div>
		</div>
		<div class="content" v-else>
			<i class="iconfont icon-chenggong"></i>
			<p>已成功发布求购</p>
			<div class="btn-group">
				<button class="btn1">继续发布</button>
				<button class="btn2">厂家上新</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				show: true
			};
		},
		created() {
			console.log(this.$route.query.type);
			if (this.$route.query.type === 1) {
				this.show = true;
			} else {
				this.show = false;
			}
		}
	};
</script>

<style lang="stylus" scoped>
.wrap {
	width: 100%;
	height: 100vh;
	background: #fafafa;
	.content {
		padding-top: 45%;
		text-align: center;
		i {
			font-size: 44px;
			color: #FF8400;
		}
		p {
			margin-top: 18px;
			color: #333333;
			font-size: 14px;
		}
		.btn-group {
			margin-top: 30px;
			button {
				margin: 0 20px;
				width: 90px;
				height: 30px;
				background: #fafafa;
				border: 1px solid #ccc; 
				border-radius: 3px;
			}
		}
	}
}
</style>
