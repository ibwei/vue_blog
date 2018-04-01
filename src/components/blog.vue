<template>
	<div class="blog">
		<div class="carousel-wrap">
			<carousel-3d autoplay :autoplayTimeout="4000" :animationSpeed="1000" :width="320" :height="190" :perspective="20">
				<slide v-for="(pic,index) in sliders" :index="index" :key="index" class="carousel">
					<img :src="pic.url" />
				</slide>
			</carousel-3d>
		</div>

		<div class="content-wrap">
			<div class="b-content">

				<ul class="artical-list">
					<div class="spinwrap">
						<v-spin v-show="spinShow"></v-spin>
					</div>
					<div class="artical-type">
						<span class="item" v-for="(item,index) in categoryList" :key="index" :class="{activecategory:activeArray[index]}" @click="categorySearch(index)">{{item}}</span>
					</div>
					<li class="artical" v-for="(item,index) in articals" name="item.articalId" :key="index">
						<div class="ar-content">
							<div class="ar-header">
								<img class="avatar" :src="item.avatar" alt="item.avatar" />
								<span class="author">{{item.username}}</span>
								<span class="time">{{item.date
								}}</span>
							</div>
							<div class="ar-body">
								<router-link class="title" :to="'/artical/'+item.articalid">{{item.title}}</router-link>
								<div class="preview">
									<div class="text">{{item.precontent}}</div>
								</div>
							</div>
							<div class="ar-footer">
								<span class="category">
									{{item.category}}</span>
								<div class="totalview">
									<span class="icon-eye"></span>
									<span class="num">{{item.readcount}}</span>
								</div>
								<div class="totalComments">
									<span class="icon-bubbles4"></span>
									<span class="num">{{item.commentcount}}</span>
								</div>
								<div class="likes">
									<span class="icon-favorite" :class="{active:item.isLike}"></span>
									<span class="num">{{item.likecount}}</span>
								</div>
							</div>
						</div>
						<div class="pic"><img :src="item.prepicture" class="prepicture" /></div>
					</li>
					<div class="load-button">
						<Button type="success" :loading="loading2" @click.native="toLoading2">
        					<span v-if="!loading2">加载更多</span>
        					<span v-else>加载中...</span>
    					</Button>
					</div>
				</ul>

				<div class="right-bar">
					<div class="container">
						<div class="title">
							<span>热度最高</span>
							<span class="icon-bookmarks"></span>
						</div>
						<ul>
							<li v-for="(item,index) in topList" class="top-list" v-if="topList" :key="index">
								<router-link class="top" :to="'/artical/'+item.articalid">
									<Tag :style="{background:colorList[index]}" class="tag">NO.{{index+1}}</Tag>
									<span class="text">{{item.title}}</span>
								</router-link>

							</li>
						</ul>
					</div>
					<div class="container">
						<div class="title">
							<span>最近访客</span>
							<icon type="person" class="person"></icon>

						</div>
						<div class="demo-avatar">

							<Avatar class="avatarlist" v-for="(item,index) in activeUser" :src="item.avatar" :key="index">

							</Avatar>
						</div>
					</div>
					<div class="container">
						<div class="title">
							<span>站外推荐</span>
							<span class="icon-share2"></span>

						</div>
						<ul>
							<li v-for="item in recommendationList" class="list">
								<a :href="item.url" target="_blank" class="list-url">
									<img :src="item.src" alt="" />
									<span class="text">{{item.name}}</span>
									<span class="count">{{item.count}}</span>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import Vue from 'vue'
	import vSpin from '@/components/common/spin'
	import {
		Carousel3d,
		Slide
	} from 'vue-carousel-3d'
	export default {
		components: {
			Carousel3d,
			Slide,
			vSpin
		},
		props: {
			user: {
				type: Array
			}
		},
		data() {
			return {
				limit: 10,
				limitCount: 0,
				loading2: false,
				topList: '',
				activeArray: [true, false, false, false, false, false, false, false, false, false, false],
				recommendationList: [{
					name: 'Android',
					src: require('../assets/img/az.svg'),
					url: 'https:xiaozhuanlan.com/explore?category=Android%EF%BC%8FKotlin',
					count: 41
				}, {
					name: 'iOS/Swift',
					src: require('../assets/img/ios.svg'),
					url: 'https:xiaozhuanlan.com/explore?category=iOS%EF%BC%8FSwift',
					count: 32
				}, {
					name: 'Python',
					src: require('../assets/img/python.svg'),
					url: 'https:xiaozhuanlan.com/explore?category=Python',
					count: 13
				}, {
					name: '前端',
					src: require('../assets/img/qianduan.svg'),
					url: 'https:xiaozhuanlan.com/explore?category=%E5%89%8D%E7%AB%AF',
					count: 41
				}, {
					name: 'PHP',
					src: require('../assets/img/php.svg'),
					url: 'https:xiaozhuanlan.com/explore?category=PHP',
					count: 9
				}, {
					name: '运维',
					src: require('../assets/img/yw.svg'),
					url: 'https:xiaozhuanlan.com/explore?category=%E8%BF%90%E7%BB%B4',
					count: 5
				}, {
					name: '区块链',
					src: require('../assets/img/qkl.svg'),
					url: 'https:xiaozhuanlan.com/explore?category=%E5%8C%BA%E5%9D%97%E9%93%BE',
					count: 2
				}, {
					name: '人工智能',
					src: require('../assets/img/rgzn.svg'),
					url: 'https:xiaozhuanlan.com/explore?category=%E4%BA%BA%E5%B7%A5%E6%99%BA%E8%83%BD',
					count: 5
				}, {
					name: '技术管理',
					src: require('../assets/img/jsgl.svg'),
					url: 'https:xiaozhuanlan.com/explore?category=%E6%8A%80%E6%9C%AF%E7%AE%A1%E7%90%86',
					count: 5

				}, {
					name: '设计UI',
					src: require('../assets/img/sjui.svg'),
					url: 'https:xiaozhuanlan.com/explore?category=%E8%AE%BE%E8%AE%A1%20UI',
					count: 8
				}, {
					name: '产品运营',
					src: require('../assets/img/cpyy.svg'),
					url: 'https:xiaozhuanlan.com/explore?category=%E4%BA%A7%E5%93%81%E8%BF%90%E8%90%A5',
					count: 5
				}, {
					name: '增长黑客',
					src: require('../assets/img/zzhk.svg'),
					url: 'https:xiaozhuanlan.com/explore?category=%E5%A2%9E%E9%95%BF%E9%BB%91%E5%AE%A2',
					count: 6
				}, {
					name: '企业专栏',
					src: require('../assets/img/qyzl.svg'),
					url: 'https:xiaozhuanlan.com/explore?category=%E4%BC%81%E4%B8%9A%E4%B8%93%E6%A0%8F',
					count: 8
				}, ],
				isLike: false,
				categoryList: ['全部', '故事', '诗', 'Vue.js', '读书', '小清新', 'C++', 'PHP深入浅出', '冷文精选', '那些孤独撸码的日子', '其他'],
				sliders: [{
					url: require('../assets/img/slider1.jpg')
				}, {
					url: require('../assets/img/slider2.jpg')
				}, {
					url: require('../assets/img/slider3.jpg')
				}, {
					url: require('../assets/img/slider4.jpg')
				}, {
					url: require('../assets/img/slider5.jpg')
				}, {
					url: require('../assets/img/slider6.jpg')
				}, {
					url: require('../assets/img/slider7.jpg')
				}],
				articals:'',
				articalslike: '',
				articalsInfo: '',
				spinShow: true,
				firstView: true,
				activeUser: '',
				category: '',
				colorList: ['#ed3f14', '#ff9900', '#19be6b', '#2d8cf0', '#1c2438', '#495060', '#80848f', '#bbbec4']
			}
		},
		created() {

			//获得文章记录总数
			this.$http.post('/api/artical.php', {
				type: 'getlimit'
			}, {
				emulateJSON: true
			}).then((res) => {
				if(res.body) {
					this.limitCount = res.body[0].totalnum
					//console.log(this.limitCount)
				}
			})
			//获得文章预览列表
			this.getArticalList()
			this.getTopArtical()
			this.getActiveUser()
		},
		activated(){
			this.getArticalList()
		},
		methods: {
			getActiveUser() {
				this.$http.post('/api/artical.php', {
					type: 'getActiveUser'
				}, {
					emulateJSON: true
				}).then((res) => {
					this.activeUser = res.body
					//console.log(res.body)
				})
			},
			getTopArtical() {
				this.$http.post('/api/artical.php', {
					type: 'getTopArtical'
				}, {
					emulateJSON: true
				}).then((res) => {
					this.topList = res.body
					//console.log(res.body)
				})
			},
			getArticalList() {
				this.$http.post('/api/artical.php', {
					type: 'getArticalList',
					type1: 'list',
					limit: this.limit
				}, {
					emulateJSON: true
				}).then((res) => {

					this.articals = res.body
					for(let i = 0; i < this.articals.length; i++) {
						Vue.set(this.articals[i], 'isLike', false)
					}
					//console.log(res.body)
					if(this.user.id !== '') {
						this.getLikeList()
					}
					this.spinShow = false
					this.firstView = false
					this.loading2 = false
				})
			},
			toLoading2() {
				if(this.limit > this.limitCount) {
					this.$Message.error("已经加载完所有文章!")
					return false
				}else{
					this.addLimit()
				}
				if(this.activeArray[0]) {
					this.getArticalList()
				} else {
					this.categorySearch()
				}
				

			},
			addLimit(){
				this.loading2 = true
				this.limit += 10
			},
			categorySearch(cIndex) {
				this.$Loading.start()
				this.activeArray.splice(0, this.activeArray.length, false, false, false, false, false, false, false, false, false, false, false)
				this.activeArray.splice(cIndex, 1, true)
				if(this.activeArray[0] === true) {
					this.category = 'no'
				} else {
					this.category = this.categoryList[cIndex]
				}
				//console.log(this.categoryList[index])
				this.$http.post('/api/artical.php', {
					type: 'getCategoryList',
					type1: 'list',
					limit: this.limit,
					category: this.category
				}, {
					emulateJSON: true
				}).then((res) => {
					if(res.body != '0') {
						//console.log(res.body)
						this.articals = res.body
						this.getLikeList()
						this.$Loading.finish()
					} else {
						this.$Message.error("该分类下暂无文章")
						this.$Loading.error()
					}
					this.loading2 = false
					  //console.log(res.body)
				})
			},
			getLikeList() {
				this.$http.post('/api/artical.php', {
					type: 'getArticalInfo',
					userid: this.user.id
				}, {
					emulateJSON: true
				}).then((res) => {
					//console.log(res.body)
					this.articalslike = res.body
					for(let z = 0; z < this.articalslike.length; z++) {
						for(let j = 0; j < this.articals.length; j++) {
							if(this.articalslike[z].articalid === this.articals[j].articalid) {							
								this.$set(this.articals[j], 'isLike', true)
							}
						}

					}
				})

			}

		}
	}
</script>

<style lang="less" scoped>
	@color1: #41b883;
	@color2: #2c3e50;
	.activecategory {
		background: @color1;
		color: #fff !important;
	}
	
	a:hover {
		color: @color1 !important;
	}
	
	.prepicture {
		width: 150px;
		height: auto;
		max-height: 130px;
	}
	
	.avatarlist {
		color: #f56a00;
		margin-right: 10px;
		margin-bottom: 10px;
		background-color: #fde3cf;
	}
	
	.load-button {
		text-align: center;
		margin: 40px 0;
	}
	
	.blog {
		padding-top: 10px;
		font-family: 'font1', "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei" !important;
		.carousel-wrap {
			.carousel {
				border: 1px solid rgba(220, 220, 220, 0.5);
			}
		}
		.content-wrap {
			position: relative;
			.b-content {
				display: flex;
				max-width: 960px;
				margin: 0 auto;
				/*border-bottom: 1px solid rgba(225, 225, 225, 0.6);*/
				.artical-type {
					white-space: normal;
					text-overflow: ellipsis;
					padding: 20px 0 20px 0px;
					border-bottom: 1px solid rgba(225, 225, 225, 0.6);
					.item {
						display: inline-block;
						vertical-align: middle;
						padding: 8px 12px;
						text-align: center;
						color: @color1;
						border: 1px solid @color1;
						border-radius: 6px;
						font-size: 14px;
						margin: 0px 15px 10px 0px;
						line-height: 14px;
						cursor: pointer;
					}
					.item:hover {
						color: #fff;
						border: 1px solid #FFFFFF;
						background: @color1;
					}
				}
				.artical-list {
					flex: 0 0 640px;
					position: relative;
					margin: 40px 0;
					.spin-wrap {
						width: 100%;
					}
					.artical {
						display: flex;
						font-family: 'font1', "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei" !important;
						padding: 20px 0;
						border-bottom: 1px solid rgba(225, 225, 225, 0.6);
						.pic {
							display: flex;
							text-align: center;
							vertical-align: middle;
							padding: 30px 30px 0 30px;
						}
						.ar-content {
							flex: 0 0 70%;
							.ar-header {
								font-size: 14px;
								vertical-align: middle;
								.avatar {
									box-sizing: border-box;
									width: 32px;
									height: 32px;
									border-radius: 50%;
									border: 1px solid #ddd;
								}
								.author {
									display: inline-block;
									height: 32px;
									vertical-align: top;
									line-height: 32px;
									margin-left: 12px;
								}
								.time {
									color: #333;
									display: inline-block;
									height: 32px;
									vertical-align: top;
									line-height: 32px;
									margin-left: 6px;
								}
							}
							.ar-body {
								max-width: 640px;
								overflow: hidden;
								.title {
									color: #000;
									margin: 4px 0 4px;
									display: block;
									font-size: 18px;
									font-weight: 700;
									line-height: 1.5;
								}
								.title:hover {
									cursor: pointer;
									color: @color1;
								}
								.preview {
									.text {
										line-height: 1.6;
										color: #333;
										font-size: 14px;
										padding-right: 15px;
									}
								}
							}
							.ar-footer {
								margin-top: 10px;
								font-size: 12px;
								.category {
									vertical-align: middle;
									padding: 0px 10px;
									text-align: center;
									color: @color1;
									border: 1px solid @color1;
									border-radius: 4px;
									font-size: 12px;
								}
								.totalview {
									vertical-align: middle;
									display: inline-block;
									height: 15px;
									line-height: 15px;
									margin-left: 10px;
									.icon-eye {
										color: #D3D3D3;
										font-size: 15px;
									}
									.num {
										vertical-align: top;
										font-size: 12px;
										color: #D3D3D3;
									}
								}
								.totalComments {
									vertical-align: middle;
									color: #D3D3D3;
									display: inline-block;
									height: 15px;
									line-height: 15px;
									margin-left: 10px;
									.icon-bubbles4 {
										font-size: 15px;
									}
									.num {
										vertical-align: top;
										font-size: 12px;
									}
								}
								.likes {
									cursor: pointer;
									vertical-align: middle;
									color: #D3D3D3;
									display: inline-block;
									height: 15px;
									line-height: 15px;
									margin-left: 10px;
									.icon-heart {
										font-size: 15px;
									}
									.num {
										vertical-align: top;
										font-size: 12px;
									}
								}
								.active {
									color: #f00;
								}
								.collections {
									margin-left: 10px;
									vertical-align: top;
									color: #D3D3D3;
									display: inline-block;
									height: 15px;
									line-height: 15px;
									.icon-bookmarks {
										font-size: 15px;
									}
									.num {
										vertical-align: top;
										font-size: 12px;
									}
								}
							}
						}
					}
				}
				.right-bar {
					flex: 1 1 100%;
					min-width: 300px;
					color: #000;
					.container {
						/*border: 1px solid #D3D3D3;*/
						padding: 40px 0 0 40px;
						color: #333;
						.title {
							margin-bottom: 10px;
							padding-bottom: 10px;
							font-size: 14px;
							border-bottom: 1px solid #D3D3D3;
							font-weight: 700;
							color: #000;
							.person {
								font-size: 16px;
							}
							.icon1 {
								font-size: 16px;
							}
						}
						.list {
							position: relative;
							display: block;
							height: 40px;
							line-height: 40px;
							margin-top: 2px;
							.list-url {
								display: block;
								padding: 2px 0 0 1px;
								.text {
									color: #000;
									margin-left: 10px;
									font-size: 14px;
									vertical-align: top;
									line-height: 40px;
								}
								.count {
									color: #000;
									position: absolute;
									right: 25px;
								}
							}
						}
						.list:hover {
							cursor: pointer;
							background: #DDDDDD;
							vertical-align: middle;
							color: #000;
						}
						.top-list {
							color: #000;
							display: block;
							margin: 10px 0;
							/*border:1px solid red;*/
							.top {
								position: relative;
								display: inline-block;
								font-size: 16px;
								text-overflow: ellipsis;
								overflow: hidden;
								white-space: nowrap;
								width: 100%;
								.tag {
									color: #fff;
								}
								.text {
									color: #000;
									font-size: 14px;
									line-height: 14px;
									vertical-align: middle;
								}
							}
						}
					}
				}
			}
		}
	}
</style>