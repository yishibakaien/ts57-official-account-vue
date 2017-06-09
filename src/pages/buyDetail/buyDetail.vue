<template>
	<div class="detail-wrap">
		<div class="content">
			<div class="img-box">
				<img :src="obj.buyPicUrl?obj.buyPicUrl:'/static/images/assets/defaultFlower'" alt="花型图片" />
			</div>
			<div class="content-box clearfix">
				<p class="desc">{{obj.buyDesc}}</p>
				<div class="fl info">
					<p class="info-item"><span class="title">求购类型：</span>{{obj.buyType | type}}-{{obj.buyShape | buyShape}}<span class="state">{{ obj.isStartUp | isStartUp }}</span></p>
					<p class="info-item"><span class="title">求购数量：</span><span>{{obj.buyNum}}{{obj.buyUnit | unit}}</span></p>
					<p class="info-item"><span class="title">发布时间：</span><span>{{obj.createDate | customTime}}</span></p>
				</div>
				<div class="fr" v-if="obj.buyStatus === 2">
					<i class="iconfont icon-jiedanchenggong">TUBIAO</i>
				</div>
			</div>
			<border :styleData="styleData"></border>
			<div class="buyPerson">
				<img class="fl" :src="obj.userHeadIcon" v-errorImg alt="求购人头像" />
				<span class="fl">求购人：{{obj.userName}}</span>
			</div>
		</div>
		<div class="successList" v-if="obj.buyStatus === 2">
			<h5>成功接单商家</h5>
			<div class="successList-info clearfix">
				<div class="headImg fl">
					<img :src="successPerson.userHeadIcon" v-errorImg alt="接单人头像"/>
				</div>
				<div class="info fl">
					<p>蛇口街道富士康</p>
					<span>3小时前</span>
				</div>
			</div>
		</div>
		<div class="listNum" v-if="listNum === 0">
			暂时无人接单
		</div>
		<div class="listNum" v-else>
			<h5>共有{{listNum}}人接单</h5>
			<div class="headImg" v-for="item in this.obj.buyTaskList">
				<img :src="item.userHeadIcon" v-errorImg alt="接单人头像"/>
				<span v-if="item.state === 2">已成交</span>
			</div>
		</div>
	</div>
</template>

<script>
	import {getProductBuy} from '@/common/api/api';
	export default {
		data() {
			return {
				styleData: {
					width: '96%',
					float: 'right',
					background: '#f2f2f2'
				}, // 自定义border
				obj: {}, // 求购单详情数据
				successPerson: {}, // 成功接单人
				listNum: ''  // 接单人数量
			};
		},
		created() {
			let data = {
				id: 1474
			};
			getProductBuy(data, (res) => {
				this.obj = res.data;
				this.listNum = this.obj.buyTaskList.length;
				for (let i = 0; i < this.listNum; i++) {
					if (this.obj.buyTaskList[i].status === 2) {
						this.successPerson = this.obj.buyTaskList[i];
					}
				}
			}, (res) => {
				console.log('错误');
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
			width: 100%;
			background: #fff;
			border-bottom: 1px solid #e5e5e5;
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
