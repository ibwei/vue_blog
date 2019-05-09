<template>
	<div class="hello">
		<div class="inner1">
			<div class="light">Talk is cheap,show me the code<br />
				<strong>Let's get it on</strong>
			</div>
			<div class="button-group">
				<router-link to='/blog' class="button active">浏览社区</router-link>
				<a href="https://github.com/ibwei/vue_blog" target="_blank" class="button">Build by Vue.js</a>
			</div>
		</div>
		<div class="carousel-wrap">
			<carousel-3d autoplay :autoplayTimeout="3000" :animationSpeed="1000" :width="450" :height="270">
				<slide v-for="(pic,index) in sliders" :index="index" :style="sliderStyle" :key="index">
					<img :src="pic" width="400" height="270" />
				</slide>
			</carousel-3d>
			<p class="change" @click="changePicture">
				<transition name="fade" mode="out-in">
					<span v-if="!codeShow" key="k1">
					<span class="icon-sad">	
						</span>代码无趣,我还是喜欢风景</span>
					</span>
					</span>
					<span v-else key="k2">
					<span class="icon-smile">
						</span>不喜欢这些图片,我要看代码</span>
					</span>
					</span>
				</transition>
			</p>

		</div>
		<div class="highlights">
			<div class="inner">
				<div class="point" v-for="item in textList">
					<div class="title">{{item.title}}</div>
					<div class="detail">{{item.detail}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { Carousel3d, Slide } from 'vue-carousel-3d';
	export default {
		components: {
			Carousel3d,
			Slide
		},
		name: 'HelloWorld',
		data() {
			return {
				codeShow: true,
				autoplay1: {
					autoplay: true,
					autoplayTimeout: 6000,
					autoplayHoverPause: true
				},

				textList: [{
					title: '记录',
					detail: 'Flipped社区可以记录你的一些日常，生活中的点滴，以及那些让你怦然心动的事。'
				}, {
					title: '分享',
					detail: '想你所享，这里所有的分享，有来自你的,也会有来自我们身边的小伙伴，一起分享吧。'
				}, {
					title: '交流',
					detail: '关于编程，关于其他。Flipped社区正在成长，衷心希望得到您的指引。Let’s Writing！'
				}],
				sliderStyle: {
					background: '#fff',
					verticalAlign: 'top',
					cursor: 'pointer'
				},
				allSliders: [{
						url: require('../assets/img/slider1.jpg')
					},
					{
						url: require('../assets/img/slider2.jpg')
					},
					{
						url: require('../assets/img/slider3.jpg')
					},
					{
						url: require('../assets/img/slider4.jpg')
					},
					{
						url: require('../assets/img/slider5.jpg')
					},
					{
						url: require('../assets/img/slider6.jpg')
					},
					{
						url: require('../assets/img/slider7.jpg')
					},{
						url: require('../assets/img/slider8.jpg')
					},
					{
						url: require('../assets/img/slider9.jpg')
					},
					{
						url: require('../assets/img/slider10.jpg')
					},
					{
						url: require('../assets/img/slider11.jpg')
					},
					{
						url: require('../assets/img/slider12.jpg')
					},
					{
						url: require('../assets/img/slider13.jpg')
					},
					{
						url: require('../assets/img/slider14.jpg')
					}
					
				],
				sliders: [],
				blogSliders:[],
				slidersIn: null
			}
		},
		methods: {
			//切换幻灯片的类型
			changePicture() {
				this.codeShow = !this.codeShow
				this.sliders.length=0
				if(this.slidersIn === true) {			
					for(let i = 0; i < 7; i++) {
						let arr = this.allSliders[i].url
						this.sliders.push(arr)
						this.slidersIn = false
					}
				} else {
					for(let i = 7; i < this.allSliders.length; i++) {
						let arr = this.allSliders[i].url
						this.sliders.push(arr)
						this.slidersIn = true
					}
				}

			}
		},
		created() {
			for(let i = 0; i < this.allSliders.length; i++) {
				if(i<7){
					this.blogSliders[i]=this.allSliders[i].url
				}else{
				let arr = this.allSliders[i].url
				this.sliders.push(arr)
				this.slidersIn = true
				}
				
			}
			//console.log(this.blogSliders)
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	@color1: #41b883;
	@color2: #2c3e50;
	/*过渡组fade的样式*/
	
	.fade-enter-active,
	.fade-leave-active {
		transition: all 1s linear;
		position: relative;
		color: #000;
	}
	
	.fade-enter-to {
		opacity: 1;
		transform: translateY(40px);
	}
	
	.fade-leave {
		opacity: 1;
		transform: translateY(-40px);
	}
	
	.fade-enter,
	.fade-leave-to {
		opacity: 0;
	}
	
	.hello {
		/*font-family: 'font1';*/
		padding: 30px 40px;
		background-color: #fff;
		text-align: center;
		.highlights {
			background-color: #fff;
			padding: 40px 0;
			.inner {
				max-width: 1200px;
				margin: 0 auto;
				text-align: center;
				.point {
					width: 33%;
					display: inline-block;
					vertical-align: top;
					box-sizing: border-box;
					padding: 0 2em;
					font-family: "微软雅黑";
					.title {
						font-weight: 700;
						font-size: 1.2em;
					}
					.title,
					.detail {
						
						/*border: 1px solid red;*/
						text-align: center;
						display: block;
						word-wrap: break-word;
						max-width: 400px;
					}
					.detail{
						line-height: 1.4em;
						 	margin-top: 1em;
							font-weight: 400;
							font-family: 'font1',"微软雅黑";
					}
				}
			}
		}
		.carousel-wrap {
			text-align: center;
			padding: 0;
			.change {
				text-align: center;
				font-size: 14px;
				display: inline-block;
				padding: 0.5em 1.5em;
				border: 1px dashed @color1;
				margin: 1em 0 0 0;
				border-radius: 3em;
				cursor: pointer;
				.icon-sad,
				.icon-smile {
					vertical-align: top;
					font-size: 12px;
					margin-right: 5px;
				}
			}
			.change:hover {
				background: @color1;
				color: #fff;
			}
			margin-top: 4rem;
			text-align: center;
		}
		.inner1 {
			max-width: 900px;
			margin: 0 auto;
			.light {
				font-size: 3.5em;
				line-height: 4.2rem;
				font-weight: 200 !important;
			}
			strong {
				font-weight: 700 !important;
			}
		}
		.button-group {
			margin-top: 2rem;
			text-align: center;
			.button.active,
			.button:hover {
				cursor: pointer;
				color: #fff;
				background-color: @color1;
				transition: all 0.15s ease;
				box-sizing: content-box;
				border: 1px solid @color1;
				text-decoration: none;
			}
			.button:first-child {
				margin-right: 1rem;
			}
			.button {
				font-weight: 700;
				padding: 0.8em 1.5em;
				border-radius: 1.5em;
				display: inline-block;
				cursor: pointer;
				color: @color1;
				background-color: #fff;
				transition: all 0.15s ease;
				box-sizing: content-box;
				border: 1px solid @color1;
				text-decoration: none;
			}
		}
	}
</style>