<template>
	<div class="buy-wrap">
		<div class="content-wrap">
			<div class="form-item">
				<div>
					<label>求购类型</label>
					<ts-go :title="buyTypeTitle" @tsGo="goBuyShow" :data="buyTypeData.str"></ts-go>
					<ts-model-c :title="'求购类型'" v-show="modelShow2" @closeMethod="goBuyHide" @cancelMethod="cancelBuy" @yesMethod="yesBuy">
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
			<div class="form-item">
				<label>接受开机：</label>
				<ts-radio-c :items="options2" @onChange="selectStartUp"></ts-radio-c>
			</div>
			<div class="form-item form-item-auto">
				<border :styleData="styleData"></border>
				<textarea class="buy-desc" v-model="releaseBuyForm.buyDesc" name="" rows="2" placeholder="请填写求购花型的详细信息，如花高，宽幅等"></textarea>
				<border :styleData="styleData"></border>
			</div>
			<div class="form-item">
				<div>
					<label>求购数量(选填)：</label>
					<ts-input :shortToo="true" @toggleShow="buyNumData" @clearData="clearBuyNum"></ts-input>
					<span class="showPriceInfo fr">{{buyUnitStr?buyUnitStr:priceOptions[0].title}}<i class="iconfont icon-back" @click="goPriceShow"></i></span>
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
		import { releaseProductBuy } from '@/common/api/api';
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
				buyTypeTitle: '请选择类型',
				modelShow: false, // 选择计量单位
				modelShow1: false, // 上传照片
				modelShow2: false, // 求购类型
				priceOptions: [{ title: '公斤', value: 400011 },
					{ title: '码', value: 400010 },
					{ title: '条', value: 400012 }
				],
				releaseBuyForm: {
					buyType: '', // 求购类型
					buyDesc: '', // 求购描述
					buyShapes: '', // 求购形态
					isStartUp: '', // 是否接受开机
					buyUnit: '', // 求购单位
					buyNum: '', // 求购数量
					buyPicUrl: '' // 求购图片
				},
				imgData: '', // 预览图BASE64位数据
				buyUnitStr: '', // 计量单位展示
				buyTypeData: {
					str: '',
					str1: '',
					str2: ''
				}, // 求购类型选择信息展示
				// 花型种类数据
				options: [{ name: 'buyType', label: 100010, types: '面料' },
					{ name: 'buyType', label: 100011, types: '大边' },
					{ name: 'buyType', label: 100012, types: '小边' },
					{ name: 'buyType', label: 100013, types: '睫毛' }
				],
				// 成品胚布类型数据
				options1: [{ name: 'buyShapes', label: 200011, types: '成品' },
					{ name: 'buyShapes', label: 200010, types: '胚布' }
				],
				// 是否接受开机
				options2: [{ name: 'isStartUp', label: 0, types: '不接受' },
					{ name: 'isStartUp', label: 1, types: '接受' }
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
		methods: {
			goPriceHide() {
				this.modelShow = false;
			},
			goPriceShow() {
				this.modelShow = true;
			},
			// 选择计量单位
			selectItemPrice(e) {
				this.releaseBuyForm.buyUnit = this.priceOptions[e].value;
				this.buyUnitStr = this.priceOptions[e].title; // tsGO 赋值展示
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
				this.releaseBuyForm.buyPicUrl = e.ossUrl[0];
				this.goUpFlowerHide();
			},
			goBuyShow() {
				this.modelShow2 = true;
			},
			goBuyHide() {
				this.modelShow2 = false;
			},
			cancelBuy() {
				this.releaseBuyForm.buyType = '';
				this.releaseBuyForm.buyShapes = '';
				this.buyTypeData.str1 = '';
				this.buyTypeData.str2 = '';
				this.goBuyHide();
			},
			yesBuy() {
				if (this.buyTypeData.str1 && this.buyTypeData.str2) {
					this.buyTypeData.str = this.buyTypeData.str1 + '-' + this.buyTypeData.str2;
				} else {
					this.buyTypeData.str = '';
				}
				this.goBuyHide();
			},
			// 选择花型种类
			selectMianliao(e) {
				this.releaseBuyForm.buyType = e.label;
				this.buyTypeData.str1 = e.types;
				this.unitDataShow();
			},
			// 选择产品形态
			selectShapes(e) {
				this.releaseBuyForm.buyShapes = e.label;
				this.buyTypeData.str2 = e.types;
				this.unitDataShow();
			},
			// 选择是否开机
			selectStartUp(e) {
				this.releaseBuyForm.isStartUp = e.label;
			},
			// buyNumData求购数量
			buyNumData(e) {
				this.releaseBuyForm.buyNum = e;
			},
			// 清空求购数量
			clearBuyNum() {
				this.releaseBuyForm.buyNum = '';
			},
			// 计量单位展示
			unitDataShow() {
				// 计量单位数据重置
				this.releaseBuyForm.buyUnit = 400011;
				this.buyUnitStr = '';
				// 展示相应计量单位
				if (this.releaseBuyForm.buyShapes === 200010) {
					this.priceOptions = unitData.slice(0, 1);
				} else {
					if (this.releaseBuyForm.buyType !== 100013) {
						this.priceOptions = unitData.slice(0, 2);
					} else {
						this.priceOptions = unitData;
					}
				}
			},
			submitForm() {
				console.log(this.releaseBuyForm);
				if (!this.releaseBuyForm.buyType) {
					info({ text: '请选择求购类型' });
					return;
				}
				if (!this.releaseBuyForm.buyShapes) {
					info({ text: '请选择求购形态' });
					return;
				}
				if (this.releaseBuyForm.isStartUp.length === 0) {
					info({ text: '请选择是否接受开机' });
					return;
				}
				if (!this.releaseBuyForm.buyDesc) {
					info({ text: '请输入求购描述' });
					return;
				}
				if (!this.releaseBuyForm.buyPicUrl) {
					info({ text: '请上传求购花型图片' });
					return;
				}
				releaseProductBuy(this.releaseBuyForm, (res) => {
					if (res.code === 0) {
						console.log(1);
						info({text: '发布成功'});
						this.$router.push({
							path: '/buyDetail'
						});
					}
				}, (err) => {
					console.log(err);
					info({text: err});
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
