<template>
	<div class="m-me">
		<div class="m-caption">发表文章</div>
		<div class="artical">
			<Form :model="formItem" :label-width="80" :rules="ruleValidate" ref="formItem">
				<FormItem label="文章标题" prop="title">
					<Input v-model="formItem.title" placeholder="输入文章标题" name="title"></Input>
				</FormItem>
				<FormItem label="选择分类" prop="select1">
					<Select v-model="formItem.select1">
						<Option v-for="(item,index) in categoryList" :value="item" :key="item.value">{{item}}</Option>
					</Select>
				</FormItem>
				<FormItem label="预览图片" prop="avatar">
					<upload-img name="avatar" method="post" @successLoad="getPrePicture"></upload-img>
				</FormItem>
				<FormItem label="正文" prop="data" @click.native="cons">
						<vue-editor id="d1" v-model="formItem.data" :style="eidtor"></vue-editor>
				</FormItem>
				<FormItem>
					<Button type="success" @click="handleSubmit('formItem')">发表</Button>
					<Button type="ghost" @click="handleReset('formItem')" style="margin-left: 8px">重置</Button>
				</FormItem>
			</Form>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
    import { VueEditor } from 'vue2-editor'
	import uploadImg from '@/components/common/uploadImg'
	export default {
		components: {
			uploadImg,
			VueEditor
		},
		props: {
			user: {
				type: Array
			}
		},
		data() {
			return {
				eidtor:{
					height:'350px',
					position:'relative',
					marginBottom:'100px'
				},
				user1: '',
				ruleValidate: {
					title: [{
						required: true,
						message: '标题是不可少的',
						trigger: 'blur'
					}],
					data: [{
						required: true,
						message: '请输入内容',
						trigger: 'blur'
					}, {
						type: 'string',
						min: 10,
						message: '文章内容太少了',
						trigger: 'blur'
					}],
					select1: [{
						required: true,
						message: '必须选择一个',
						trigger: 'blur'
					}]
				},
				categoryList: ['故事','诗', 'Vue.js', '读书', '小清新', 'C++', 'PHP深入浅出', '冷文精选', '那些孤独撸码的日子', '其他'],
				formItem: {
					name: '',
					select1: '',
					data: ''				
				},
				prePicture:'',
				prePicturePath:'/blog/image/blogavatar/slider'

			}
		},
		methods: {
			handleSubmit(name) { //首先验证表单规则,通过再去保存文章
				if(!this.user.username){
					this.$Message.error("需要登录才可以继续操作!")
				   	this.$emit('no-sign')
				    return false
				}
				this.$refs[name].validate((valid) => {
					if(valid) {
						this.saveArtical()
					} else {
						this.$Message.error('还有些选项不符合规范');
					}
				})
			},
			handleReset(name) {
				this.$refs[name].resetFields()
			},
			getPrePicture(src) {
				this.prePicture = '/blog/image/blogavatar/' + src
				console.log(this.prePicture)
			},
			cons(){
				console.log('1')
			},
			saveArtical() {
				this.$Loading.start()
				this.$http.post('api/artical.php', {
					type: 'saveArtical',
					userId: this.user.id,
					title: this.formItem.title,
					category: this.formItem.select1,
					prePicture: this.prePicture,
					content: this.formItem.data
				}, {
					emulateJSON: true
				}).then((res) => {
					console.log(res)
					if(res.bodyText !== '0') {
						setTimeout(() => {
							this.formItem.title=''
							this.formItem.select1=''
							this.prePicture=''
							this.formItem.data=''				
							this.$Loading.finish()
							this.$Message.success('发表成功')
							this.$router.push({
								path: '/me'
							})
						}, 1000)

					} else {
						this.$Loading.error()
						this.$Message.error('发表失败,文章过长或者未知错误!')
					}
				})

			}
		},
		created() {
			this.prePicture=this.prePicturePath+parseInt(Math.random()*6+8,10)+'.jpg'		
		}
	}
</script>

<style lang="less">
	@color1: #41b883;
	@color2: #2c3e50;
	.mce-panel {
    border: 0 solid #f3f3f3;
    border: 0 solid #c5c5c5;
    background-color:transparent !important; 
}
	.m-me {
		background: linear-gradient(0, #9fdbc0, #fff) !important;
		width: 100%;
		max-width: 960px;
		margin: 100px auto;
		padding: 50px 100px;
		
		.m-caption {
			text-align: center;
			font-size: 1.5em;
			margin-bottom: 30px;
		}
		.ivu-form-item-error {
			border: none;
		}
	}
</style>