<template>
	<div>
		<Upload action="api/uploadimg.php" name='avatar' accept="image/*" :on-success="getRes" :on-exceeded-size="handleMaxSize" :max-size="1000"  :format="['jpg','jpeg','png','gif']">
			<Button type="ghost" icon="ios-camera" class="ioscamera"></Button>
		</Upload>
	</div>
</template>
<script>
	export default {
	  data(){
	  	return{
	  		isSelect:false
	  	}
	  },
	  methods:{
	  	getRes(res,file){
	  		if(res){
			  this.$Message.success('上传图片成功')
			  this.$emit('successLoad',res)
	  		}else{
	  			this.$Message.error('上传文件失败!')
	  		}
	  	},
	  	handleMaxSize (file) {
                this.$Notice.warning({
                    title: '头像尺寸过大',
                    desc: '文件' + file.name + '太大了,不能超过500KB噢!.'
                });
            },
	  	
	  }
	}
</script>
<style scoped>
	.select-avatar{
		height: 48px;
		width: 48px;
		position: relative;
		border:1px solid #DDDDDD;
	}
	.ioscamera {
		font-size: 32px;
		line-height: 32px;
	}
</style>