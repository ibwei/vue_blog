<template>
	<div class="s-artical">
		<div class="s-spin-wrap" v-show="spinShow">
			<v-spin></v-spin>
		</div>
		<div class="s-container">
			<div class="s-title">{{artical.title}}</div>
			<div class="s-info-wrap">
				<div class="s-avatar"><img :src="artical.avatar" /></div>
				<div class="s-info">
					<div class="s-username">{{artical.username}}</div>
					<div class="s-memo">
						<span class="s-category">分类:{{artical.category}}</span>
						<span class="s-date">{{artical.date}}</span>
						<span class="s-read">阅读  {{artical.readcount}}</span>
						<span class="s-like">喜欢 {{artical.likecount}}</span>
						<span class="s-comment">评论 
							{{artical.commentcount}}
						</span>
					</div>
				</div>
			</div>
			<div class="s-content" v-html="artical.content"></div>
			<div class="s-ilike">
				<div class="title" v-show="!artical.islike">这篇文章真棒,我要点赞<br />
					<Icon type="ios-heart-outline" class="like-icon" @click.native="likeArtical"></Icon>
				</div>
				<div class="title" v-show="artical.islike">你已经赞过这篇文章啦<br />
					<Icon type="ios-heart" class="like-icon"></Icon>
				</div>

			</div>
			<div class="s-control">
				<ButtonGroup>
					<Button type="warning" @click.native="getPreArtical">上一篇</Button>
					<Button type="success" @click.native="goBack">文章列表</Button>
					<Button type="primary" @click.native="getNextArtical">下一篇</Button>
				</ButtonGroup>
			</div>

			<div class="s-comment">
				<h3 class="s-notice">即将进入评论区</h3>
				<div class="edit-wrap">
					<Input v-model="userComment" type="textarea" :rows="4" placeholder="在此输入你要评论的话" class="edit"></Input>
					<div class="button-wrap">
						<Button type="success" :loading="loading" @click.native="toComment" size="default">
       				 	<span v-if="!loading">发表评论</span>
        				<span v-else>发表评论中...</span>
    				</Button>
						<Button type="success" size="default"> 	
        				<span @click="clearComment">重新编辑</span>
    				</Button>
					</div>
				</div>
				<div v-if="commentShow">
					<div class="s-comment-list" v-for="(item,index) in commentList">
						<div class="s-info-wrap">
							<div class="s-avatar"><img :src="item.avatar" /></div>
							<div class="s-info">
								<div class="s-username">{{item.username}}</div>
								<div class="s-memo">
									<span class="s-category">第{{index+1}}楼</span>
									<span class="s-date">{{item.date}}</span>
									<!--<span class="s-read">阅读  {{artical.readcount}}</span>
								<span class="s-like">喜欢 {{artical.likecount}}</span>
								<span class="s-comment">评论 
							{{item.comment}}
						</span>-->
								</div>
							</div>
						</div>
						<div class="s-comment-detail">
							{{item.comment}}
						</div>
						<div class="s-comment-add" @click="replyNotice">
							回复
						</div>
					</div>
					<div class="load-button">
						<Button type="success" :loading="loading2" @click.native="toLoading2">
        					<span v-if="!loading2">加载更多</span>
        					<span v-else>加载中...</span>
    					</Button>
					</div>
				</div>
				<div v-else class="no-comment">
					暂无评论,快来抢沙发吧
				</div>
			</div>
			<BackTop :height="60" :bottom="60" :right="60" class="top1">
				<Icon type="ios-arrow-up" class="top"></Icon>
			</BackTop>
		</div>

	</div>
</template>
<script>
	import Vue from 'vue'
	import vSpin from '@/components/common/spin'
	export default {
		name: 'artical',
		components: {
			vSpin
		},
		props: {
			user: {
				type: Array
			}
		},
		data() {
			return {
				articalid: '',
				artical: {
					length1: 0
				},
				order_id: '',
				spinShow: true,
				userComment: '',
				loading: false,
				limit: 10,
				limitCount: 0,
				commentList: '',
				commentShow: false,
				loading2: false
			}
		},
		created() {
			//this.start()
		},
		watch: {
			limit() {
				this.$Loading.start()
				this.getCommentList()
			},
			//检测文章号是否改变了，改变则重新获取数据
			order_id() {
				this.start()
				window.scrollTo(0, 0);
			}
		},
		methods: {
			toLoading2() {
				if(this.limit > this.limitCount) {
					this.$Message.success("已经加载完所有评论!")
					return false
				}else{
					this.addLimit()
				}
				
			},
			addLimit(){
				this.loading2 = true
				this.limit += 10
			},
			replyNotice() {
				this.$Message.error('多人评论以及插楼回复尚在调试中！')
			},
			getCommentList() {
				this.$http.post('/api/alltype.php', {
					type: 'getCommentList',
					articalId: this.articalid,
					limit: this.limit
				}, {
					emulateJSON: true
				}).then((res) => {
					//console.log(res)
					if(res.body !== '0') {
						this.commentList = res.body
						this.commentShow = true
						this.loading2 = false
						this.$Loading.finish()
						
					} else if(res.body === '0') {
						this.commentShow = false
						//this.$Message.error('评论获取失败！')
						this.$Loading.finish()

					}
				})
			},
			clearComment() {
				this.userComment = ' '
			},
			goBack() {
				this.$router.push('/blog')
			},
			//保存评论内容，并且更新评论
			toComment() {
				if(!this.user.username) {
					this.$Message.error("需要登录才可以继续操作!")
					this.$emit('no-sign')
					return false
				}
				if(this.userComment.length < 2) {
					this.$Message.error("评论内容太短了")
					return false
				} else if(this.userComment.length > 400) {
					this.$Message.error("评论内容太多了")
					return false
				}
				this.$Loading.start()
				this.loading = true
				//console.log('articalid')
				//console.log(this.artical.articalid)
				this.$http.post('/api/alltype.php', {
					type: 'saveComment',
					userId: this.user.id,
					articalId: this.articalid,
					userComment: this.userComment,
					limit: this.limit
				}, {
					emulateJSON: true
				}).then((res) => {
					if(res) {
						this.getCommentList()
						this.$Message.success('评论发表成功！')
						this.addComment()
						this.$Loading.finish()
						this.loading = false
						this.userComment = ''
					} else if(res === '0') {
						this.$Message.error('评论发表失败！')
						this.loading = false
						this.$Loading.error()
						this.userComment = ''
					}
				})

			},
			//上一篇
			getPreArtical() {

				if(this.artical.length1 === 0) {
					this.$http.post('/api/artical.php', {
						type: 'getArticalCount'
					}, {
						emulateJSON: true
					}).then((res) => {
						if(res.body) {
							//console.log(res.body)
							this.artical.length1 = res.body
							//console.log(this.artical.length1)
						} else {
							console.log('获取文章列表长度失败')
						}
					})
				}
				if(this.order_id < this.artical.lenth1 === 0) {
					this.toTop()
					this.order_id = this.$route.params.id + 1
					this.$router.push('/artical/' + this.order_id)
				} else {
					this.$Message.error('已经是第一篇,不能再向前')
				}
			},

			//下一篇
			getNextArtical() {

				if(this.order_id > 1) {
					this.toTop()
					this.order_id = this.$route.params.id - 1
					this.$router.push('/artical/' + this.order_id)
				} else {
					this.$Message.error('已经是最后一篇,不能再向前')
				}

			},

			//点赞功能
			likeArtical() {

				if(!this.user.username) {
					this.$Message.error('需要登录才可以继续操作!')
					this.$emit('no-sign')
					return false
				}
				this.$Loading.start()

				//console.log(this.artical.articalid)
				//console.log(this.user.id)
				this.$http.post('/api/artical.php', {
					type: 'likeArtical',
					userid: this.user.id,
					articalid: this.artical.articalid,
					isLike: 1,
					likecount: Number(this.artical.likecount) + 1
				}, {
					emulateJSON: true
				}).then((res) => {
					//console.log(res.body)
					if(res.body === '1') {
						Vue.set(this.artical, 'islike', true)
						this.$Loading.finish()
						this.$Message.success('点赞成功!')
					} else {
						this.$Message.error('点赞失败!')
						this.$Loading.error()
					}
				})

			},

			toTop() {
				window.scrollTo(0, 0)
			},
			start() {

				//每次启动时去获得文章
				this.spinShow = true
				this.articalid = this.$route.params.id
				this.$http.post('/api/alltype.php', {
					type: 'getlimit',
					name: 'comment',
					articalId: this.articalid
				}, {
					emulateJSON: true
				}).then((res) => {
					//console.log(res.body)
					if(res.body !== 0) {
						this.limitCount = res.body[0].totalnum
						//console.log(this.limitCount)
						this.commentShow = true
					} else {
						this.commentShow = false
					}
				})

				//得到文章内容
				this.$http.post('/api/artical.php', {
					articalId: this.articalid,
					type: 'getArticalPage'
				}, {
					emulateJSON: true
				}).then((res) => {
					if(res.body) {
						this.$nextTick(() => {
							this.$set(this.artical, "title", res.body[0].title)
							this.$set(this.artical, "articalid", res.body[0].articalid)
							this.$set(this.artical, "avatar", res.body[0].avatar)
							this.$set(this.artical, "username", res.body[0].username)
							this.$set(this.artical, "date", res.body[0].date)
							this.$set(this.artical, "likecount", res.body[0].likecount)
							this.$set(this.artical, "readcount", res.body[0].readcount)
							this.$set(this.artical, "commentcount", res.body[0].commentcount)
							this.$set(this.artical, "content", res.body[0].content)
							this.$set(this.artical, "category", res.body[0].category)
							this.$set(this.artical, "islike", false)

							if(this.user.id !== '') {
								this.$http.post('/api/artical.php', {
									articalId: this.artical.articalid,
									userId: this.user.id,
									type: 'getUserLike'
								}, {
									emulateJSON: true
								}).then((res) => {
									if(res.body === '1') {
										Vue.set(this.artical, 'islike', true)
									}
								})
							}
						})
						this.spinShow = false
						this.getCommentList()
					} else {
						this.$Message('读取文章失败!')
						this.spinShow = false
						this.$router.go(-1)
					}
				})
			},
			addRead() {
				this.$http.post('/api/artical.php', {
					type: 'addRead',
					articalId: this.order_id
				}, {
					emulateJSON: true
				}).then((res) => {
					if(!res.body) {
						console.log("更新阅读总数失败")
					}
				})
			},
			addComment() {
				this.$http.post('/api/artical.php', {
					type: 'addComment',
					articalId: this.order_id
				}, {
					emulateJSON: true
				}).then((res) => {
					if(!res.body) {
						console.log("更新评论总数失败")
					}
				})
			}
		},
		activated() {
			this.order_id = this.$route.params.id
			this.addRead()

		}
	}
</script>

<style lang="less">
	@color1: #41b883;
	@color2: #2c3e50;
	.load-button {
		text-align: center;
		margin-bottom: 20px;
	}
	
	.no-comment {
		text-align: center;
		font-weight: bold;
	}
	
	.edit-wrap {
		margin: 60px 0px;
		text-align: center;
		.edit {
			border-radius: 0;
			width: 100%;
			margin-bottom: 20px;
		}
		button {
			border-radius: 0;
		}
		button+button {
			margin-left: 10px;
		}
	}
	
	.s-comment {
		margin: 40px 0;
		font-family: "microsoft yahei";
		font-size: 12px;
		.s-notice {
			text-align: center;
			font-weight: bold;
			font-size: 26px;
			padding-bottom: 40px;
			border-bottom: 1px solid rgba(0, 0, 0, 0.3);
		}
		.s-comment-list {
			position: relative;
			.s-comment-detail {
				background: rgba(123, 255, 23, 0.1);
				height: 100%;
				max-height: 300px;
				font-size: 14px;
				line-height: 3em;
				padding: 20px;
			}
			.s-comment-add {
				position: relative;
				font-size: 14px;
				color: @color1;
				text-align: right;
				padding-right: 20px;
				top: -30px;
				cursor: pointer;
			}
		}
	}
	
	.top1 {
		border: 1px solid @color1;
		.top {
			color: @color1;
			background: #fff;
			text-align: center;
		}
	}
	
	.s-artical {
		.s-spin-wrap {
			position: relative;
			width: 100%;
			top: 0;
			left: 0;
			height: 800px;
		}
		margin-top: 100px;
		position: relative;
		width: 100%;
		height: auto;
		min-height: 100%;
		font-family: "microsoft yahei";
		.s-container {
			width: 90%;
			margin-left: 5%;
			max-width: 650px;
			margin: 50px auto;
			.s-control {
				text-align: center;
				button+button {
					margin-left: 10px;
				}
				button {
					border-radius: 0px;
				}
			}
			.s-ilike {
				/*border:1px solid red;*/
				margin: 40px 0px;
				padding: 60px 0px;
				line-height: 60px;
				text-align: center;
				font-size: 16px;
				font-weight: bold;
				border-bottom: 1px solid rgba(0, 0, 0, 0.3);
				.title {
					.like-icon {
						font-size: 30px;
						cursor: pointer;
						color: red;
					}
					.like-icon:hover {
						transform: scale(1.2, 1.2);
						transition: all 0.5s linear;
					}
				}
			}
			.s-title {
				word-break: break-word!important;
				word-break: break-all;
				margin: 20px 0 30px 0;
				font-size: 34px;
				font-weight: 700;
				line-height: 1.3;
			}
			.s-info-wrap {
				margin: 10px 0 10px 0;
				.s-avatar {
					width: 48px;
					height: 48px;
					vertical-align: middle;
					display: inline-block;
					cursor: pointer;
				}
				.s-avatar img {
					width: 100%;
					height: 100%;
					border: 1px solid #ddd;
					border-radius: 50%;
				}
				.s-info {
					vertical-align: middle;
					display: inline-block;
					margin-left: 8px;
					width: auto;
					height: 48px;
					.s-memo {
						.s-category {
							color: @color1;
							font-weight: 400;
						}
						font-size: 12px;
						span {
							margin-right: 5px;
						}
					}
					.s-username {
						font-family: "microsoft yahei";
						margin-right: 3px;
						font-size: 16px;
						font-weight: 600;
						vertical-align: bottom;
					}
				}
			}
			.s-content {
				padding-top: 30px;
				width: 100%;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: pre-wrap;
				word-wrap: break-word;
				hr {
					display: none;
				}
				a {
					color: @color1;
				}
				a:hover {
					color: @color2;
				}
				.image-container-fill {
					display: none;
				}
				.image-package {
					width: 100%;
					height: 100%;
					img {
						height: auto;
						width: 100%;
						max-width: 650px;
					}
				}
				.image-caption {
					display: none;
				}
				p {
					font-size: 14px;
					margin: 10px 0px;
					text-align: left;
				}
				h4,
				h5,
				h3,
				h2 {
					color: #000;
					text-align: left;
					margin: 10px 0;
				}
				h4 {
					font-size: 14px;
				}
				h3 {
					font-size: 16px;
					font-weight: bold;
				}
				h2 {
					font-size: 18px;
					font-weight: bold;
				}
			}
		}
	}
</style>