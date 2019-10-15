<template>
  <div id="productservice">
      <el-row>
           <el-col :span="24">
             <h2 class="productservice_top"> {{ $t('home.productservice.productservice') }}</h2>
             <p class="productservice_manage">{{ $t('home.productservice.subproductservice') }}</p>
            </el-col>

            <div class="productservice_content">
              <el-col :span="16" :offset="4">

                <ul class="productservice_content_lists">
                  <el-col :xs="12" :sm="12" :md="8" >
                     <router-link tag="li" class="productservice_content_item" to="/gisMap">
                        <span class="list_img"><img src="../../static/images/GIS.png" alt=""></span>
                        <p class="list_title">{{ $t('home.productservice.GISmap.title') }}</p>
                        <p class="list_desrc">{{ $t('home.productservice.GISmap.description') }}</p>
                     </router-link>
                  </el-col>
                 <el-col :xs="12" :sm="12" :md="8" >
                     <router-link tag="li" class="productservice_content_item" to="/wisdomElectricity/paramterSync">
                        <span class="list_img"><img src="../../static/images/smart-electricity.png" alt=""></span>
                        <p class="list_title"> {{ $t('home.productservice.smartElectricity.title') }}</p>
                        <p class="list_desrc">{{ $t('home.productservice.smartElectricity.description') }}</p>
                     </router-link>
                  </el-col>
                  <el-col :xs="12" :sm="12" :md="8">
                     <router-link tag="li" class="productservice_content_item" to="/wisdomSafe/smokeRealTimeStatus">
                        <span class="list_img"><img src="../../static/images/smart-safe.png" alt=""></span>
                        <p class="list_title">{{ $t('home.productservice.smartSafe.title') }}</p>
                        <p class="list_desrc">{{ $t('home.productservice.smartSafe.description') }}</p>
                     </router-link>
                  </el-col>
                   <el-col :xs="12" :sm="12" :md="8" >
                     <router-link tag="li" class="productservice_content_item" to="/wisdomEnergy/realTimeData">
                        <span class="list_img"><img src="../../static/images/smart-efficiency.png" alt=""></span>
                        <p class="list_title">{{ $t('home.productservice.smartEnergy.title') }}</p>
                        <p class="list_desrc">{{ $t('home.productservice.smartEnergy.description') }}</p>
                     </router-link>
                  </el-col>
                   <el-col :xs="12" :sm="12" :md="8">
                     <router-link tag="li" class="productservice_content_item" to="/wisdomEnvironment/deviceRealTimeData">
                        <span class="list_img"><img src="../../static/images/smart-environment.png" alt=""></span>
                        <p class="list_title">{{ $t('home.productservice.smartEnvironment.title') }}</p>
                        <p class="list_desrc">{{ $t('home.productservice.smartEnvironment.description') }}</p>

                     </router-link>
                  </el-col>
                   <el-col :xs="12" :sm="12" :md="8">
                     <li class="productservice_content_item">
                       <span class="list_img"><img src="../../static/images/smart-lighting.png" alt=""></span>
                        <p class="list_title">{{ $t('home.productservice.smartLighting.title') }}</p>
                        <p class="list_desrc">{{ $t('home.productservice.smartLighting.description') }}</p>
                     </li>
                  </el-col>
                </ul>
              </el-col>
            </div>
      </el-row>
  </div>
</template>

<script>
export default {
    data () {
        return {
        };
    },

    methods: {}
};
</script>

<style lang='scss' scope>
#productservice {
  padding: 1.16rem 0;
  .productservice_top {
    text-align: center;
    font-size: 0.35rem;
    font-weight: 400;
  }
  .productservice_manage {
    text-align: center;
    margin-top: 0.1rem;
    color: rgb(153,163,153);
    font-size: 0.24rem;
  }
  .productservice_content {
    .productservice_content_lists {
     margin-top: 10px;
      
    }
    .productservice_content_item { 
      text-align: center;
      margin: 5px;
      height: 2.2rem;
      padding: 0.68rem 0.387rem;
      .list_img {
        display: inline-block;
        width: 0.533rem;
        height: 0.533rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .list_title {
        font-size: 0.257rem;
        margin-top: 0.1rem;
      }
      .list_desrc {
        font-size: 0.187rem;
        color: rgb(102,102,102);
        margin-top: 0.1rem;
        text-align: left;
      }
    }
    .productservice_content_item:hover {
       box-shadow: 0 0 10px rgba(0,0,0,0.1); 
       transform: translate3d(0, -2px, 0);
       transition: all 0.5s linear;
       -webkit-box-shadow: 0 0 10px rgba(0,0,0,0.1); 
       -webkit-transform: translate3d(0, -2px, 0);
       -webkit-transition: all 0.5s linear;
       -moz-box-shadow: 0 0 10px rgba(0,0,0,0.1); 
       -moz-transform: translate3d(0, -2px, 0);
       -moz-transition: all 0.5s linear;
    }
  }
}
</style>
