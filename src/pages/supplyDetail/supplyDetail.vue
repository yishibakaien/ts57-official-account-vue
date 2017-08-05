<template>
	<div class="detail-wrap">
		<ts-tips></ts-tips>
		<div class="content">
			<div class="img-box">
				<img :src="obj.productPicUrl?obj.productPicUrl:'/static/images/assets/defaultFlower.svg'" alt="花型图片" />
			</div>
			<div class="content-box clearfix">
				<p class="desc">{{obj.buyDesc}}</p>
				<div class="fl info">
					<p class="info-item"><span class="title">供应类型：</span>{{obj.supplyType | type}}-{{obj.supplyShape | buyShape}}</p>
					<p class="info-item"><span class="title">供应数量：</span><span v-if="obj.buyNum">{{obj.supplyNum}}{{obj.supplyUnit | unit}}</span><span>面议</span></p>
					<p class="info-item"><span class="title">发布时间：</span><span>{{obj.createDate | customTime}}</span></p>
				</div>
			</div>
			<border :styleData="styleData"></border>
			<div class="buyPerson">
				<img class="fl" :src="obj.userHeadIcon" v-errorImg alt="求购人头像" />
				<span class="fl">供应人：{{obj.userName}}</span>
			</div>
			<div class="btn-group clearFix">
				<router-link class="more" to="supplyList">更多供应</router-link>
				<a class="mobile" href="http://a.app.qq.com/o/simple.jsp?pkgname=cn.ts57.app">联系厂家</a>
			</div>
		</div>
	</div>
</template>

<script>
	import { getCompanySupply } from '@/common/api/api';
	import { info } from '@/common/js/tip/toast';
	export default {
		data() {
			return {
				styleData: {
					width: '96%',
					float: 'right',
					background: '#f2f2f2'
				}, // 自定义border
				obj: {} // 供应单详情数据
			};
		},
		created() {
			if (!this.$route.query.id) {
				info({ text: '未发现该供应单' });
				return;
			}
			let data = {
				id: this.$route.query.id
			};
			getCompanySupply(data, (res) => {
				if (res.code === 0) {
					this.obj = res.data;
				}
			}, (res) => {
				info({ text: '请检查网络' });
			});
		}
	};
</script>

<style lang="stylus" scoped>
	.detail-wrap {
		width: 100%;
		min-height: 100vh;
		background: #f2f2f2;
		.content {
      margin-bottom: 100px;
			width: 100%;
			background: #fff;
			border-bottom: 1px solid #e5e5e5;

			.img-box {
				width: 100vw;
				height: 100vw;
				overflow: hidden;
				border-bottom: 1px solid #f2f2f2;
				img {
					width: 100%;
				}
			}
			.content-box {
				padding: 0 6px 0 16px;
				.desc {
					padding: 5px 0;
					font-size: 15px;
					color: #333;
					line-height: 22px;
				}
				.info {
					padding-bottom: 10px;
					.info-item {
						line-height: 24px;
						font-size: 14px;
						color: #333;
						.title {
							color: #666;
						}
					}
				}
			}
			.buyPerson {
				padding: 0 6px 0 16px;
				display: table-cell;
				vertical-align: middle;
				img {
					padding: 6px 0;
					width: 40px;
					height: 40px;
				}
				span {
					padding-left: 12px;
					line-height: 52px;
				}
			}
		}
		.successList,
		.listNum {
			margin-top: 20px;
			margin-bottom: 20px;
			padding: 10px 6px 10px 16px;
			background: #fff;
			border: 1px solid #e5e5e5;
			border-left: 0;
			border-right: 0;
			h5 {
				margin-bottom: 10px;
				font-size: 14px;
				color: #666;
			}
		}
		.btn-group {
			position: fixed;
			bottom: 0;
			width: 100%;
			a {
				float: left;
				width: 50%;
				height: 44px;
				text-align: center;
				line-height: 44px;
				font-size: 14px;
			}
			.more {
				color: #666;
				background: #fff;
			}
			.mobile {
				background: #4C93FD;
				color: #fff;
			}
		}
	}
</style>
