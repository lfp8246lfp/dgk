<template>
  <div id="partners">
     <el-row>
      <el-col :span="24">
           <p class="partners_top">合作伙伴</p>
      </el-col>

      <div class="partners_content">
           <el-col :span="16" :offset="4">
               <ul class="partners_content_lists">       
                    <li class="partners_content_item">123</li>
                    <li class="partners_content_item">123</li>
                    <li class="partners_content_item">123</li>
                    <li class="partners_content_item">123</li>
                    <li class="partners_content_item">123</li>
                    <li class="partners_content_item">123</li>
                    <li class="partners_content_item">123</li>
                    <li class="partners_content_item">123</li>    
                    <li class="partners_content_item">123</li>    
                    <li class="partners_content_item">123</li>    
                    <li class="partners_content_item">123</li>    
                    <li class="partners_content_item">123</li>    
                    <li class="partners_content_item">123</li>    
                    <li class="partners_content_item">123</li>  
                    <li class="partners_content_item">123</li>           
               </ul>
           </el-col>
      </div>
     </el-row>
  </div>
</template>

<script>
export default {
    name: '',

    data () {
        return {
        };
    },

    methods: {}
};
</script>

<style lang='scss' scope>
#partners {
    background-color: #fff;
    padding: 20px 0;
    .partners_top {
        text-align: center;
        margin-bottom: 10px;
    }
    .partners_content_lists {
      display: flex;
      width: 100%;
      display: -webkit-flex;
      flex-direction: row;
      flex-wrap: wrap;
    }
    .partners_content_item {
        box-sizing: border-box;
        width: 20%;
        border: 1px solid gray;
        // margin: 5px;
        text-align: center;
    }
}
</style>
