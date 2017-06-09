<template>
	<div class="buy-wrap">
		<div class="content-wrap">
			<div class="form-item">
				<div>
					<label>求购类型</label>
					<ts-go :title="'请选择类型'" @tsGo="goBuyShow"></ts-go>
					<ts-model-c :title="'求购类型'" v-show="modelShow2" @closeMethod="goBuyHide" @cancelMethod="cancelBuy" @yesMethod="yesBuy">
						<div class="ts-model-c-item">
							<h5>花型种类</h5>
							<ts-radio :items="options" @onChange="selectMianliao"></ts-radio>
						</div>
						<border :styleData="styleData1"></border>
						<div class="ts-model-c-item">
							<h5>其他</h5>
							<ts-radio :items="options1"></ts-radio>
						</div>
					</ts-model-c>
				</div>
			</div>
			<border :styleData="styleData"></border>
		</div>
		<div class="content-wrap">
			<border :styleData="styleData"></border>
			<div class="form-item">
				<label>接受开机：</label>
				<ts-radio-c :items="options2"></ts-radio-c>
			</div>
			<div class="form-item form-item-auto">
				<border :styleData="styleData"></border>
				<textarea class="buy-desc" name="" rows="2" placeholder="请填写求购花型的详细信息，如花高，宽幅等"></textarea>
				<border :styleData="styleData"></border>
			</div>
			<div class="form-item">
				<div>
					<label>求购数量(选填)：</label>
					<ts-input :shortToo="true"></ts-input>
					<span class="showPriceInfo fr">{{releaseBuyForm.priceUnit?releaseBuyForm.priceUnit:priceOptions[0].title}}<i class="iconfont icon-back" @click="goPriceShow"></i></span>
					<ts-model :title="'计量单位'" v-show="modelShow" @cancleMethod="goPriceHide">
						<div class="model-item model-item-price" v-for="(item, index) in priceOptions" @click="selectItemPrice(index)">
							<p>{{item.title}}</p>
						</div>
					</ts-model>
				</div>
			</div>
			<border :styleData="styleData"></border>
		</div>
		<div class="content-wrap">
			<border :styleData="styleData"></border>
			<div class="form-item form-item-auto">
				<div>
					<label>{{flowerModelTitle}}</label>
					<ts-go @tsGo="goUpFlowerShow"></ts-go>
					<ts-model :title="'上传花型'" v-show="modelShow1" @cancleMethod="goUpFlowerHide">
						<div class="model-item model-item-price">
							<label>
								<p>上传本地花型</p>
								<input type="file" accept="image/*" style="display: none;" @change="picUpload($event)"/>							
							</label>
						</div>
					</ts-model>
				</div>
			</div>
			<border :styleData="styleData"></border>
			<div class="showImg" v-if="releaseBuyForm.imgData">
				<img :src="releaseBuyForm.imgData"/>
				<border :styleData="styleData"></border>
			</div>
		</div>
	</div>
</template>

<script>
	import uploadPicture from '@/common/js/uploadPicture';
	export default {
		data() {
			return {
				styleData: {
					width: '100%'
				},
				styleData1: {
					width: '96%',
					background: '#f2f2f2',
					float: 'right'
				},
				modelShow: false, // 选择计量单位
				modelShow1: false, // 上传照片
				modelShow2: false, // 求购类型
				priceOptions: [{ title: '码' }, { title: '公斤' }, { title: '条' }],
				releaseBuyForm: {
					priceUnit: '',
					imgData: ''
				},
				// 花型种类数据
				options: [{name: 'types', label: 1, types: '面料'},
					{name: 'types', label: 2, types: '大边'},
					{name: 'types', label: 3, types: '小边'},
					{name: 'types', label: 4, types: '睫毛'}
				],
				// 成品胚布类型数据
				options1: [{name: 'buliao', label: 1, types: '成品'},
					{name: 'buliao', label: 2, types: '胚布'}
				],
				// 是否接受开机
				options2: [{name: 'kaiji', label: 0, types: '不接受'},
					{name: 'kaiji', label: 1, types: '接受'}
				]
			};
		},
		computed: {
			flowerModelTitle() {
				if (this.releaseBuyForm.imgData) {
					return '变更花型';
				} else {
					return '上传花型';
				}
			}
		},
		created() {
		},
		methods: {
			goPriceHide() {
				this.modelShow = false;
			},
			goPriceShow() {
				this.modelShow = true;
			},
			// 选择计量单位
			selectItemPrice(e) {
				this.releaseBuyForm.priceUnit = this.priceOptions[e].title; // tsGO 赋值展示
				this.goPriceHide();
			},
			goUpFlowerShow() {
				this.modelShow1 = true;
			},
			goUpFlowerHide() {
				this.modelShow1 = false;
			},
			// 花型上传预览
			picUpload(e) {
				let fileData = e.target.files[0];
				uploadPicture(fileData).then((result) => {
					console.log(result);
					this.releaseBuyForm.imgData = result;
				});
				this.goUpFlowerHide();
			},
			goBuyShow() {
				this.modelShow2 = true;
			},
			goBuyHide() {
				this.modelShow2 = false;
			},
			cancelBuy() {
				console.log(1);
			},
			yesBuy() {
				console.log(2);
				this.goBuyHide();
			},
			// 选择花型种类
			selectMianliao(e) {
				console.log(e);
			}
		}
	};
</script>

<style lang="stylus" scoped>
	.content-wrap {
		margin-bottom: 10px;
		background: #fff;
		width: 100%;
		.form-item {
			height: 40px;
			padding-left: 12px;
			label {
				display: inline-block;
				color: #666;
				line-height: 40px;
				font-size: 14px;
			}
		}
		.form-item-auto {
			height: auto;
		}
		.buy-desc {
			width: 100%;
			outline: none;
			line-height: 26px;
			font-size: 14px;
			color: #666;
			border: 0;
		}
		textarea::-webkit-input-placeholder {
			color: #666;
			font-size: 12px;
		}
	}
	.model-item {
		p {
			padding: 5px 0 2px 0;
			color: #4C93FD;
			font-size: 15px;
		}
		span {
			color: #666666;
			font-size: 12px;
		}
	}
	.model-item-price {
		line-height: 38px;
	}
	.showPriceInfo {
		font-size: 14px;
		padding-right: 5px;
		line-height: 40px;
		i {
			padding-left: 10px;
			padding-right: 12px;
			font-size: 14px;
		}
	}
	.showImg {
		img {
			padding: 20px;
			max-width: 160px;
		}
	}
	.ts-model-c-item {
		padding-left: 15px;
		padding: 20px 0 20px 15px;
		h5 {
			line-height: 20px;
			font-size: 14px;
			color: #615f5f;
		}
	}
</style>
