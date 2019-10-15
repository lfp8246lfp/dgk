<template>
  <div id="projectlocation">
    <el-row>
      <el-col :span="24">
        <p class="projectlocation_top"> {{ $t('home.projectDistribution.projectDistribution') }}</p>
      </el-col>
      <div class="projectlocation_content">
        <el-col :span="16" :offset="4">
          <div class="projectlocation_content_map">
            <!-- <img src="../../static/images/project-map.png" alt> -->
             <img src="../../static/images/map.png" alt>
            <div class="projectlocation_content_dot_list">
              <!-- 贵州 -->
              <div class="p-map-dot animate style-3" style="left: 73.747%; top: 38.996%;">
                <div class="p-map-dot-layer"></div>
                <span class="p-map-dot-text left">{{ $t('home.projectDistribution.city.guizhou') }}</span>
                <!-- 气泡提示 start -->
                <div class="p-bubble p-bubble-bottom p-map-bubble">
                  <div class="p-bubble-inner">
                    <h3 class="title">{{ $t('home.projectDistribution.city.available') }}</h3>
                    <p>{{ $t('home.projectDistribution.city.guianxinqu') }}</p>
                  </div>
                </div>
                <!-- 气泡提示 end -->
              </div>
              <!-- 杭州 -->
              <div class="p-map-dot animate style-4" style="left: 79.021%; top: 33.931%;">
                <div class="p-map-dot-layer"></div>
                <span class="p-map-dot-text left">{{ $t('home.projectDistribution.city.hangzhou') }}</span>
                <!-- 气泡提示 start -->
                <div class="p-bubble p-bubble-bottom p-map-bubble">
                  <div class="p-bubble-inner">
                    <h3 class="title">{{ $t('home.projectDistribution.city.available') }}</h3>
                    <p>{{ $t('home.projectDistribution.city.huaruicenter') }}</p>
                    <p class="disabled">{{ $t('home.projectDistribution.city.xiaoshan') }}</p>
                  </div>
                </div>
                <!-- 气泡提示 end -->
              </div>
            </div>

            <div class="p-map-dot-explain">
                <div class="p-map-dot-explain-item">
                    <div class="p-map-dot">
                        <span class="p-map-dot-layer"></span>       
                    </div>
                     <span class="p-map-dot-explain-txt">{{ $t('home.projectDistribution.openedProject') }}</span>
                </div>
                <div class="p-map-dot-explain-item">
                    <div class="p-map-dot style-3">
                        <span class="p-map-dot-layer"></span>       
                    </div>
                    <span class="p-map-dot-explain-txt">{{ $t('home.projectDistribution.upcominfProject') }}</span>
                </div>
            </div>
          </div>
        </el-col>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
    data () {
        return {};
    },

    methods: {}
};
</script>

<style lang='scss' scope>
#projectlocation {
  padding-top: 0.572rem;
  background-color: #f7f8fa;
  @keyframes warn {
    0% {
      opacity: 0;
      -webkit-transform: scale(0.1);
      transform: scale(0.1);
    }
    5% {
      opacity: 1;
    }
    to {
      opacity: 0;
      -webkit-transform: scale(4);
      transform: scale(4);
    }
  }
  @-webkit-keyframes warn {
    0% {
      opacity: 0;
      -webkit-transform: scale(0.1);
      transform: scale(0.1);
    }
    5% {
      opacity: 1;
    }
    to {
      opacity: 0;
      -webkit-transform: scale(4);
      transform: scale(4);
    }
  }
  @keyframes warn-2 {
    0% {
      opacity: 0;
      -webkit-transform: scale(0.1);
      transform: scale(0.1);
    }
    5% {
      opacity: 8;
    }
    to {
      opacity: 0;
      -webkit-transform: scale(10);
      transform: scale(10);
    }
  }
  @-webkit-keyframes warn-2 {
    0% {
      opacity: 0;
      -webkit-transform: scale(0.1);
      transform: scale(0.1);
    }
    5% {
      opacity: 8;
    }
    to {
      opacity: 0;
      -webkit-transform: scale(10);
      transform: scale(10);
    }
  }

  .projectlocation_top {
    text-align: center;
    margin-bottom: 0.2333rem;
    font-size: 0.42rem;
  }
  .projectlocation_content {
    .projectlocation_content_map {
      position: relative;
      img {
        width: 100%;
      }
    }
    .projectlocation_content_dot_list {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 2;
      top: 0;
      left: 0;
      .p-map-dot {
        position: absolute;
        display: inline-block;
        vertical-align: middle;
        width: 20px;
        height: 20px;
        -webkit-box-shadow: inset #22a87a 0 0 5px;
        box-shadow: inset #22a87a 0 0 5px;
        border-radius: 50%;
        cursor: pointer;
        background-color: #f7f8fa;
        .p-map-dot-layer {
          width: 8px;
          height: 8px;
          position: absolute;
          top: 50%;
          left: 50%;
          margin: -4px 0 0 -4px;
          background-color: #22a87a;
          border-radius: 50%;
          cursor: pointer;
          opacity: 1;
        }
        .p-map-dot-layer:after {
          content: "";
          position: absolute;
          width: 8px;
          height: 8px;
          -webkit-box-shadow: inset #22a87a 0 0 5px;
          box-shadow: inset #22a87a 0 0 5px;
          border-radius: 50%;
          top: 0;
          left: 0;
          opacity: 0;
        }
        .left {
          position: absolute;
          top: 0;
          padding-left: 5px;
          font-size: 10px;
          line-height: 0.38rem;
          color: #111;
          white-space: nowrap;
          right: auto;
          left: 100% !important;
          
        }
        .p-map-bubble {
          left: 50%;
          bottom: 100%;
          margin-left: -100px;
          margin-bottom: 10px;
          width: 200px;
          text-align: center;
          -webkit-transition: 0.3s all ease-out;
          transition: 0.3s all ease-out;
          opacity: 0;
          visibility: hidden;
          -webkit-transform: translateY(5px);
          -ms-transform: translateY(5px);
          transform: translateY(5px);
          cursor: default;
          pointer-events: none;
          .p-bubble-inner {
            font-size: 12px;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            padding: 8px 10px;
            border: 1px solid #b3b7bf;
            border-radius: 2px;
            background-color: #fff;
            line-height: 18px;
            box-shadow: 1px 1px 3px #22a87a;
            position: static !important;
            left: 50%;
            top: 50%;
            .title {
              margin-bottom: 5px;
              color: rgba(51, 51, 51, 0.8);
              font-weight: 400;
            }
          }
          .p-bubble-inner:before {
            font-size: 0;
            position: absolute;
            width: 0;
            height: 0;
            content: "";
            border: 8px dashed transparent;
            border-top-color: #22a87a;
            top: 100%;
            left: inherit;
            right: inherit;
            margin-top: -1px;
            border-top-style: solid;
            margin-left: -8px;
          }
          .p-bubble-inner:after {
            font-size: 0;
            position: absolute;
            width: 0;
            height: 0;
            content: "";
            border: 7px dashed transparent;
            margin-left: -7px;
            border-top-style: solid;
            border-top-color: #fff;
            top: 100%;
            left: inherit;
            right: inherit;
            margin-top: -1px;
          }
        }
        .p-map-bubble > .p-bubble-inner {
          display: inline-block;
          vertical-align: middle;
          padding: 10px;
          text-align: left;
          border-color: #22a87a;
          font-size: 14px;
          line-height: 24px;
          color: #333;
        }
        .p-bubble {
          position: absolute;
          color: #404a58;
          z-index: 6;
        }
      }
      .p-map-dot.style-3,
      .p-map-dot.style-3:after {
        -webkit-box-shadow: inset #fb9353 0 0 5px;
        box-shadow: inset #fb9353 0 0 5px;
      }
      .p-map-dot.style-3 .p-map-dot-layer {
        background-color: #fb9353;
      }
      .p-map-dot.style-3 .p-map-dot-layer:after {
        -webkit-box-shadow: inset #fb9353 0 0 5px;
        box-shadow: inset #fb9353 0 0 5px;
      }
       .p-map-dot.style-4,
      .p-map-dot.style-4:after {
        -webkit-box-shadow: inset #22a87a  0 0 5px;
        box-shadow: inset #22a87a 0 0 5px;
      }
      .p-map-dot.style-4 .p-map-dot-layer {
        background-color: #22a87a;
      }
      .p-map-dot.style-4.p-map-dot-layer:after {
        -webkit-box-shadow: inset #22a87a 0 0 5px;
        box-shadow: inset #22a87a 0 0 5px;
      }
      .p-map-dot:after {
        content: "";
        position: absolute;
        width: 20px;
        height: 20px;
        -webkit-box-shadow: inset #22a87a 0 0 5px;
        box-shadow: inset #22a87a 0 0 5px;
        border-radius: 50%;
        top: 0;
        left: 0;
        opacity: 0;
      }
      .p-map-dot.animate:hover:after {
        animation: warn 2s ease-out 0.1s infinite;
      }
      .p-map-dot.animate:hover .p-map-dot-layer:after {
        -webkit-animation: warn-2 2s ease-out 1.1s infinite;
        animation: warn-2 2s ease-out 1.1s infinite;
      }
      .p-map-dot:hover .p-map-bubble {
        opacity: 1;
        visibility: visible;
        -webkit-transform: translateY(0);
        -ms-transform: translateY(0);
        transform: translateY(0);
      }
      
     
    }
     .p-map-dot-explain {
          position: absolute;
          left: 0;
          bottom: 1rem;
          z-index: 3;  
          text-align: left;      
         .p-map-dot-explain-item {
             display: block;
             margin-bottom: 5px;
            .p-map-dot {
              position: relative;
              left:0;
              display: inline-block;
              vertical-align: middle;
              width:20px;
              height:20px;
              -webkit-box-shadow: inset #22a87a  0 0 5px;
              box-shadow: inset #22a87a  0 0 5px;
              border-radius: 50%;
              cursor: pointer;
              background-color: #f7f8fa;
              .p-map-dot-layer {
              width: 8px;
              height: 8px;
              position: absolute;
              top: 50%;
              left: 50%;
              margin: -4px 0 0 -4px;            
              background-color: rgb(34,168,122);
              border-radius: 50%;
              cursor: pointer;
              opacity: 1;
            }  
           }
           .p-map-dot.style-3 {
              -webkit-box-shadow: inset #fb9353 0 0 5px;
              box-shadow: inset #fb9353 0 0 5px;
              .p-map-dot-layer {
                 background-color: #fb9353;
              }

           }
          
            .p-map-dot-explain-txt {
             display: inline-block;
             vertical-align: middle;
             font-size: 10px;
            }

         }
         .p-map-dot-explain-item:last-child {
           margin-bottom:0;
         }
       
       
      }
  } 

  @media screen and (max-width: 1000px) {
      .p-map-dot {
          width: 10px!important;
          height: 10px!important;
          cursor: default;
      }
      .p-map-dot-layer {
          margin:-2px 0 0 -2px!important;
          width:4px!important;
          height:4px!important;
      }
      .p-map-dot-text {
          margin-top:-2px!important;
          font-size:12px!important;
          line-height:14px!important;
      }
      .p-map-dot:after {
        display:none!important;
      }
      .p-map-dot.animate:hover .p-map-dot-layer:after .p-map-dot.animate:hover:after {
          -webkit-animation:none!important;
          animation:none!important;
      }
      .p-map-dot:hover .p-map-bubble{
        display:none!important;
      }

   }
}


</style>
