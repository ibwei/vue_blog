<template>
	<div class="footer">		
		<div class="memo">Flipped <br />心情分享社区，记录时光记录你<br />Copyright © 2017 </div>
	</div>
</template>

<script>
	export default{
		mounted(){
			this.$emit('add-load')
		},
		created(){
			this.$emit('add-load')
		}
	}
</script>

<style lang="less" scoped>
	@color1: #41b883;
	@color2: #2c3e50;
.footer{
	/*border:1px solid red;*/
	font-family:"Microsoft YaHei" !important;
	margin: 0;
	padding:20px 0;
	width: 100%;
	background: @color1;
	text-align: center;
	position:absolute;
	z-index: 2;
	left: 0;bottom:0px;
	
	.memo{
		line-height: 1.5em;
		font-family:"Microsoft YaHei" !important;
		font-size: 12px;
		color:#fff;
	}
}
</style>