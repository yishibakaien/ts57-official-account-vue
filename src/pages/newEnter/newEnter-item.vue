<template>
	<div class="item-wrap">
		<div class="title clearFix">
			<img class="fl" :src="itemObj.companyHeadIcon" alt="厂家头像" />
			<p style="line-height: 40px;">
				<span>{{itemObj.companyName}}</span>
			</p>
			<span class="phone" style="line-height: 20px;">
				<i class="iconfont icon-iconfontdianhua"></i>
				{{itemObj.phone}}
			</span>
		</div>
		<div class="content clearFix">
			<!--<div class="img-box" v-for="item in itemObj.products.slice(0,3)" v-patternsPic="{pic: item.defaultPicUrl, size: 200}"></div>-->
			<button @click="gotoStore(itemObj.indexName)">进入官网</button>
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
			},
			gotoStore(indexName) {
				if (indexName) {
					location.href = 'https://' + indexName + '.ts57.cn';
				} else {
					console.log('接口数据暂无indexName');
				}
			}
		}
	};
</script>

<style lang="stylus" scoped>
	@import '../../common/styles/mixin';
	.item-wrap {
		width: 100%;
		border: 1px solid #f2f2f2;
		/*border-bottom: 0;*/
		.title {
			img {
				padding: 8px;
				width: 56px;
				height: 56px;
			}
			span {
				ellipsisLn(1);
				width: 100px;
				/*line-height: 40px;*/
				font-size: 14px;
				color: #666;
			}
			.phone {
				display: block;
				font-size: 12px;
				vertical-align: bottom;
			}
			.icon-iconfontdianhua::before {
				font-size: 12px;
				color: #666;
			}
		}
		.content {
			margin-top: 8px;
			margin-bottom: 8px;
			button {
				margin: 0 5%;
				width: 90%;
				height: 30px;
				background: #fff;
				border: 0;
				border: 1px solid #4C93FD;
				outline: none;
				color: #4C93FD;
			}
		}
	}
</style>
