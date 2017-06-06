<template>
	<div class="newPatterns">
		<form>
			<div>
				<div class="content">
					<label for="pic-up">
						<P><i class="icon-">上传图片</i></P>
					</label>
					<input type="file" name="pic-up" id="pic-up" value="" />
				</div>
			</div>
			<div class="content-wrap">
				<border :styleData="styleData1"></border>
				<div class="form-item">
					<ts-radio :items="options"></ts-radio>
				</div>
				<border :styleData="styleData"></border>
				<div class="form-item">
					<label>编号：</label>
					<ts-input></ts-input>
				</div>
				<border :styleData="styleData"></border>
				<div class="form-item">
					<label>成分：</label>
					<ts-go @tsGo="goCustom"></ts-go>
				</div>
				<border :styleData="styleData"></border>
			</div>
		</form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				options: [{
						name: 'types',
						label: 1,
						types: '面料'
					},
					{
						name: 'types',
						label: 2,
						types: '大边'
					},
					{
						name: 'types',
						label: 3,
						types: '小边'
					},
					{
						name: 'types',
						label: 4,
						types: '睫毛'
					}
				],
				addPatternForm: {
					category: ''
				},
				styleData: {
					width: '96%',
					float: 'right'
				},
				styleData1: {
					width: '100%'
				}
			};
		},
		methods: {
			goCustom() {
				this.$router.push({
					path: '/customCf'
				});
			}
		}
	};
</script>

<style lang="stylus" scoped>
	.newPatterns {
		padding-top: 10px;
		width: 100%;
		min-height: 1000px;
		background: #f2f2f2;
		.content {
			width: 100%;
			padding: 20px 0;
			margin-bottom: 10px;
			border-bottom: 1px solid #d2d2d2;
			border-top: 1px solid #d2d2d2;
			background: #fff;
			p {
				margin: 0 auto;
				width: 120px;
				height: 120px;
				text-align: center;
				line-height: 120px;
				border: 1px dashed #7E8C8D;
			}
			#pic-up {
				display: none;
			}
		}
		.content-wrap {
			background: #fff;
			width: 100%;
			.form-item {
				height: 40px;
				padding-left: 16px;
				label {
					display: inline-block;
					width: 60px;
					color: #666;
					line-height: 40px;
					font-size: 14px;
				}
			}
		}
	}
</style>
