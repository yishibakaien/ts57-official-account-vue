<template>
	<div class="clearFix wrap fr">
		<label v-for="(item, index) in items" class="fr">
		<i class="iconfont icon-quandagou" :class="[{'active': item.label===data}]"></i>
		<input type="radio" :name="item.name" v-model="data" :value="item.label" @change="onChange(index)"/>
		<span class="radio-base">{{item.types}}</span>
	</label>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				data: ''
			};
		},
		props: {
			items: {
				type: Array
			}
		},
		methods: {
			onChange(e) {
				console.log(this.items[e]);
				this.$emit('onChange', this.data);
			}
		}
	};
</script>

<style lang="stylus" scoped>
	.wrap {
		width: calc(100%-100px);
		display: inline-block;
		padding: 6px 0;
		label {
			margin-right: 20px;
			i {
				font-size: 14px;
				color: #aba9a9;
			}
			.active {
				color: #4c93fd;
			}
			input {
				display: none;
			}
		}
	}
	.radio-base {
		display: inline-block;
		color: #666;
		font-size: 14px;
		line-height: 26px;
	}
</style>
