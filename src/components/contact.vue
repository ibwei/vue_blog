<template>
	<div class="contact">
		<div class="introduce">
			<Icon type="social-github-outline" class="myicon"></Icon>
			<h1>Hey,there</h1>
			<p>我是白唯,也叫白小唯</p>
			<p>重庆师范大学大二在读学生</p>
			<p>一个追逐Web方向靠前领域的人</p>
			<p>一个渴望呈现出更简洁、更友好的界面的人</p>
			<p>也是一个不太聪明的、有些偏执的、在黑暗中漫步的人</p>
			<br />
			<p class="title">
				我的技术栈
			</p>
			<div class="jsz">
				<Steps :current="3" status="process" direction="horizontal">
					<Step title="html+css+js" content="前端三要素"></Step>
					<Step title="bootstrap+jquery" content="前端框架和类库"></Step>
					<Step title="php+mysql" content="web后台基础"></Step>
					<Step title="vue+webpack" content="最新MVVM框架构建页面"></Step>
					<Step title="lavaral+node.js" content="php框架和node.js"></Step>
				</Steps>
			</div>
		</div>
		<div class="card-container">
			<p class="title">更多关于我</p>
			<Row :gutter="16">
				<Col span="8">
				<Card class="card-style">
					<div class="img-wrap">
						<img src="../assets/logo.png" />
					</div>
					<ul class="list">
						<li>
							<span>更多关于我:</span>
							<a href="http://www.me.ibwei.com" target="_blank">www.me.ibwei.com</a>
						</li>
						<li>
							<span>第一次作品:</span>
							<a href="http://www.first.ibwei.com" target="_blank">www.first.ibwei.com</a>
						</li>
						<li>
							<span>有情链接:</span>
							<a href="http://blog.baizdu.com" target="_blank">blog.baizdu.com</a>
						</li>
					</ul>
				</Card>

				</Col>
				<Col span="8">
				<Card class="card-style">

					<div class="img-wrap">
						<img src="../assets/img/weixin.png" />
					</div>
					<ul class="list">
						<li>
							<span>Github:</span>
							<a href="https://github.com/ibwei" target="_blank">https://github.com/ibwei</a>
						</li>
						<li>
							<span>新浪微博:</span>
							<a href="https://weibo.com/u/2878406514?is_hot=1" target="_blank">https://weibo.com/me</a>
						</li>
						<li>
							<span>Twitter:</span>
							<a href="https://twitter.com/ibweiweb" target="_blank">https://twitter.com/</a>
						</li>
					</ul>

				</Card>
				</Col>
				<Col span="8">
				<Card class="card-style">
					<div class="img-wrap">
						<img src="../assets/img/share.png" />
					</div>
					<ul class="list">
						<li>
							<span>菜鸟教程:</span>
							<a href="http://www.runoob.com/" target="_blank">http://www.runoob.com/</a>
						</li>
						<li>
							<span>awesome-vue:</span>
							<a href="https://github.com/vuejs/awesome-vue" target="_blank">https://github.com/vue</a>
						</li>
						<li>
							<span>segmentfault:</span>
							<a href="https://segmentfault.com/" target="_blank">https://segmentfault.com/</a>
						</li>
					</ul>
				</Card>
				</Col>
			</Row>
		</div>
		<div class="message-board">
			<p class="title">
				给我留小纸条
			</p>
			<div class="edit-wrap">
				<Input v-model="cardtext" type="textarea" :rows="4" placeholder="输入你想说的话" class="edit"></Input>
				<div class="button-wrap">
					<Button type="success" :loading="loading" @click="toLoading" size="default">
       				 <span v-if="!loading">确认</span>
        			<span v-else>发送中...</span>
    			</Button>
					<Button type="ghost" @click="resetCardtext" size="large">重置</Button>
				</div>
			</div>
			<transition name="fade">
				<div class="card-wall" v-if="card.length">
					<Steps :current="2" direction="vertical" class="card-wrap">
						<Step v-for="(item,index) in card" :key="index">
							<span class="title">{{item.username}}：</span>
							<span class="text">{{item.cardtext}}</span>
							<span class="date">{{item.date}}</span>
						</Step>
					</Steps>
					<div class="load-button">
						<Button type="success" :loading="loading2" @click.native="toLoading2">
        					<span v-if="!loading2">加载更多</span>
        					<span v-else>加载中...</span>
    					</Button>
					</div>
				</div>
			</transition>
		</div>

	</div>
</template>

<script>
	export default {
		props: {
			user: {
				type: Array
			}
		},
		data() {
			return {
				cardtext: '',
				loading: false,
				loading2: false,
				card: '',
				limit: 10,
				limitCount: 0

			}
		},
		created() {
			this.getCardList()
			this.$http.post('/api/alltype.php', {
					type: 'getlimit',
					name:'card'
				}, {
					emulateJSON: true
				}).then((res) => {
					if(res) {
						this.limitCount=res.body[0].totalnum
//						console.log(this.limitCount)
					}
				})
		},
		watch:{
			limit(){
				this.getCardList()
			}
		},
		methods: {
			toLoading2(){
				 if(this.limit>this.limitCount){
				 	this.$Message.error("已经加载完所有纸条!")	
				 	return false
				 }else{
				 	this.addLimit()
				 }
			},
			addLimit(){
				 this.loading2 = true
				 this.limit+=10
			},
			toLoading() {

				if(!this.user.username) {
					this.$Message.error("需要登录才可以继续操作!")
					this.$emit('no-sign')
					return false
				}
				if(this.cardtext.length < 6) {
					this.$Message.error("纸条内容太短了")
					return false
				} else if(this.cardtext.length > 30) {
					this.$Message.error("纸条内容太多了")
					return false
				}
//				console.log(this.user.username)

				this.loading = true
				this.$http.post('/api/alltype.php', {
					type: 'saveCardtext',
					cardtext: this.cardtext,
					username: this.user.username
				}, {
					emulateJSON: true
				}).then((res) => {
					if(res) {
						this.getCardList()
						this.$Message.success('纸条已贴在墙上')
						this.loading = false
						this.cardtext = ''
					} else if(res === '0') {
						this.$Message.error('纸条发送失败')
						this.loading = false
						this.cardtext = ''
					}
				})
			},
			getCardList() {
//				console.log(this.limit)
				this.$http.post('/api/alltype.php', {
					type: 'getCardlist',
					limit: this.limit
				}, {
					emulateJSON: true
				}).then((res) => {
					if(res) {
//						console.log(res)
						this.card = res.body
						 this.loading2 = false
					} else {
						this.$Message.error('纸条发送失败')
					}
				})
			},
			resetCardtext() {
				this.cardtext = ''
			}

		}
	}
</script>

<style lang="less" scoped>
	@color1: #41b883;
	.card-color {
		color: #000;
	}
	
	.fade-enter-active {
		transition: all 1s ease;
	}
	
	.fade-leave-active {
		transition: all 1s ease-in;
	}
	
	.fade-enter-to,
	.fade-leave {
		opacity: 1;
	}
	
	.fade-enter,
	.fade-leave-to {
		opacity: 0;
	}
	
	.leftslide-enter-active,
	.leftslide-leave-active {
		transition: all 1s ease-in-out;
	}
	
	.contact {
		position: relative;
		margin: 0 auto;
		width: 100%;
		max-width: 960px;
		.introduce {
			margin-top: 100px;
			text-align: center !important;
			.myicon {
				font-size: 30px;
				text-align: center !important;
			}
			h1 {
				font-size: 20px;
				font-weight: bold;
			}
			p.title {
				font-weight: bold;
				text-align: center !important;
			}
			p {
				text-align: center !important;
				font-size: 16px;
				font-weight: 500;
				line-height: 1.5em;
			}
			.jsz {
				margin-top: 20px;
				text-align: center;
			}
		}
		.card-container {
			p.title {
				margin: 30px 10px;
				text-align: center;
				font-weight: bold;
			}
			.card-style {
				position: relative;
				.img-wrap {
					text-align: center;
					img {
						position: relative;
						width: 120px;
						height: 120px;
					}
				}
				.list {
					margin-left: 10%;
					font-size: 0px;
					span,
					a{
						font-size: 14px;
						color:#000 !important;
					}
					span {
						font-weight: bold;
					}
				}
			}
			
		}
		.message-board {
			position: relative;
			margin: 40px 10px;
			p.title {
				text-align: center;
				font-weight: bold;
			}
			.edit-wrap {
				margin: 20px 0px;
				text-align: center;
				.edit {
					width: 100%;
					max-width: 400px;
					margin-bottom: 20px;
				}
			}
			.card-wall {
				overflow: hidden;
				border: 1px solid #c3c3c3;
				width: 100%;
				margin-bottom: 20px;
				.card-wrap {
					font-family: "microsoft yahei";
					margin: 30px;
					.title {
						font-weight: bold;
						font-size: 14px;
					}
					.text {
						font-size: 14px;
					}
					.date {
						font-size: 12px;
						color: #ccc;
						padding-left: 10px;
						display: inline-block;
					}
				}
			}
			.load-button{
				text-align: center;
				margin-bottom: 20px;
			}
		}
	}
</style>