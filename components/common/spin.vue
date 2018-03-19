<style>
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
        color:#41b883;
        /*background:#41b883;*/
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .color1{
    	color:#41b883;
    	font-size:14px;
    	font-family: "microsoft yahei";
    }
    .demo-spin-col{
        height:200px;
        top: 0;
        left: 0;
        width: 100%;
        text-align: center;
        position: relative;
        color:#41b883;
        background:rgba(255,255,255,0.2);
    }
</style>
<template>
    <Row>  
        <Col class="demo-spin-col">
            <Spin fix>
                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                <div class="color1">Loading</div>
            </Spin>
        </Col>
       
    </Row>
</template>
<script>
    // 部分样式代码冗长，未作展示
    export default {
        
    }
</script>
