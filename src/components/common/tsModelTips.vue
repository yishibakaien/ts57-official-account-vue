<template>
	<div>
		<div class="overlay"></div>
		<div class="flashModel animated zoomIn">
			<div class="content1">
				<div class="title">{{title}}</div>
				<slot></slot>
			</div>
			<div class="content2">
				<a class="cancel" href="javascript:;" @click="cancelMethod">稍后再说</a>
				<a class="yes" href="tel:4008013357">拨打热线</a>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: '您无此权限'
			}
		},
		methods: {
			cancelMethod() {
				this.$emit('cancelMethod');
			}
		}
	};
</script>

<style lang="stylus" scoped>
	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: #000;
		opacity: 0.5;
		z-index: 999;
	}
	
	.flashModel {
		position: fixed;
		bottom: 50%;
		left: 5%;
		width: 90%;
		min-height: 80px;
		z-index: 9999;
		color: #333;
		.content1 {
			min-height: 120px;
			background: #fff;
			.title {
				height: 50px;
				font-size: 16px;
				text-align: center;
				line-height: 50px;
				border: 0;
			}
			div {
				height: 46px;
				text-align: center;
				border-top: 1px solid #c5c5c5;
			}
		}
		.content2 {
			width: 100%;
			background: #fff;
			height: 36px;
			color: #666666;
			font-size: 14px;
			text-align: center;
			line-height: 36px;
			border-top: 1px solid #e5e5e5;
			a {
				float: left;
				width: 50%;
			}
			.cancel {
				background: #fff;
				color: #666;
			}
			.yes {
				background: #4C93FD;
				color: #fff;
			}
		}
	}
	
	.animated {
		-webkit-animation-duration: 0.5s;
		animation-duration: 0.5s;
		-webkit-animation-fill-mode: both;
		animation-fill-mode: both;
	}
	
	@-webkit-keyframes zoomIn {
		0% {
			-webkit-transform: scale3d(0.3, 0.3, 0.3);
			transform: scale3d(0.3, 0.3, 0.3);
			/*transform: translate(0, 100%);
			-webkit-transform:translate(0, 100%); */
		}
		50% {}
	}
	
	@keyframes zoomIn {
		0% {
			-webkit-transform: scale3d(0.3, 0.3, 0.3);
			-ms-transform: scale3d(0.3, 0.3, 0.3);
			transform: scale3d(0.3, 0.3, 0.3);
			/*transform: translate(0, 100%);
			-webkit-transform:translate(0, 100%); */
		}
		50% {}
	}
	
	.zoomIn {
		-webkit-animation-name: zoomIn;
		animation-name: zoomIn;
	}
</style>
