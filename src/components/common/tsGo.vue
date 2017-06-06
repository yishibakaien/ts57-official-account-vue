<template>
	<div class="ts-go" @click="tsGo">
		<i class="fr">></i>
	</div>
</template>

<script>
	export default {
		methods: {
			tsGo() {
				this.$emit('tsGo');
			}
		}
	};
</script>

<style lang="stylus" scoped>
.ts-go {
	width: calc(100% - 70px);
	display: inline-block;
	i {
		color: #666;
		font-size: 16px;
	}
}
</style>
