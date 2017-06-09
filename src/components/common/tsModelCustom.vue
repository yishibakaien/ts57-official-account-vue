<template>
	<div>
		<div class="overlay"></div>
		<div class="flashModel animated zoomIn">
			<div class="content1">
				<div class="title">
					<i class="fl iconfont icon-guanbi" @click="closeMethod"></i>
					{{title}}
				</div>
				<slot></slot>
			</div>
			<div class="content2">
				<button class="cancel" @click="cancelMethod">重置</button>
				<button class="yes" @click="yesMethod">确定</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			title: ''
		},
		methods: {
			cancelMethod() {
				this.$emit('cancelMethod');
			},
			closeMethod() {
				this.$emit('closeMethod');
			},
			yesMethod() {
				this.$emit('yesMethod');
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
		top: 0;
		left: 0;
		width: 100%;
		min-height: 80px;
		z-index: 9999;
		color: #333;
		.content1 {
			width: 100%;
			background: #fff;
			.title {
				width: 100%;
				height: 36px;
				color: #333;
				font-size: 12px;
				text-align: center;
				line-height: 36px;
				border-bottom: 1px solid #e5e5e5;
				.iconfont {
					position: relative;
					left: 20px;
				}
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
			button {
				float: left;
				width: 50%;
				height: 100%;
				border: 0;
				font-size: 14px;
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
			transform: translate(0, -100%);
			-webkit-transform:translate(0, -100%); 
		}
		50% {}
	}
	
	@keyframes zoomIn {
		0% {
			transform: translate(0, -100%);
			-webkit-transform:translate(0, -100%); 
		}
		50% {}
	}
	
	.zoomIn {
		-webkit-animation-name: zoomIn;
		animation-name: zoomIn;
	}
</style>
