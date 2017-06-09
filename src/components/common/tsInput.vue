<template>
	<div :class="[{'short': short} , {'shortToo': shortToo}, 'ts-input']">
		<div v-if="toggle" class="content">
			<input type="number" v-model="data" :placeholder="placeholder" @blur="toggleShow" />
			<i v-show="isClear" class="fr iconfont icon-guanbi" @click="clearData"></i>
			<i v-show="data && !isClear" class="fr iconfont icon-quandagou" @click="clearData"></i>
		</div>
		<span v-else class="fr" @click="toggleShow1">{{data}}</span>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				data: '',
				isClear: false,
				toggle: true
			};
		},
		props: {
			short: '',
			shortToo: '',
			placeholder: ''
		},
		methods: {
			clearData() {
				this.data = '';
				this.isClear = false;
				console.log(2);
			},
			toggleShow() {
				if (this.data) {
					this.toggle = false;
				}
				console.log(1);
			},
			toggleShow1() {
				this.toggle = true;
				this.isClear = true;
			}
		}
	};
</script>

<style lang="stylus" scoped>
	.ts-input {
		width: calc(100% - 90px);
		display: inline-block;
		.content {
			position: relative;
			vertical-align: middle;
		}
		span {
			position: relative;
			top: 2px;
			display: inline-block;
			width: 90%;
			font-size: 14px;
			color: #666;
			text-align: right;
		}
	}
	.short {
		width: calc(100% - 150px);
	}
	.shortToo {
		width: calc(100% - 190px);
	}
	
	.iconfont {
		position: absolute;
		right: -5px;
		top: 50%;
		transform: translateY(-46%);
	}
	.icon-quandagou::before {
		color: #4C93FD;
	}
	
	input {
		width: 93%;
		height: 36px;
		color: #666;
		font-size: 14px;
		text-align: right;
		border: 0;
		outline: 0;
	}
</style>
