<template>
	<div class="wrap">
		<div class="content" v-if="show === 1">
			<i class="iconfont icon-chenggong"></i>
			<p>已成功发布供应</p>
			<div class="btn-group">
				<router-link to="releaseSupply">继续发布</router-link>
				<router-link to="buyList">求购列表</router-link>
			</div>
		</div>
		<div class="content" v-else-if="show === 2">
			<i class="iconfont icon-chenggong"></i>
			<p>已成功发布求购</p>
			<div class="btn-group">
				<router-link to="releaseBuy">继续发布</router-link>
				<router-link to="addPatterns">厂家上新</router-link>
			</div>
		</div>
		<div class="content" v-else>
			<i class="iconfont icon-chenggong"></i>
			<p>已成功新增花型</p>
			<div class="btn-group">
				<router-link to="newPatterns">继续新增</router-link>
				<router-link to="lookingFor">大家在找</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				show: ''
			};
		},
		created() {
			this.show = this.$route.query.type;
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
			a {
				display: inline-block;
				margin: 0 20px;
				width: 90px;
				height: 30px;
				line-height: 30px;
				font-size: 14px;
				color: #333;
				background: #fafafa;
				border: 1px solid #ccc; 
				border-radius: 3px;
			}
		}
	}
}
</style>
