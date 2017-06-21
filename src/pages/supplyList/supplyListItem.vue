<template>
	<div class="content-wrap">
		<div class="title clearFix">
			<img class="fl" :src="item.userHeadIcon" v-errorImg alt="厂家头像"/>
			<span class="fl">{{item.userName}}</span>
		</div>
		<border :styleData="styleData"></border>
		<div class="content clearFix">
			<img class="fl" :src="item.buyPicUrl?item.buyPicUrl:'/static/images/assets/defaultFlower.svg'" alt="花型图片"/>
			<div class="info fl">
				<p :title="item.buyDesc">{{item.supplyDesc}}</p>
				<span class="status">{{item.supplyShape | buyShape}}</span>
				<span class="time">{{item.createDate | customTime}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				styleData: {
					width: 'calc(100% - 10px)',
					float: 'right',
					background: '#f2f2f2'
				}
			};
		},
		props: {
			item: {
				type: Object
			}
		}
	};
</script>

<style lang="stylus" scoped>
.content-wrap {
	width: 100%;
	background: #fff;
	.title {
		padding-left: 10px;
		img {
			padding: 6px 6px 6px 0;
			width: 36px;
			height: 36px;
		}
		span {
			line-height: 48px;
			font-size: 14px;
			color: #333;
		}
	}
	.content {
		padding: 6px;
		height: 92px;
		img {
			margin-left: 4px;
			margin-right: 12px;
			width: 92px;
			height: 92px;
		}
		.info {
			width: calc(100% - 120px);
			height: 100%;
			position: relative;
			p {
				height: 36px;
				margin-top: 5px;
				font-size: 16px;
				color: #333333;
				line-height: 18px;
				overflow: hidden;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				word-break: break-all;
			}
			.status {
				position: absolute;
				bottom: 5px;
				font-size: 12px;
				color: #666;
				i {
					color: #4C93FD;
				}
			}
			.time {
				position: absolute;
				bottom: 5px;
				right: 6px;
				font-size: 12px;
				color: #666;
			}
		}
	}
}
</style>
