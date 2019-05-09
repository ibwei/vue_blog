<template>
	<div class="me-info">
		<div class="main" v-if="user.username">
			<div class="main-top">
				<a class="avatar" href="/u/dbaed83b4b3d">
					<img :src="user.avatar" alt="avatar">
				</a>

				<div class="title">
					<a class="name" href="javascript:void(0)">{{user.username}}</a>
				</div>
				<div class="info">
					<ul>
						<li>
							<div class="meta-block">
								<a href="javascript:void(0)">
									<p>{{writeCount}}</p>
									文章<i class="iconfont ic-arrow"></i>
								</a>
							</div>
						</li>
						<li>
							<div class="meta-block">
								<a href="javascript:void(0)">
									<p>{{likeCount}}</p>
									喜欢 <i class="iconfont ic-arrow"></i>
								</a>
							</div>
						</li>
						<li>
							<div class="meta-block">
								<a href="javascript:void(0)">
									<p>0</p>
									关注<i class="iconfont ic-arrow"></i>
								</a>
							</div>
						</li>
					</ul>
				</div>
			</div>

			<div id="outer-container">

				<Tabs class="tab">

					<TabPane label="文章" icon="document-text" success class="tab-list">
						<div id="list-container">
							<!-- 文章列表模块 -->
							<ul class="artical-list" v-if="writeCount>0">
								<div class="spin-wrap" v-show="spinShow">
									<v-spin></v-spin>
								</div>
								<li v-for="(item,index) in articals" class="artical-item">
									<div class="l-title">
										<router-link class="top" :to="'/artical/'+item.articalid">
											<Tag :style="{background:colorList[index]}" class="tag">NO.{{index+1}}</Tag><span>{{item.title}}</span>
										</router-link>
									</div>
									<div class="l-memo">
										<span class="l-date">{{item.date}}</span>
										<span class="l-extr">{{item.readcount}}/{{item.commentcount}}/{{item.likecount}}</span>
									</div>

								</li>
								<div class="load-button">
									<Button type="success" :loading="loading2" @click.native="toLoading2">
        								<span v-if="!loading2">加载更多</span>
        								<span v-else>加载中...</span>
    								</Button>
								</div>
							</ul>

							<div v-else class="no-artical">
								笔墨宝贵，你从不轻易发表文章<br />
								<Button type="success" @click="goWrite">去发表</Button>
							</div>
						</div>
					</TabPane>
					<TabPane label="喜欢" icon="ios-heart" class="tab-list" @click.native="getLikeList">
						<ul>
							<ul class="artical-list" v-if="likeCount>0">
								<div class="spin-wrap" v-show="spinShow1">
									<v-spin></v-spin>
								</div>
								<li v-for="(item,index) in likes" class="artical-item">
									<div class="l-title">
										<router-link class="top" :to="'/artical/'+item.articalid">
											<Tag :style="{background:colorList[index]}" class="tag">NO.{{index+1}}</Tag><span>{{item.title}}</span>
										</router-link>
									</div>
									<div class="l-memo">
										<span class="l-date">{{item.date}}</span>
										<span class="l-extr">{{item.readcount}}/{{item.commentcount}}/{{item.likecount}}</span>
									</div>

								</li>
								<div class="load-button">
									<Button type="success" :loading="loading" @click.native="toLoading">
        								<span v-if="!loading">加载更多</span>
        								<span v-else>加载中...</span>
    								</Button>
								</div>
							</ul>

							<div v-else class="no-artical">
								你在高处，所到之处，没有一篇文章值得喜欢<br />
								<Button type="success" @click="goWrite1">去看看</Button>
							</div>
						</ul>
					</TabPane>
					<TabPane label="最新评论" icon="ios-chatboxes" class="tab-list">
						<div class="no-artical">
							该功能暂未开放
						</div>
					</TabPane>

				</Tabs>

			</div>
		</div>
		<div v-else>
			<div class="no-artical">
				你还没有登录<br />
				<Button type="success" @click="signIn">去登录</Button>
			</div>
		</div>
	</div>
</template>

<script>
	import vSpin from '@/components/common/spin'
	export default {
		props: {
			user: {
				type: Array
			}
		},
		components: {
			vSpin
		},
		data() {
			return {
				spinShow: true,
				spinShow1: true,
				likes: '',
				articals: '',
				username: '',
				writeCount: 0,
				likeCount: 0,
				limit: 10,
				limit1: 10,
				loading: false,
				loading2: false,
				colorList: ['#ed3f14', '#ff9900', '#19be6b', '#2d8cf0', '#1c2438', '#495060', '#80848f', '#bbbec4']

			}

		},
		created() {
			//console.log(this.user)
			if(this.user.username) {
				this.getWriteNum()
				this.getLikeNum()
			}
		},
		methods: {
			getWriteNum() {
				this.$http.post('/api/artical.php', {
					type: 'getWriteLimit',
					userId: this.user.id
				}, {
					emulateJSON: true
				}).then((res) => {
					if(res.body) {
						this.writeCount = res.body[0].totalnum
						if(this.writeCount > 0) {
							this.getWriteList()
						}
						//console.log(this.writeCount)
					}
				})
			},
			getLikeNum() {
				this.$http.post('/api/artical.php', {
					type: 'getLikeLimit',
					userId: this.user.id
				}, {
					emulateJSON: true
				}).then((res) => {
					if(res.body) {
						this.likeCount = res.body[0].totalnum
						if(this.likeCount > 0) {
							this.getLikeList()
						}
						//console.log(this.likeCount)
					}
				})
			},
			getWriteList() {
				this.$http.post('/api/artical.php', {
					type: 'getWriteList',
					limit: this.limit,
					userId: this.user.id
				}, {
					emulateJSON: true
				}).then((res) => {
					this.articals = res.body
					//console.log(this.articals)
					this.$Loading.finish()
					this.spinShow = false
					this.loading2 = false
				})

			},
			getLikeList() {
				this.$http.post('/api/artical.php', {
					type: 'getLikeList',
					limit: this.limit1,
					userId: this.user.id
				}, {
					emulateJSON: true
				}).then((res) => {
					this.likes = res.body
					//console.log(this.articals)
					this.$Loading.finish()
					this.spinShow1 = false
					this.loading = false
				})

			},
			goWrite() {
				this.$router.push('/write')
			},
			goWrite1() {
				this.$router.push('/blog')
			},
			signIn() {
				this.$emit('no-sign')

			},
			toLoading2() {
				if(this.limit > this.writeCount) {
					this.$Message.error("已经加载完所有发表文章!")
					return false;

				} else {
					this.addLimit()
				}
			},
			addLimit() {
				this.loading2 = true
				this.limit += 10
			},
			toLoading() {
				if(this.limit1 > this.likeCount) {
					this.$Message.error("已经加载完所有喜欢的文章!")
					return false;

				} else {
					this.addLimit1()
				}
			},
			addLimit1() {
				this.loading = true
				this.limit1 += 10
			}

		},
		watch: {
			limit() {
				this.$Loading.start()
				this.getWriteList()
			},
			limit1() {
				this.$Loading.start()
				this.getLikeList()
			},
			user() {
				if(this.user.id) {
					this.getWriteNum()
					this.getLikeNum()
				}
			}
			//检测文章号是否改变了，改变则重新获取数据
		},
		activated() {
			if(this.user.id) {
				this.getWriteNum()
				this.getLikeNum()
			} else {

			}

		}

	}
</script>

<style lang="less" scoped>
	@color1: #41b883;
	@color2: #2c3e50;
	@font-face {
		font-family: 'font1';
		src: url('../assets/fonts/font1.otf');
		src: url('../assets/fonts/font1.ttf') format('truetype');
		font-style: normal;
		font-weight: normal;
	}
	
	.spin-wrap {
		position: relative;
		width: 100%;
		text-align: center;
	}
	
	.load-button {
		text-align: center;
		margin-top: 20px;
	}
	
	.tab-list {
		font-size: 12px !important;
	}
	
	a {
		color: #000;
	}
	
	a:hover {
		color: @color1 !important;
	}
	
	button {
		border-radius: 0px;
	}
	
	.tag {
		color: #fff;
		font-weight: lighter;
		font-size: 12px;
		padding: 5px 6px;
		line-height: 12px;
		font-family: 'font1';
		background: #dddddd;
	}
	
	.artical-list {
		width: 100%;
		position: relative;
		.artical-item {
			width: 100%;
			font-family: "Microsoft YaHei" !important;
			padding: 10px 0 10px 0;
			border-bottom: 1px solid #eeeeee;
			.l-title {
				float: left;
				padding-left: 0px;
				font-size: 14px;
			}
			.l-title:hover {
				cursor: pointer;
				color: @color1;
			}
			.l-memo {
				font-size: 12px;
				text-align: right;
				.l-date {
					padding-right: 10px;
					text-align: right;
				}
				.l-extr {
					display: inline-block;
					width: 40px;
				}
			}
		}
	}
	
	.main {
		width: 100%;
		max-width: 760px;
		position: relative;
		margin: 120px auto;
		margin-bottom: 20px;
		#outer-container {
			clear: both;
			margin-top: 60px;
		}
		.avatar {
			float: left;
			width: 80px;
			height: 80px;
			margin-left: -2px;
			display: block;
			cursor: pointer;
			img {
				width: 100%;
				height: 100%;
				border: 1px solid #ddd;
				border-radius: 50%;
			}
		}
		.title {
			padding: 5px 0 0 100px;
			.name {
				display: inline;
				font-size: 21px;
				font-weight: 700;
				vertical-align: middle;
			}
		}
		.info {
			margin-top: 5px;
			padding-left: 100px;
			font-size: 14px;
			ul {
				font-size: 0;
				li {
					float: left;
					line-height: 20px;
					.meta-block {
						font-size: 12px;
						margin: 0 7px 6px 0;
						padding: 0 7px 0 0;
						border-right: 1px solid #f0f0f0;
						a {
							color: #969696 !important;
							p {
								margin-bottom: -3px;
								font-size: 15px;
								text-align: center;
							}
						}
					}
				}
			}
		}
	}
	
	.no-artical {
		font-family: "microsoft yahei";
		text-align: center;
		height: 300px;
		font-weight: 500;
		padding-top: 100px;
		font-size: 16px;
		line-height: 60px;
	}
</style>