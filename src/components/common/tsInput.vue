<template>
	<div class="ts-input">
		<input type="number" v-model="data" />
	</div>
</template>

<script>
	export default {
		data() {
			return {
				data: ''
			};
		}
	};
</script>

<style lang="stylus" scoped>
.ts-input {
	width: calc(100% - 90px);
	display: inline-block;
}
input {
	width: 100%;
	color: #666;
	text-align: right;
	border: 0;
	outline: 0;
}
</style>
