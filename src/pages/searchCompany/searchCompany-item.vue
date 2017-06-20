<template>
	<div class="item-box clearFix">
		<div class="fl">
			<p class="name">{{itemObj.companyName}}</p>
			<p class="main">主营：{{itemObj.mainClass || '用户暂未填写'}}</p>
			<p class="count">共上架 {{itemObj.countProduct}} 款花型</p>
		</div>
		<i class="iconfont icon-back fr"></i>
	</div>
</template>

<script>
	export default {
		props: {
			itemObj: {
				type: Object
			}
		}
	};
</script>

<style lang="stylus" scoped>
.item-box {
	padding: 3px 10px;
	background: #fff;
	border-top: 1px solid #e5e5e5;
	.name {
		color: #333333;
		font-size: 16px;
		line-height: 30px;
	}
	.main {
		font-size: 14px;
		color: #666;
		line-height: 20px;
	}
	.count {
		font-size: 14px;
		color: #666;
		line-height: 20px;
	}
	.iconfont {
		line-height: 76px;
	}
}
</style>
