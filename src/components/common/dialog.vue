<template>
	<div class="dialog-wrap" :class="{all:!isShow}">
		<div class="dialog-cover" v-if="isShow" @click="closeMyself"></div>
		<transition name="drop">
			<div class="dialog-content" v-if="isShow">
				<p class="dialog-close" @click="closeMyself"><icon type="close"></icon></p>
				<slot>正在加载.....</slot>
			</div>
		</transition>
	</div>
</template>

<script>
	export default {
		name: 'myDialog',
		props: {
			isShow: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
			
			}
		},
		methods: {
			closeMyself() {
				this.$emit('on-close')
			}
		}
	}
</script>

<style>
	.all{
		display: none;
	}
	.drop-enter-active {
		transition: all .5s ease;
	}
	
	.drop-leave-active {
		transition: all .3s ease;
	}
	
	.drop-enter {
		transform: translateY(-300px);
	}
	
	.drop-leave-active {
		transform: translateY(-300px);
	}
	
	.dialog-wrap {
		padding: 0;margin: 0;
		position: fixed;
		left: 0;
		top: 40;
		width: 100%;
		height: 100%;
		z-index:99;
	}
	
	.dialog-cover {
		background: #000;
		opacity: .5;
		position: fixed;
		z-index: 5;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		text-align: center;
	}
	
	.dialog-content {
		margin: 0;padding: 0;
		box-sizing:border-box;
		text-align: center;
		width:90%;
		max-width: 760px;
		position: relative;
		max-height: auto;
		overflow: auto;
		background: #fff;
		z-index: 10;
		border: 2px solid #464068;
		padding:4% 0;
		line-height: 1.6;
		margin: 0 auto;
	}
	
	.dialog-close {
		position: absolute;
		right: 0px;
		top: 0px;
		width: 30px;
		height: 30px;
		font-size:18px;
		text-align: center;
		cursor: pointer;
		background: #D3D3D3;
		font-weight: 400;
	}
	
	.dialog-close:hover {
		color: #4fc08d;
	}
	
</style>