<template>
	<div class="newPatterns">
		<form>
			<div>
				<div class="content">
					<label for="pic-up">
						<P>
							<img v-if="flowerData64" :src="flowerData64" alt="花型图片"/>
							<i v-else class="iconfont icon-tianjiatupian"></i>
						</P>
					</label>
					<aliUpload :id="'pic-up'" :fileType="3" @doUpload="uploadImg"></aliUpload>
				</div>
			</div>
			<div class="content-wrap">
				<border :styleData="styleData1"></border>
				<div class="form-item">
					<ts-radio :items="options" @onChange="selectMianliao"></ts-radio>
				</div>
				<div class="form-item">
					<border :styleData="styleData1"></border>
					<label>编号：</label>
					<ts-input @toggleShow="productNoData" @clearData="clearProductNoData"></ts-input>
					<border :styleData="styleData1"></border>
				</div>
				<div class="form-item form-item-auto">
					<div>
						<label>成分：</label>
						<ts-go @tsGo="goCustom" :data="addPatternForm.ingredient"></ts-go>
					</div>
					<border :styleData="styleData1"></border>
					<div class="ts-customCf" v-show="customShow">
						<div class="ts-custom-item" v-for="(customItem, index) in customItems" @click="isOKMethod(index)">
							<span>{{customItem.ingredientName}}</span>
							<i v-show="customItem.isOK" class="fr iconfont icon-quandagou" @click.stop="yesCustom(index)"></i>
						</div>
						<div class="ts-custom-input" v-if="customIsShow">
							<div class="">
								<input type="text" placeholder="请输入自定义分类" v-model="customData.customCf" @blur="yesAddCustom" />
							</div>
						</div>
						<div class="ts-custom-additem">
							<span @click="addCustom">+自定义</span>
						</div>
						<border :styleData="styleData2"></border>
					</div>
				</div>
				<div class="form-item">
					<ts-radio :items="options1" @onChange="selectProductShape"></ts-radio>
					<border :styleData="styleData1"></border>
				</div>
				<div class="form-item">
					<label>库存：</label>
					<ts-radio-c :items="options2" @onChange="selectStock"></ts-radio-c>
					<border :styleData="styleData1"></border>
				</div>
				<div class="form-item" v-if="haveStock">
					<div>
						<label>库存数量：</label>
						<ts-input :short="true" @toggleShow="stockData" @clearData="clearStockData"></ts-input>
						<span class="showPriceInfo fr">{{unitTitle?unitTitle:options4[0].title}}<i class="iconfont icon-back" @click="goPriceShow"></i></span>
						<ts-model :title="'计量单位'" v-show="modelShow2" @cancleMethod="goPriceHide">
							<div class="model-item model-item-price" v-for="(item, index) in options4" @click="selectItemPrice(index)">
								<p>{{item.title}}</p>
							</div>
						</ts-model>
					</div>
					<border :styleData="styleData1"></border>
				</div>
				<div class="form-item">
					<div>
						<label>上架至：</label>
						<ts-go @tsGo="goShangjiaShow" :data="publishTitle"></ts-go>
						<ts-model :title="'上架新增花型'" v-show="modelShow" @cancleMethod="goShangjiaHide">
							<div class="model-item" v-for="(item, index) in options3" @click="selectItemSJ(index)">
								<p>{{item.title}}</p>
								<span>{{item.desc}}</span>
							</div>
						</ts-model>
					</div>
				</div>
			</div>
			<border :styleData="styleData1"></border>
			<div class="title">
				选填信息
			</div>
			<border :styleData="styleData1"></border>
			<div class="content-wrap">
				<div class="form-item">
					<div>
						<label>价格：</label>
						<ts-input :short="true" @toggleShow="priceData" @clearData="clearPriceData"></ts-input>
						<span class="showPriceInfo fr"> / {{unitTitle?unitTitle:options4[0].title}}<i class="iconfont icon-back" @click="goPriceShow"></i></span>
						<ts-model :title="'计量单位'" v-show="modelShow2" @cancleMethod="goPriceHide">
							<div class="model-item model-item-price" v-for="(item, index) in options4" @click="selectItemPrice(index)">
								<p>{{item.title}}</p>
							</div>
						</ts-model>
					</div>
					<border :styleData="styleData1"></border>
				</div>
				<div class="form-item">
					<border :styleData="styleData1"></border>
					<label>幅宽：</label>
					<ts-input :placeholder="addPatternForm.width" @toggleShow="widthData" @clearData="clearWidthData"></ts-input>
					<border :styleData="styleData1"></border>
				</div>
				<div class="form-item">
					<label>花高：</label>
					<ts-input @toggleShow="heightData" @clearData="clearHeightData"></ts-input>
					<border :styleData="styleData1"></border>
				</div>
				<div class="form-item">
					<label>出码率：</label>
					<ts-input @toggleShow="outRateData" @clearData="clearOutRateData"></ts-input>
				</div>
				<border :styleData="styleData1"></border>
			</div>
		</form>
		<ts-button @btnClick="submitForm"></ts-button>
	</div>
</template>

<script>
	import { listIngredients, addIngredient, addProduct } from '@/common/api/api';
	import { info } from '@/common/js/tip/toast';
	const unitData = [{ title: '公斤', value: 400011 },
		{ title: '码', value: 400010 },
		{ title: '条', value: 400012 }
	];
	export default {
		data() {
			return {
				modelShow: false, // 上架选择框
				modelShow2: false, // 计量单位选择框
				// 面料数据
				options: [{ name: 'category', label: 100010, types: '面料' },
					{ name: 'category', label: 100011, types: '大边' },
					{ name: 'category', label: 100012, types: '小边' },
					{ name: 'category', label: 100013, types: '睫毛' }
				],
				// 成品胚布类型数据
				options1: [{ name: 'productShape', label: 200011, types: '成品' },
					{ name: 'productShape', label: 200010, types: '胚布' }
				],
				// 是否有库存数据
				options2: [{ name: 'isStock', label: 0, types: '需要开机' },
					{ name: 'isStock', label: 1, types: '有库存' }
				],
				// 上架类型数据
				options3: [{ title: '上架平台', desc: '上架后花型对平台所有用户开放', value: '2' },
					{ title: '仅上架店铺', desc: '上架后需访问店铺才能查看', value: '1' },
					{ title: '仅保存', desc: '平台所有用户不能查看，仅内部管理', value: '0' }
				],
				// 价格单位数据
				options4: [{ title: '公斤', value: 400011 },
					{ title: '码', value: 400010 },
					{ title: '条', value: 400012 }
				],
				customItems: [],
				addPatternForm: {
					category: '', // 类别 面料大边小边睫毛
					defaultPicUrl: '', // 花型图片
					productNo: '', // 花型编号
					ingredient: '', // 自定义成分
					productShape: '', // 产品形态 成品或胚布
					isStock: '', // 是否有库存
					publishStatus: '', // 上架方式
					stock: '', // 库存
					stockUnit: 400011, // 库存单位 默认公斤
					price: '', // 价格
					priceUnit: 400011, // 价格单位
					width: '', // 幅宽
					height: '', // 花高
					outRate: '' // 出码率
				},
				publishTitle: '', // 上架方法文字展示
				unitTitle: '', // 单位文字展示
				flowerData64: '', // 花型图片base64数据
				styleData: {
					width: '96%',
					float: 'right'
				},
				styleData1: {
					width: '100%'
				},
				styleData2: {
					background: '#666',
					width: '100%'
				},
				customShow: false, // 自定义分类
				customIsShow: false, // 自定义分类-input
				customData: {
					customCf: '' // 自定义成份
				},
				haveStock: false // 是否有库存
			};
		},
		created() {
			listIngredients('', (res) => {
				console.log(res.data);
				res.data.forEach(item => {
					item.isOK = false;
				});
				this.customItems = res.data;
			}, (res) => {
				console.log(res);
			});
		},
		methods: {
			// 显示自定义成分
			goCustom() {
				this.customShow = !this.customShow;
			},
			// 点击添加自定义成分
			addCustom() {
				if (this.customIsShow && !this.customData.customCf) {
					info({text: '请填写自定义成分'});
					return;
				}
				this.customIsShow = true;
			},
			// 确定添加自定义成分
			yesAddCustom() {
				if (this.customData.customCf !== '') {
					addIngredient({ ingredientName: this.customData.customCf }, (res) => {
						if (res.code === 0) {
							this.customIsShow = false;
							this.customItems.push({ ingredientName: this.customData.customCf, isOK: false });
							this.customItems.forEach(item => {
								item.isOK = false;
							});
							this.customItems[this.customItems.length - 1].isOK = true;
							this.customData.customCf = '';
						}
					});
				}
			},
			// 点击选择成分
			isOKMethod(e) {
				this.customItems.forEach(item => {
					item.isOK = false;
				});
				this.customItems[e].isOK = true;
			},
			// 确定当前选中分类
			yesCustom(e) {
				this.addPatternForm.ingredient = this.customItems[e].ingredientName;
				this.customShow = false;
			},
			// 上架至-弹出选择框
			goShangjiaShow() {
				this.modelShow = true;
			},
			// 上架至-隐藏选择框
			goShangjiaHide() {
				this.modelShow = false;
			},
			// 选择上架方式
			selectItemSJ(e) {
				this.addPatternForm.publishStatus = this.options3[e].value;
				this.publishTitle = this.options3[e].title; // tsGO 赋值展示
				this.goShangjiaHide();
			},
			// 计量单位选择框展示
			goPriceShow() {
				this.modelShow2 = true;
			},
			// 计量单位选择框隐藏
			goPriceHide() {
				this.modelShow2 = false;
			},
			// 选择计量单位
			selectItemPrice(e) {
				this.addPatternForm.priceUnit = this.options4[e].value;
				this.addPatternForm.stockUnit = this.options4[e].value;
				this.unitTitle = this.options4[e].title; // tsGO 赋值展示
				this.goPriceHide();
			},
			// 选择面料
			selectMianliao(e) {
				e = e.label;
				this.addPatternForm.category = e;
				if (e === 100010) {
					this.addPatternForm.width = 150;
				} else {
					this.addPatternForm.width = '';
				}
				this.unitDataShow();
			},
			// 选择产品形态
			selectProductShape(e) {
				e = e.label;
				this.addPatternForm.productShape = e;
				this.unitDataShow();
			},
			// 计量单位展示
			unitDataShow() {
				// 计量单位数据重置
				this.addPatternForm.priceUnit = 400011;
				this.addPatternForm.stockUnit = 400011;
				this.unitTitle = '';
				// 展示相应计量单位
				if (this.addPatternForm.productShape === 200010) {
					this.options4 = unitData.slice(0, 1);
				} else {
					if (this.addPatternForm.category !== 100013) {
						this.options4 = unitData.slice(0, 2);
					} else {
						this.options4 = unitData;
					}
				}
			},
			// 选择是否有库存
			selectStock(e) {
				e = e.label;
				if (e === 1) {
					this.haveStock = true;
				} else {
					this.haveStock = false;
				}
				this.addPatternForm.isStock = e;
			},
			// 库存数量
			stockData(e) {
				this.addPatternForm.stock = e;
			},
			// 清空库存数量
			clearStockData() {
				this.addPatternForm.stock = '';
			},
			// 上传花型
			uploadImg(e) {
				this.addPatternForm.defaultPicUrl = e.ossUrl[0];
				this.flowerData64 = e.base64Url[0];
			},
			// 确定花型编号
			productNoData(e) {
				this.addPatternForm.productNo = e;
			},
			// 清空花型编号
			clearProductNoData() {
				this.addPatternForm.productNo = '';
			},
			// 价格
			priceData(e) {
				this.addPatternForm.price = e;
			},
			// 清空价格
			clearPriceData() {
				this.addPatternForm.price = '';
			},
			// 幅宽
			widthData(e) {
				this.addPatternForm.width = e;
			},
			// 清除幅宽
			clearWidthData() {
				this.addPatternForm.width = '';
			},
			// 花高
			heightData(e) {
				this.addPatternForm.height = e;
			},
			// 清除花高
			clearHeightData() {
				this.addPatternForm.height = '';
			},
			// 出码率
			outRateData(e) {
				this.addPatternForm.outRate = e;
			},
			// 清除出码率
			clearOutRateData() {
				this.addPatternForm.outRate = '';
			},
			// 提交表单
			submitForm() {
				console.log(this.addPatternForm);
				if (!this.addPatternForm.defaultPicUrl) {
					info({text: '请上传花型图片'});
					return;
				}
				if (!this.addPatternForm.productNo) {
					info({text: '请填写花型编号'});
					return;
				}
				if (!this.addPatternForm.ingredient) {
					info({text: '请选择成分'});
					return;
				}
				if (!this.addPatternForm.productShape) {
					info({text: '请选择产品形态'});
					return;
				}
				if (this.addPatternForm.isStock.length === 0) {
					info({text: '请选择是否有库存'});
					return;
				}
				if (this.addPatternForm.publishStatus.length === 0) {
					info({text: '请选择上架信息'});
					return;
				}
				addProduct(this.addPatternForm, (res) => {
					console.log(res);
				}, (err) => {
					console.log(err);
				});
			}
		}
	};
</script>

<style lang="stylus" scoped>
	.newPatterns {
		padding-top: 10px;
		width: 100%;
		min-height: 100vh;
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
				.icon-tianjiatupian::before {
					color: #666;
					font-size: 26px;
				}
				img {
					width: 100%;
					height: 100%;
				}
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
					width: 70px;
					color: #666;
					line-height: 40px;
					font-size: 14px;
				}
			}
			.form-item-auto {
				height: auto;
			}
		}
		.ts-customCf {
			.ts-custom-input,
			.ts-custom-additem,
			.ts-custom-item {
				height: 36px;
				line-height: 34px;
				color: #666;
			}
			.ts-custom-item {
				font-size: 12px;
				color: #666;
				border-bottom: 1px solid #c5c5c5;
				.iconfont {
					margin-top: 2px;
					margin-right: 20px;
				}
				.icon-quandagou::before {
					color: #4c93fd;
				}
			}
			.ts-custom-additem {
				border-left: 0;
				border-right: 0;
				span {
					margin-left: 20px;
					padding: 1px 7px 2px 5px;
					color: #fff;
					font-size: 12px;
					background: #c5c5c5;
					border-radius: 3px;
				}
			}
			.ts-custom-input {
				border-bottom: 1px solid #c5c5c5;
				input {
					padding-left: 20px;
				}
				input::-webkit-input-placeholder {
					color: #666;
					font-size: 14px;
				}
			}
		}
		.title {
			padding: 16px 0 5px 15px;
			font-size: 14px;
			color: #666;
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
		}
	}
</style>
