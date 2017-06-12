<template>
	<div class="clearFix wrap">
		<label v-for="(item, index) in items">
		<input type="radio" :name="item.name" v-model="data" :value="item.label" @change="onChange(index)"/>
		<span :class="[{'active': item.label===data}, 'radio-base']" class="radio-base">{{item.types}}</span>
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
				this.$emit('onChange', this.items[e]);
			}
		}
	};
</script>

<style lang="stylus" scoped>
	.wrap {
		padding: 6px 0;
		label {
			text-align: left;
			width: 25%;
			float: left;
			input {
				display: none;
			}
		}
	}
	
	.radio-base {
		display: inline-block;
		width: 66px;
		height: 26px;
		color: #666;
		font-size: 14px;
		text-align: center;
		line-height: 26px;
		border: 1px solid #d2d2d2;
		border-radius: 3px;
	}
	
	.active {
		color: #fff;
		background: #4c93fd;
		border: 1px solid #4c93fd;
	}
</style>
