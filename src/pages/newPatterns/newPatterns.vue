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
					<ts-input @toggleShow="productNoData"></ts-input>
					<border :styleData="styleData1"></border>
				</div>
				<div class="form-item form-item-auto">
					<div>
						<label>成分：</label>
						<ts-go @tsGo="goCustom" :data="addPatternForm.customCf"></ts-go>
					</div>
					<border :styleData="styleData1"></border>
					<div class="ts-customCf" v-show="customShow">
						<div class="ts-custom-item" v-for="(customItem, index) in customItems" @click="isOKMethod(index)">
							<span>{{customItem.str}}</span>
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
					<ts-radio :items="options1"></ts-radio>
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
						<ts-input :short="true"></ts-input>
						<span class="showPriceInfo fr">{{addPatternForm.priceUnit?addPatternForm.priceUnit:options4[0].title}}<i class="iconfont icon-back" @click="goPriceShow"></i></span>
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
						<ts-go @tsGo="goShangjiaShow" :data="addPatternForm.shangjia"></ts-go>
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
						<ts-input :short="true"></ts-input>
						<span class="showPriceInfo fr"> / {{addPatternForm.priceUnit?addPatternForm.priceUnit:options4[0].title}}<i class="iconfont icon-back" @click="goPriceShow"></i></span>
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
					<ts-input :placeholder="'150'"></ts-input>
					<border :styleData="styleData1"></border>
				</div>
				<div class="form-item">
					<label>花高：</label>
					<ts-input></ts-input>
					<border :styleData="styleData1"></border>
				</div>
				<div class="form-item">
					<label>出码率：</label>
					<ts-input></ts-input>
				</div>
				<border :styleData="styleData1"></border>
			</div>
		</form>
	</div>
</template>

<script>
	// 自定义成分数据
	const data = [{str: '锦纶'},
		{str: '锦氨'},
		{str: '锦涤'},
		{str: '锦棉'},
		{str: '涤纶'}
	];
	export default {
		data() {
			return {
				modelShow: false, // 上架选择框
				modelShow2: false, // 计量单位选择框
				// 面料数据
				options: [{name: 'types', label: 100010, types: '面料'},
					{name: 'types', label: 100011, types: '大边'},
					{name: 'types', label: 100012, types: '小边'},
					{name: 'types', label: 100013, types: '睫毛'}
				],
				// 成品胚布类型数据
				options1: [{name: 'buliao', label: 1, types: '成品'},
					{name: 'buliao', label: 2, types: '胚布'}
				],
				// 是否有库存数据
				options2: [{name: 'kucun', label: 0, types: '需要开机'},
					{name: 'kucun', label: 1, types: '有库存'}
				],
				// 上架类型数据
				options3: [{title: '上架平台', desc: '上架后花型对平台所有用户开放', value: '1'},
					{title: '仅上架店铺', desc: '上架后需访问店铺才能查看', value: '2'},
					{title: '仅保存', desc: '平台所有用户不能查看，仅内部管理', value: '3'}
				],
				// 价格单位数据
				options4: [{title: '公斤', value: '1'},
					{title: '码', value: '2'},
					{title: '条', value: '3'}
				],
				customItems: [],
				addPatternForm: {
					category: '', // 类别 面料大边小边睫毛
					defaultPicUrl: '', // 花型图片
					productNo: '', // 花型编号
					customCf: '', // 自定义成分
					shangjia: '',  // 上架方式
					price: '', // 价格
					priceUnit: '' // 价格单位
				},
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
					customCf: ''  // 自定义成份
				},
				haveStock: false // 是否有库存
			};
		},
		created() {
			console.log(data);
			data.forEach(item => {
				item.isOK = false;
			});
			this.customItems = data;
		},
		methods: {
			// 显示自定义成分
			goCustom() {
				this.customShow = !this.customShow;
			},
			// 点击添加自定义成分
			addCustom() {
				if (this.customIsShow && !this.customData.customCf) {
					alert('请填写自定义成分');
					return;
				}
				this.customIsShow = true;
			},
			// 确定添加自定义成分
			yesAddCustom() {
				this.customIsShow = false;
				data.push({ str: this.customData.customCf, isOK: false });
				data.forEach(item => {
					item.isOK = false;
				});
				data[data.length - 1].isOK = true;
				this.customData.customCf = '';
				this.customItems = data;
			},
			// 点击选择成分
			isOKMethod(e) {
				data.forEach(item => {
					item.isOK = false;
				});
				data[e].isOK = true;
				this.customItems = data;
			},
			// 确定当前选中分类
			yesCustom(e) {
				this.addPatternForm.customCf = this.customItems[e].str;
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
				this.addPatternForm.shangjia = this.options3[e].title; // tsGO 赋值展示
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
				this.addPatternForm.priceUnit = this.options4[e].title; // tsGO 赋值展示
				this.goPriceHide();
			},
			// 选择面料
			selectMianliao(e) {
				this.addPatternForm.category = e.label;
			},
			// 选择是否有库存
			selectStock(e) {
				if (e === 1) {
					this.haveStock = true;
				} else {
					this.haveStock = false;
				}
			},
			// 上传花型
			uploadImg(e) {
				this.addPatternForm.defaultPicUrl = e.ossUrl[0];
				this.flowerData64 = e.base64Url[0];
			},
			// 确定花型编号
			productNoData(e) {
				this.addPatternForm.productNo = e;
				console.log(this.addPatternForm);
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
