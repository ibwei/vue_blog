<template>
	<div class="regform">
		<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="70">
			<FormItem label="用户名" prop="name">
				<Input v-model="formValidate.name" placeholder="你想叫什么名字" name="user"></Input>
			</FormItem>
			<FormItem label="密码" prop="password">
				<Input v-model="formValidate.password" placeholder="请输入你的密码" type="password" name="pass"></Input>
			</FormItem>
			<FormItem label="E-mail" prop="mail">
				<Input v-model="formValidate.mail" placeholder="请输入你的邮箱" name="email"></Input>
			</FormItem>
			<FormItem label="头像" prop="avatar">
				<upload-img name="avatar" @successLoad="avatarSrc"></upload-img>
			</FormItem>
			<FormItem label="一句话" prop="desc">
				<Input v-model="formValidate.desc" type="textarea" :autosize="{maxRows: 5,minRows:3,minCols:4}" placeholder="请用一句话来介绍你自己" name="descrition"></Input>
			</FormItem>
			<FormItem>
				<Button type="primary" @click="handleSubmit('formValidate')">注册</Button>
				<Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
			</FormItem>
		</Form>
	</div>
</template>
<script>
	import uploadImg from '@/components/common/uploadImg'
	export default {
		components: {
			uploadImg
		},

		data() {
			return {
				status: '',
				formValidate: {
					password: '',
					name: '',
					mail: '',
					city: '',
					gender: '',
					interest: [],
					date: '',
					time: '',
					desc: '',
					avatar: ''
				},
				ruleValidate: {
					name: [{
						required: true,
						message: '名字是不可少的',
						trigger: 'blur'
					}],
					mail: [{
						type: 'email',
						message: '邮箱格式不正确',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}, {
						type: 'string',
						min: 6,
						message: '密码长度至少为6位',
						trigger: 'blur'
					}],
					desc: [{
							required: true,
							message: '请用一句话介绍一下你自己',
							trigger: 'blur'
						},
						{
							type: 'string',
							min: 3,
							message: '一句话介绍不能少于3个字噢',
							trigger: 'blur'
						}
					]
				}
			}
		},
		created() {

		},
		methods: {
			avatarSrc(src){
				this.formValidate.avatar='/blog/image/blogavatar/'+src
			},
			checkUser() {
				this.$Loading.start() //首先检查用户名,如果没有重名,再去注册
				this.$http.get('/api/reg.php', {
					params: {
						type: 'checkuser',
						user: this.formValidate.name
					}
				}).then((response) => {
					let res = response.body
					if(res === 'no') {
						this.$Message.error('该用户名已被注册!')
						this.formValidate.name = ''
						this.$Loading.error()
					} else {
						this.$http.get('/api/reg.php', { //发送注册请求
							params: {
								type: 'reg',
								user: this.formValidate.name,
								pass: this.formValidate.password,
								email: this.formValidate.mail,
								description: this.formValidate.desc,
								avatar:this.formValidate.avatar
							}
						}).then((response) => {
							let res = response.body
															console.log(res)
							if(res === 'ok') {
								this.$Loading.finish()
								this.$Message.success('注册成功!')
								setTimeout(this.success(), 1000)

							} else {
								this.$Loading.error()
								this.$Message.error('服务器异常,注册失败')
							}

						})
					}
				})

			},
			handleSubmit(name) { //首先验证表单规则,通过再去调用检查用户名
				this.$refs[name].validate((valid) => {
					if(valid) {
						this.checkUser()
					} else {
						this.$Message.error('还有些选项不符合规范');
					}
				})
			},
			handleReset(name) {
				this.$refs[name].resetFields();
			},
			success() {
				this.$emit('on-close')
			}
		}
	}
</script>
<style lang="less">
	@color1: #41b883;
	@color2: #2c3e50;
	.regform {
		font-family: "微软雅黑";
		width: 80%;
		max-width: 300px;
		margin: 0px auto !important;
		text-align: center;
		height: auto;
	}
	
	.sex {
		text-align: left !important;
		position: relative;
		left: -60px;
		top: -3px;
	}
	
	.tips {
		font-size: 18px;
		color: #fff;
	}
	
	.ivu-input-group-prepend {
		background: @color1 !important;
		outline: none;
		border-radius: 0;
	}
	
	.ivu-form-item-error-tip {
		font-size: 12px;
		padding: 5px 0 10px 0;
	}
	
	.button-group1 {
		word-spacing: 20px;
	}
	
	.ivu-form-item-error {
		border: none;
	}
	
	button {
		border-radius: 0 !important;
	}
	
	input {
		border-radius: 0 !important;
		outline: none !important;
		/*border-color:@color1 !important;*/
	}
	
	input::focus {
		border-radius: 0 !important;
		outline: none !important;
	}
</style>