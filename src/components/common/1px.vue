<template>
	<div class="main clearFix" :style="styleData">
	</div>
</template>

<script>
	export default {
		props: {
			width: '',
			color: '',
			float: '',
			styleData: {
				type: Object
			}
		}
	};
</script>

<style lang="stylus" scoped>
.main {
	height: 1px;
	background: #d2d2d2;
}
</style>
