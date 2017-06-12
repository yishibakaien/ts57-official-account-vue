<template>
	<div :class="[{'short': short} ,'ts-go']" @click="tsGo">
		<i class="fr" v-if="!data">{{title}}<i class="iconfont icon-back"></i></i>
		<span class="fr">
			{{data}}
		</span>
	</div>
</template>

<script>
	export default {
		methods: {
			tsGo() {
				this.$emit('tsGo');
			}
		},
		props: {
			data: '',
			short: '',
			title: ''
		}
	};
</script>

<style lang="stylus" scoped>
.ts-go {
	width: calc(100% - 80px);
	display: inline-block;
	span {
		position: relative;
		top: 3px;
		padding-right: 10px;
		font-size: 14px;
		color: #666;
	}
	i {
		position: relative;
		top: 2px;
		color: #666;
		font-size: 14px;
	}
	.iconfont {
		position: relative;
		top: -2px;
		padding-left: 5px;
	}
	.icon-back::before {
		color: #666;
	}
}
.short {
	width: calc(100% - 115px);
}
</style>
