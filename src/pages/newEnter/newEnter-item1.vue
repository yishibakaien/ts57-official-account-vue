<template>
	<div class="factor-wrap" @click="gotoStore(itemObj.indexName)">
		<img :src="itemObj.pic" alt="优质厂家"/>
	</div>
</template>

<script>
	export default {
		props: {
			itemObj: {
				type: Object
			}
		},
		methods: {
			gotoStore(indexName) {
				if (indexName) {
					location.href = indexName + '.ts57.cn';
				} else {
					console.log('接口数据暂无indexNmae');
				}
			}
		}
	};
</script>

<style lang="stylus" scoped>
.factor-wrap {
	box-sizing: border-box;
	width: 50%;
	img {
		padding: 4% 2% 0 4%;
		width: 92%;
	}
}
</style>
