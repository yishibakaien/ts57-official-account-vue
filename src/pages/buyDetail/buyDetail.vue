<template>
	<div class="detail-wrap">
		<div class="content">
			<div class="img-box">
				<img src="../../../static/images/patterns3.png" alt="花型图片" />
			</div>
			<div class="content-box clearfix">
				<p class="desc">数据备份数据的恢复巴克斯的法宝数据备份数据的恢复巴克斯的法宝数据备份数据的恢复巴克斯的法宝数据备份数据的恢复巴克斯的法宝</p>
				<div class="fl info">
					<p class="info-item"><span class="title">求购类型：</span>睫毛-胚布<span class="state">接受开机</span></p>
					<p class="info-item"><span class="title">求购数量：</span></p>
					<p class="info-item"><span class="title">发布时间：</span></p>
				</div>
				<div class="fr">
					<i class="iconfont icon-jiedanchenggong"></i>
				</div>
			</div>
			<border :styleData="styleData"></border>
			<div class="buyPerson">
				<img class="fl" src="../../../resource/统搜57微信公众号/images/统搜57/u273.png" alt="求购人头像" />
				<span class="fl">求购人：何二成</span>
			</div>
		</div>
		<div class="successList">
			<h5>成功接单商家</h5>
			<div class="successList-info clearfix">
				<div class="headImg fl">
					<img src="../../../resource/统搜57微信公众号/images/统搜57/u159.png" alt="接单人头像"/>
				</div>
				<div class="info fl">
					<p>蛇口街道富士康</p>
					<span>3小时前</span>
				</div>
			</div>
		</div>
		<div class="listNum">
			<h5>共有2人接单</h5>
			<div class="headImg">
				<img src="../../../resource/统搜57微信公众号/images/统搜57/u267.png" alt="接单人头像"/>
				<span>已成交</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				styleData: {
					width: '96%',
					float: 'right',
					background: '#f2f2f2'
				}
			};
		}
	};
</script>

<style lang="stylus" scoped>
	.detail-wrap {
		width: 100%;
		min-height: 100vh;
		background: #f2f2f2;
		.content {
			width: 100%;
			background: #fff;
			.img-box {
				width: 100vw;
				height: 100vw;
				display: table-cell;
				vertical-align: middle;
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
				.state {
					margin-left: 16px;
					padding: 1px 6px;
					height: 20px;
					background: #c5c5c5;
					color: #fff;
					font-size: 12px;
					border-radius: 12px;
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
			padding: 10px 6px 10px 16px;
			background: #fff;
			h5 {
				margin-bottom: 10px;
				font-size: 14px;
				color: #666;
			}
			.headImg {
				margin-right: 15px;
				width: 40px;
				height: 40px;
				img {
					width: 100%;
					height: 100%;
				}
			}
		}
		.successList {
			.info {
				p {
					margin-bottom: 10px;
					font-size: 14px;
					color: #333;
				}
				span {
					font-size: 12px;
					color: #666;
				}
			}
		}
		.headImg {
			position: relative;
			span {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				color: #FB7100;
				font-size: 12px;
				line-height: 36px;
				text-align: center;
				background: rgba(0,0,0,.4);
			}
		}
	}
</style>
