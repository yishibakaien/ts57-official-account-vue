<template>
	<div class="item-wrap">
		<div class="title clearFix">
			<img class="fl" :src="itemObj.companyHeadIcon" v-errorImg alt="厂家头像"/>
			<span class="fl">{{itemObj.companyName}}</span>
			<i class="fr iconfont icon-back"></i>
		</div>
		<div class="content clearFix">
			<div class="img-box" v-for="item in itemObj.products.slice(0,3)">
				<img :src="item.defaultPicUrl?item.defaultPicUrl:'/static/images/assets/defaultFlower.svg'" alt="花型图片"/>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			itemObj: {
				type: Object
			}
		},
		methods: {
			goSearch() {
				this.$router.push({
					path: '/',
					query: {
						id: ''
					}
				});
			}
		}
	};
</script>

<style lang="stylus" scoped>
.item-wrap {
	background: #fff;
	border-bottom: 1px solid #f2f2f2;
	border-top: 1px solid #f2f2f2;
	.title {
		border-bottom: 1px solid #f2f2f2;
		img {
			padding: 8px;
			width: 32px;
			height: 32px;
		}
		span {
			line-height: 48px;
			font-size: 14px;
			color: #666;
		}
		i {
			margin-right: 12px;
			margin-top: 15px;
		}
		.icon-back::before {
			color: #666;
		}
	}
	.content {
		margin-top: 8px;
		margin-bottom: 8px;
		.img-box {
			float: left;
			margin-left: 2.5%;
			width: 30vw;
			height: 30vw;
			overflow: hidden;
			img {
				width: 100%;
			}
		}
	}
}
</style>
