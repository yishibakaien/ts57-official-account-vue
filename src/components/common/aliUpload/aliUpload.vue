<template>
	<div class="oss-file">
		<input type="file" :id="id" accept="image/png,image/jpeg,image/gif,image/bmp" :multiple="multiple" @change="doUpload($event)" />
	</div>
</template>
<script>
	import uploadPicture from '@/common/js/uploadPicture';
	import { token } from '@/common/api/api';
	export default {
		props: ['multiple', 'id', 'fileType'],
		data() {
			return {
				dir: '',
				region: 'oss-cn-shenzhen',
				url: {
					base64Url: [],
					ossUrl: []
				}
			};
		},
		methods: {
			uuidMethod() {
				return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
					let r = Math.random() * 16 | 0,
						v = c == 'x' ? r : (r & 0x3 | 0x8);
					return v.toString(16);
				});
			},
			doUpload() {
				let _ = this;
				const files = document.getElementById(_.id);
				const fileLen = files.files;
				const rFilter = /^(image\/jpeg|image\/png|image\/bmp)$/i;
				for (let i = 0; i < fileLen.length; i++) {
					let imgObj = fileLen[i];
					if (!rFilter.test(imgObj.type) && imgObj.type != '') {
						alert('图片格式不正确，请检查');
						return;
					}
					// 图片大小限制1MB以下 2097152
					if (imgObj.size <= 0 || imgObj.size >= 1048576) {
						alert('图片大小请限制在一兆以内');
						return;
					}
				};
				token({ fileType: this.fileType }, (res) => {
					_.dir = res.data.dir;
					const client = new OSS.Wrapper({
						region: _.region,
						accessKeyId: res.data.accessKeyId,
						accessKeySecret: res.data.accessKeySecret,
						stsToken: res.data.securityToken,
						bucket: res.data.bucket
					});
					if (fileLen) {
						for (let i = 0; i < fileLen.length; i++) {
							let file = fileLen[i];
							//1
							uploadPicture(file).then((result) => {
								_.url.base64Url.push(result);
							});
							let storeAs = _.dir + 'web-' + _.uuidMethod().split('-').join('') + '.' + file.name.split('.')[file.name.split('.').length - 1];
							//2
							client.multipartUpload(storeAs, file, {}).then((results) => {
								_.url.ossUrl.push(storeAs);
								_.$emit('doUpload', _.url);
							}).catch((err) => {
								console.log(err);
							});
						}
					}
				}, (res) => {});
			}
		}
	};
</script>
<style type="text/css" scoped>
	.oss-file {
		float: left;
	}
	
	.oss-file input {
		position: absolute;
		opacity: 0;
		filter: alpha(opacity=0);
	}
</style>
