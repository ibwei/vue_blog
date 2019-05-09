<template>
	<div class="logform">
		<Form ref="formInline" :model="formInline" :rules="ruleInline">
			<FormItem prop="user">
				<Input type="text" v-model="formInline.user" placeholder="请输入用户名" class="form-success"  size="large">
				<Icon type="ios-person-outline" slot="prepend" class="tips"></Icon>
				</Input>
			</FormItem>
			<p></p>
			<FormItem prop="password">
				<Input type="password" v-model="formInline.password" placeholder="请输入密码"  size="large">
				<Icon type="ios-locked-outline" slot="prepend" class="tips"></Icon>
				</Input>
			</FormItem>
			<FormItem class="button-group1">
				<Button type="success" @click.enter="handleSubmit('formInline')">登录</Button>
				<Button  @click="toReg">注册</Button>
			</FormItem>
		</Form>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				formInline: {
					user:'白小唯',
					password: '123'
				},
				ruleInline: {
					user: [{
						required: true,
						message: '用户名不能为空',
						trigger: 'blur'
					}
					],
					password: [{
							required: true,
							message: '你忘记输入密码啦',
							trigger: 'blur'
						}
					]
				}
			}
		},
		methods: {
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {
						this.register()
					} else {
						this.$Message.error('还有些选项不符合规范')
					}
				})
			},
			toReg(){
				this.$emit('on-close1')
			},
			register(){
				this.$Loading.start() 
				this.$http.get('/api/reg.php',{params:{type:'login',user:this.formInline.user,pass:this.formInline.password}}).then((response)=>{
					let res=response.body
					if(res==='0'){
						this.$Message.error('账号密码错误!')
						this.$Loading.error() 
					}else{
//					console.log(res)
					this.$Message.success('登录成功!')
					this.$Loading.finish() 
					this.$emit("on-success",response.body)
					}
					
				},(err)=>{
				    this.$Loading.error() 
					this.$Message.error('未知错误!')
				})
			}
		}
	}
</script>

<style lang="less">
	@color1: #41b883;
	@color2: #2c3e50;
	.logform {
		font-family: "微软雅黑";
		width: 80%;
		max-width: 300px;
		margin: 0px auto !important;
		text-align: center;
	}
	.tips{
		font-size:18px;
		color:#fff;
		
	}
	.ivu-input-group-prepend{
		background: @color1 !important;
		outline: none;
		border-radius: 0;
	}
	.ivu-form-item-error-tip{
		font-size:12px;
		padding: 5px 0 10px 0;
	}
	.button-group1{
		word-spacing:10px;
	}
	.ivu-form-item-error{
		border:none;
	}
	button{
		border-radius: 0 !important;
	}
	input{
		border-radius: 0 !important;
		outline: none !important;
		/*border-color:@color1 !important;*/
	}
	input::focus{
		border-radius: 0 !important;
		outline: none !important;
	}
	
</style>