<template>
	<div>
		<div class="overlay"></div>
		<div class="flashModel animated zoomIn">
			<div class="content1">
				<div class="title">{{title}}</div>
				<slot></slot>
			</div>
			<div class="content2" @click="cancleMethod">
				取消
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
			cancleMethod() {
				this.$emit('cancleMethod');
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
		bottom: 0;
		left: 5%;
		width: 90%;
		min-height: 80px;
		z-index: 9999;
		color: #333;
		.content1 {
			width: 100%;
			background: #fff;
			border-radius: 5px;
			.title {
				width: 100%;
				height: 36px;
				color: #333;
				font-size: 12px;
				text-align: center;
				line-height: 36px;
				border: 0;
			}
			div {
				width: 100%;
				height: 46px;
				text-align: center;
				border-top: 1px solid #c5c5c5;
			}
		}
		.content2 {
			margin-top: 5px;
			margin-bottom: 10px;
			width: 100%;
			background: #fff;
			height: 36px;
			color: #666666;
			font-size: 14px;
			text-align: center;
			line-height: 36px;
			border-radius: 5px;
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
			/*-webkit-transform: scale3d(0.3, 0.3, 0.3);
			transform: scale3d(0.3, 0.3, 0.3);*/
			transform: translate(0, 100%);
			-webkit-transform:translate(0, 100%); 
		}
		50% {}
	}
	
	@keyframes zoomIn {
		0% {
			/*-webkit-transform: scale3d(0.3, 0.3, 0.3);
			-ms-transform: scale3d(0.3, 0.3, 0.3);
			transform: scale3d(0.3, 0.3, 0.3);*/
			transform: translate(0, 100%);
			-webkit-transform:translate(0, 100%); 
		}
		50% {}
	}
	
	.zoomIn {
		-webkit-animation-name: zoomIn;
		animation-name: zoomIn;
	}
</style>
