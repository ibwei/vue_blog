<template>

	<div class="header" v-bind:class="{topBorder:currentPath}">
		<mq-layout mq="md+">
			<div class="nav">
				<a class="logo" href="/">
					<img src="../assets/logo1.png" alt="log1" class="pic" />
					<span class="text">Flipped</span>

				</a>
					<transition name="fade" mode="out-in">
						<div class="me" v-show="initShow">
							<transition name="leftslide">
								<div class="sign" v-show="avatarShow&&!isSign" @click="openLogform">登录</div>
							</transition>
							<div class="avatar">
								<transition name="fade" mode="out-in">
									<icon type="close" v-if="avatarShow&&!isSign" class="close" key="t1" @click.native="change" />
									<icon type="locked" v-if="!avatarShow&&!isSign" @click.native="change" class="question" key="t2" />
								</transition>
								<template v-if="isSign">
									<img :src="user.avatar" key="t3" v-if="user.avatar" class="yourpic" @click="modal1=true" />
								</template>
							</div>
							<transition name="rightslide">
								<div class="reg" v-show="avatarShow&&!isSign" @click="openRegform">注册</div>
							</transition>
						</div>
					</transition>

				<ul class="menu">

					<li v-for="item in menus" class="menu-list">
						<router-link :to="item.url">{{item.name}}</router-link>
					</li>

					<li class="menu-list">
						<router-link to="/write">
							<Icon type="ios-compose-outline" class="write"></Icon>
						</router-link>
					</li>
				</ul>

			</div>
		</mq-layout>
		<my-dialog :isShow="logformShow" @on-close="closeLogform">
			<log-form @on-close1="toReg" @on-success="loginSuccess"></log-form>
		</my-dialog>
		<my-dialog :isShow="regformShow" @on-close="closeRegform">
			<reg-form @on-close="regSuccess"></reg-form>
		</my-dialog>
		<Modal v-model="modal1" width="360">
			<p slot="header" class="mtitle">
				<Icon type="information-circled"></Icon>
				<span>注销提醒</span>
			</p>
			<div class="tcontent">
				<p>退出后，你将不能发表文章，也不能评论。</p>
				<p>你是否仍然坚持退出?</p>
			</div>
			<div slot="footer" class="no-radius">
				<Button type="primary" size="large" long @click="logOut" class="mfooter">退出</Button>
			</div>
		</Modal>

	</div>

</template>

<script>
	import myDialog from '@/components/common/dialog'
	import logForm from '@/components/common/logForm'
	import regForm from '@/components/common/regForm'
	export default {
		components: {
			myDialog,
			logForm,
			regForm
		},
		data() {

			return {
				initShow: false,
				modal1: false,
				user: [{
					username: '',
					avatar: '',
					level: '',
					id: ''
				}],
				regformShow: false,
				logformShow: false,
				isSign: false,
				avatarShow: false,
				menus: [{
						url: '/hello',
						name: '主页'
					},
					{
						url: '/blog',
						name: '社区'
					},
					{
						url: '/me',
						name: '个人中心'
					}, {
						url: '/contact',
						name: '关于'
					}
				]
			}

		},
		created() {
			//console.log(this.$mq)
			this.$http.get('/api/reg.php', {
				params: {
					type: 'autoLogin'
				}
			}).then((response) => {
				let res = response.body
				//				console.log(res)
				if(res === '0') {
					this.user.username = ''
					this.user.avatar = ''
					this.user.level = ''
					this.user.id = ''
					this.isSign = false
					this.avatarShow = false

				} else {
					this.user.username = res[0].username
					this.user.avatar = res[0].avatar
					this.user.level = res[0].level
					this.user.id = res[0].userid
					this.isSign = true
					this.$root.eventHub.$emit('getUser', this.user)
				}
				setTimeout(this.toinitShow, 2000)
			})
		},
		methods: {
			logOut() {
				this.modal1 = false
				this.user.username = ''
				this.user.avatar = ''
				this.user.level = ''
				this.user.id = ''
				this.isSign = false
				this.avatarShow = false
				this.$http.get('/api/reg.php', {
					params: {
						type: 'logOut'
					}
				}).then((response) => {})
				this.$root.eventHub.$emit('getUser', this.user)
				//location.reload()
				this.$router.push('/')
			},

			toReg() {
				this.closeLogform()
				this.openRegform()
			},
			openLogform() {
				this.logformShow = true
			},
			closeLogform() {
				this.logformShow = false
			},
			change() {
				this.avatarShow = !this.avatarShow

			},
			openRegform() {
				this.regformShow = true
			},
			closeRegform() {
				this.regformShow = false
			},
			loginSuccess(value) {
				//				console.log(value)
				this.closeLogform()
				this.user.username = value[0].username
				this.user.avatar = value[0].avatar
				this.user.level = value[0].level
				this.user.id = value[0].userid
				this.isSign = true
				this.$root.eventHub.$emit('getUser', this.user)
				this.$router.push('/')
				//location.reload()
			},
			regSuccess() {
				this.closeRegform()
				let v1 = setTimeout(this.tips(), 500)
				let v2 = setTimeout(this.openLogform(), 700)
			},
			tips() {
				this.$Message.success('马上登录吧')
			},
			toinitShow() {
				this.initShow = true
			}

		},
		computed: {
			currentPath() {
				let currentPath = this.$route.path
				if(currentPath === '/hello' || currentPath === '/') {
					return false
				} else {
					return true
				}
			}

		},
		mounted() {
			this.$emit('add-load')
		}
	}
</script>

<style lang="less" scoped>
	@import url('../assets/css/reset.css');
	@color1: #41b883;
	@color2: #2c3e50;
	.router-link-active {
		color: @color1;
	}
	
	a.active {
		color: @color1;
	}
	
	.write {
		margin-top: -5px;
		font-size: 30px;
		vertical-align: middle;
	}
	
	.write:hover {
		border-bottom: 0px solid red !important;
	}
	
	.mtitle {
		color: #41b883;
		text-align: center;
		font-size: 16px;
		font-family: "microsoft yahei";
	}
	
	.tcontent {
		p {
			text-align: center;
			font-size: 14px;
			font-family: "microsoft yahei";
		}
	}
	
	.mfooter {
		background-color: #41b883;
		text-align: center;
		font-size: 14px;
		font-family: "microsoft yahei";
		border-radius: 0px;
	}
	
	.fade-enter-active {
		transition: all 0.6s ease;
	}
	
	.fade-leave-active {
		transition: all 0s ease-in;
	}
	
	.fade-enter-to,
	.fade-leave {
		font-size: 18px;
	}
	
	.fade-enter,
	.fade-leave-to {
		font-size: 0;
	}
	
	.leftslide-enter-active,
	.leftslide-leave-active {
		transition: all 0.5s ease-in-out;
	}
	
	.leftslide-enter-to,
	.leftslide-leave {
		transform: translateX(-5px) scale(1, 1);
	}
	
	.leftslide-enter,
	.leftslide-leave-to {
		transform: translateX(30px) scale(0, 0);
	}
	
	.rightslide-enter-active,
	.rightslide-leave-active {
		transition: all 0.5s ease-in-out;
	}
	
	.rightslide-enter-to,
	.rightslide-leave {
		transform: translateX(5px) scale(1, 1);
	}
	
	.rightslide-enter,
	.rightslide-leave-to {
		transform: translateX(-30px) scale(0, 0);
	}
	
	.topBorder {
		box-shadow: 0px 1px 1px rgba(205, 205, 205, 0.3);
		background: #fff;
	}
	
	.header{
		padding: 20px 60px 10px 10px;
		box-sizing: border-box;
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		z-index: 99;
		background: #fff;
		height: 74px;
		.nav {
			position: relative;
			/**{border:1px solid red;}*/
			.me {
				text-align: center;
				position: absolute;
				width: 200px;
				box-sizing: border-box;
				height: 100%;
				left: 50%;
				top: 10px;
				margin: 0;
				padding: 0;
				margin-left: -75px;
				.sign,
				.reg {
					display: inline-block;
					vertical-align: top;
					height: 32px;
					border-radius: 4px;
					/*border: 1px solid #D3D3D3;*/
					font-size: 14px;
					padding: 0px 10px;
					line-height: 28px;
					z-index: 2;
					cursor: pointer;
				}
				.sign:hover,
				.reg:hover {
					color: @color1;
				}
				.avatar {
					display: inline-block;
					width: 32px;
					margin: -5px 0px 0 0;
					height: 32px;
					font-size: 14px;
					border-radius: 50%;
					cursor: pointer;
					.yourpic {
						width: 32px;
						height: 32px;
						border: 1px solid #D3D3D3;
						border-radius: 50%;
						cursor: pointer;
					}
				}
				.close,
				.question {
					display: inline-block;
					height: 100%;
					width: 100%;
					line-height: 26px;
					border-radius: 50%;
					font-size: 24px;
					/*border: 1px solid #D3D3D3;*/
				}
				.close {
					font-size: 18px;
				}
			}
			.logo {
				vertical-align: top;
				font-size: 1.5em;
				line-height: 40px;
				height: 40px;
				color: #2c3e50;
				font-family: 'font1', "microsoft yahei";
				font-weight: 700;
				.pic {
					width: 40px;
					height: 40px;
					vertical-align: top;
				}
				.text {
					vertical-align: top;
					cursor: auto;
					font-family: 'font1', "microsoft yahei";
				}
			}
			.menu {
				display: inline-block;
				list-style-type: none;
				padding: 0;
				position: absolute;
				right: 0px;
				top: 0px;
				line-height: 40px;
				.menu-list {
					display: inline-block;
					margin-right: 15px;
					font-family: "microsoft yahei" !important;
					a {
						font-family: "microsoft yahei" !important;
						font-weight: 700;
						text-shadow: 0 0px gainsboro;
						color: @color2;
					}
					a.active {
						color: @color1;
						font-weight: 700;
						font-family: "microsoft yahei" !important;
						/*border-bottom: 2px solid @color1;*/
					}
				}
				.menu-list:hover {
					a {
						font-family: "microsoft yahei" !important;
						color: @color1;
						font-weight: 700;
						/*border-bottom: 2px solid @color1;*/
					}
				}
			}
		}
	}
</style>