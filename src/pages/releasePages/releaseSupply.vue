<template>
	<div class="buy-wrap">
		<div class="content-wrap">
			<div class="form-item">
				<div>
					<label>供应类型</label>
					<ts-go :title="supplyTypeTitle" @tsGo="goSupplyShow" :data="supplyTypeData.str"></ts-go>
					<ts-model-c :title="'供应类型'" v-show="modelShow2" @closeMethod="goSupplyHide" @cancelMethod="cancelSupply" @yesMethod="yesSupply">
						<div class="ts-model-c-item">
							<h5>花型种类</h5>
							<ts-radio :items="options" @onChange="selectMianliao"></ts-radio>
						</div>
						<border :styleData="styleData1"></border>
						<div class="ts-model-c-item">
							<h5>其他</h5>
							<ts-radio :items="options1" @onChange="selectShapes"></ts-radio>
						</div>
					</ts-model-c>
				</div>
			</div>
			<border :styleData="styleData"></border>
		</div>
		<div class="content-wrap">
			<border :styleData="styleData"></border>
			<div class="form-item form-item-auto">
				<textarea class="buy-desc" v-model="releaseSupplyForm.supplyDesc" maxlength="50" rows="2" placeholder="请填写供应花型的详细信息，如花高，宽幅等"></textarea>
				<border :styleData="styleData"></border>
			</div>
			<div class="form-item">
				<div>
					<label>供应数量(选填)：</label>
					<ts-input :shortToo="true" @toggleShow="supplyNumData"></ts-input>
					<span class="showPriceInfo fr">{{supplyUnitStr?supplyUnitStr:priceOptions[0].title}}<i class="iconfont icon-back" @click="goPriceShow"></i></span>
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
							<label class="upload-label">
								<p>上传本地花型</p>
								<aliUpload :id="'pic-up'" :fileType="4" @doUpload="picUpload" style="display: none;"></aliUpload>
							</label>
						</div>
					</ts-model>
				</div>
			</div>
			<border :styleData="styleData"></border>
			<div class="showImg" v-if="imgData">
				<img :src="imgData" />
				<border :styleData="styleData"></border>
			</div>
		</div>
		<ts-button @btnClick="submitForm"></ts-button>
	</div>
</template>

<script>
	import { releaseCompanySupply } from '@/common/api/api';
	import { info } from '@/common/js/tip/toast';
	const unitData = [{ title: '公斤', value: 400011 },
		{ title: '码', value: 400010 },
		{ title: '条', value: 400012 }
	];
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
				modelShow2: false, // 供应类型
				priceOptions: [{ title: '码', value: 400010 }, { title: '公斤', value: 400011 }, { title: '条', value: 400012 }],
				releaseSupplyForm: {
					productPicUrl: '', // 图片
					supplyDesc: '', // 供应描述
					supplyShapes: '', // 供应形态
					supplyType: '', // 供应类型
					supplyNum: '', // 供应数量
					supplyUnit: '' // 计量单位
				},
				imgData: '', // 展示图片base64信息
				supplyUnitStr: '', // 计量单位展示
				supplyTypeTitle: '请选择类型', // 供应类型提示
				supplyTypeData: {
					str1: '',
					str2: '',
					str: ''
				}, // 供应类型选择信息展示
				// 花型种类数据
				options: [{ name: 'supplyType', label: 100010, types: '面料' },
					{ name: 'supplyType', label: 100011, types: '大边' },
					{ name: 'supplyType', label: 100012, types: '小边' },
					{ name: 'supplyType', label: 100013, types: '睫毛' }
				],
				// 成品胚布类型数据
				options1: [{ name: 'supplyShapes', label: 200011, types: '成品' },
					{ name: 'supplyShapes', label: 200010, types: '胚布' }
				]
			};
		},
		computed: {
			flowerModelTitle() {
				if (this.imgData) {
					return '变更花型';
				} else {
					return '上传花型';
				}
			}
		},
		created() {},
		methods: {
			goPriceHide() {
				this.modelShow = false;
			},
			goPriceShow() {
				this.modelShow = true;
			},
			// 计量单位展示
			unitDataShow() {
				// 计量单位数据重置
				this.releaseSupplyForm.supplyUnit = 400011;
				this.supplyUnitStr = '';
				// 展示相应计量单位
				if (this.releaseSupplyForm.supplyShapes === 200010) {
					this.priceOptions = unitData.slice(0, 1);
				} else {
					if (this.releaseSupplyForm.supplyType !== 100013) {
						this.priceOptions = unitData.slice(0, 2);
					} else {
						this.priceOptions = unitData;
					}
				}
			},
			// 选择计量单位
			selectItemPrice(e) {
				this.releaseSupplyForm.supplyUnit = this.priceOptions[e].value;
				this.supplyUnitStr = this.priceOptions[e].title; // tsGO 赋值展示
				console.log(this.supplyUnitStr);
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
				this.imgData = e.base64Url[0];
				this.releaseSupplyForm.productPicUrl = e.ossUrl[0];
				this.goUpFlowerHide();
			},
			goSupplyShow() {
				this.modelShow2 = true;
			},
			goSupplyHide() {
				this.modelShow2 = false;
			},
			cancelSupply() {
				this.releaseSupplyForm.supplyType = '';
				this.releaseSupplyForm.supplyShapes = '';
				this.supplyTypeData.str1 = '';
				this.supplyTypeData.str2 = '';
				this.goSupplyHide();
			},
			yesSupply() {
				if (this.supplyTypeData.str1 && this.supplyTypeData.str2) {
					this.supplyTypeData.str = this.supplyTypeData.str1 + '-' + this.supplyTypeData.str2;
				} else {
					this.supplyTypeData.str = '';
				}
				this.goSupplyHide();
			},
			// 选择花型种类
			selectMianliao(e) {
				this.releaseSupplyForm.supplyType = e.label;
				this.supplyTypeData.str1 = e.types;
				this.unitDataShow();
			},
			selectShapes(e) {
				this.releaseSupplyForm.supplyShapes = e.label;
				this.supplyTypeData.str2 = e.types;
				this.unitDataShow();
			},
			// 供应数量
			supplyNumData(e) {
				this.releaseSupplyForm.supplyNum = e;
			},
			// 提交表单
			submitForm() {
				if (!this.releaseSupplyForm.supplyType) {
					info({ text: '请选择供应类型' });
					return;
				}
				if (!this.releaseSupplyForm.supplyShapes) {
					info({ text: '请选择供应形态' });
					return;
				}
				if (!this.releaseSupplyForm.supplyDesc) {
					info({ text: '请填写供应描述' });
					return;
				}
				if (!this.releaseSupplyForm.productPicUrl) {
					info({ text: '请上传供应图片' });
					return;
				}
				console.log(this.releaseSupplyForm);
				releaseCompanySupply(this.releaseSupplyForm, (res) => {
					if (res.code === 0) {
						info({ text: '发布成功' });
					};
				}, (err) => {
					console.log(err);
				});
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
