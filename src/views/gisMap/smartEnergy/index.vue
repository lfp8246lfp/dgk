<template>
  <div id="gismap">
    <!-- <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box> -->
    <el-autocomplete
        class="search-box"
        v-model="state"
        :fetch-suggestions="querySearchAsync"
        placeholder="根据名称搜索设备"
        @select="selectSearch"
        :trigger-on-focus="false"
        ></el-autocomplete>
    <el-amap class="amap-box" vid="map" :zoom="zoom" :center="center" :plugin="plugin" :amap-manager="amapManager" >
        <el-amap-marker vid="marker"  v-for="(marker,index) in markerGroups"  :key="index" :position="marker.position" :visible="true" :draggable="false" :icon="marker.icon" :events="marker.events" :isHotspot="open"></el-amap-marker>
        <el-amap-info-window v-if="window" :position="windows[0].position" :visible="windows[0].visible" :content="windows[0].content" :offset="windows[0].offset" ></el-amap-info-window>
    </el-amap>
  </div>
</template>

<script>
import Vue from 'vue';
import VueAMap from 'vue-amap';

import AMap from 'vue-amap';
Vue.use(VueAMap);
let amapManager = new AMap.AMapManager();
export default {
    data () {
        return {
            zoom: 15,
            amapManager,
            center: [120.275177, 30.201746],
            open: true,
            markerGroups: [
                {
                    position: [120.28316, 30.2363],
                    content: '设备1号',
                    offset: [10, 12],
                    icon: 'el-icon-location',
                    map: this.map

                },
                {
                    position: [120.275177, 30.201746],
                    content: '设备2号',
                    offset: [10, 12],
                    icon: '../../../static/images/abnormal-dev.png',
                    events: {
                        click: () => {
                            this.windows[0].visible = !this.windows[0].visible;
                            // if (this.windows[0].visible === true) {
                            // this.windows[0].visible = false
                            // } else {
                            // this.windows[0].visible = true
                            // }
                        }
                    }
                    //  dragend: (e) => {
                    //         this.markers[0].position = [e.lnglat.lng, e.lnglat.lat]
                    // }

                },
                {
                    position: [120.273794, 30.20058],
                    content: '设备3号',
                    offset: [10, 12],
                    icon: '../../../static/images/abnormal-dev.png'

                },
                {
                    position: [120.276112, 30.197751],
                    content: '测试设备1',
                    offset: [10, 12],
                    icon: '../../../static/images/abnormal-dev.png'
                },
                {
                    position: [120.275112, 30.198751],
                    content: '测试设备2',
                    offset: [10, 12],
                    icon: '../../../static/images/offline-dev.png'
                },
                {
                    position: [120.296112, 30.197751],
                    content: '钦汇园',
                    offset: [10, 12],
                    icon: '../../../static/images/online-dev.png'
                },
                {
                    position: [120.277772, 30.200051],
                    content: '钦汇园',
                    offset: [10, 12],
                    icon: '../../../static/images/abnormal-dev.png'
                }
            ],
            searchOption: {
                city: '全国',
                citylimit: true

            },
            mapCenter: [120.275177, 30.201746],
            windows: [
                {
                    position: [120.275177, 30.201746],
                    visible: true,
                    // content: 'Hi! I am here!',
                    offset: [0, -30],
                    isCustom: true,
                    events: {
                        close () {
                            console.log('close infowindow1');
                        }
                    },
                    content: `<div class="map-inner">
                     <h1>设备信息</h1>
                     <div class="map-table" >
                       <span>
                        <ul class="cloum">
                          <li>设备名称</li>
                          <li>设备编号</li>
                          <li class="last-li">IP</li>
                        </ul>
                       </span>
                       <span>
                         <ul class="cloum cloum-">
                            <li>某某设备</li>
                            <li>20180504</li>
                            <li class="last-li">47.98.43.237</li>
                         </ul>
                       </span>
                      
                        <div class="map-img pull-right">
                          <img src="../../../static/images/alarm.png" />
                          <p class="map-alarm">异常</p>
                        </div>
                        
                     
                     </div>
                    </div>`
                }
            ],
            window: true,
            plugin: [
                {
                    pName: 'ToolBar', // 工具条插件
                    position: 'LB'
                },
                {
                    pName: 'MapType', // 卫星与地图切换
                    defaultType: 0
                }
                //  {
                //     pName: 'PlaceSearch', //  POI搜索插件
                //      position: 'LT'
                // }
            ],
            state: ''

        };
    },
    created () {
        VueAMap.initAMapApiLoader({
            key: '5d0c10b13cc908bc1c00f012ec739e9d',
            plugin: [
                'AMap.Autocomplete', // 输入提示插件
                'AMap.PlaceSearch', // POI搜索插件
                'AMap.Scale', // 右下角缩略图插件 比例尺
                'AMap.OverView', // 地图鹰眼插件
                'AMap.ToolBar', // 地图工具条
                'AMap.MapType', // 类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
                'AMap.PolyEditor', // 编辑 折线多，边形
                'AMap.CircleEditor', // 圆形编辑器插件
                'AMap.Geolocation' // 定位控件，用来获取和展示用户主机所在的经纬度位置
            ],
            v: '1.4.4',
            uiVersion: '1.0.11'
        });
    },
    mounted () {
        //  this.point();

    },
    computed: {
    // markers: function() {
    //   return this.markerGroups[this.i];
    // },
    // center: function () {
    //     return this.markerGroups[this.i][0].position;
    // },
    },
    methods: {
        onSearchResult (pois) {
            console.log(pois, '1222');
            let latSum = 0;
            let lngSum = 0;
            if (pois.length > 0) {
                pois.forEach(poi => {
                    let {lng, lat} = poi;
                    lngSum += lng;
                    latSum += lat;
                    this.markerGroups.push({position: [poi.lng, poi.lat]});
                });
                let center = {
                    lng: lngSum / pois.length,
                    lat: latSum / pois.length
                };
                this.center = [center.lng, center.lat];
            }
        },

        querySearchAsync (queryString, cb) {
            //     var restaurants = this.restaurants;
            //     var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

            //     clearTimeout(this.timeout);
            //     this.timeout = setTimeout(() => {
            //     cb(results);
            //     }, 3000 * Math.random());
            // },
            // createStateFilter(queryString) {
            //     return (state) => {
            //     return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            //     };
            // },

            for (let i of this.markerGroups) {
                i.value = i.content;
                i.label = i.position;
            }

            let sugList = this.markerGroups;
            if (sugList.length === 0) {
                sugList = [{value: '暂无数据'}];
            }
            cb(sugList);
        },
        selectSearch (item) {
            console.log(item);
        }
    // point(){
    //   let markers = [];
    //     let windows=[]
    //     let that=this
    //     pointMarker.forEach((item,index)=>{
    //       markers.push({
    //         position: [item.lng,item.lat],
    //         icon:item.url,
    //         events: {
    //           click() {
    //             that.windows.forEach(window => {
    //               window.visible = false;
    //             });
    //             that.window = that.windows[index];
    //             that.$nextTick(() => {
    //               that.window.visible = true;
    //             });
    //           }
    //         }
    //       })
    //       windows.push({
    //         position: [item.lng,item.lat],
    //         content:"<div>"+item.text+"</div>",
    //         offset:[5,-15],
    //         visible: false
    //       })
    //     })
    //     this.markers = markers;
    //     this.windows=windows;

    //
    }
};
</script>

<style lang='scss' scope>
#gismap {
  padding: 10px;
  box-sizing: border-box;
  height: 87.3vh;
  position: relative;
  .search-box {
      position: absolute;
      top: 25px;
      left: 20px;
      z-index: 999;
    }
  
  .map-inner {
      h1 {
          font-size: 9px;
      }
      .map-table {
          border: 1px solid rgb(238,238,238);
          font-size: 7px;
          margin-top: 5px;
          span {
              display: inline-block;
             
          }
         img { 
             width: 28px;
             height: 28px;
              }
          .map-img {
              padding: 5px;
              padding-top: 10%;
              text-align: center;
              .map-alarm {
                color: rgb(237,119,115);
            }
          }
          .cloum {
              display: flex;
              flex-direction: column;
              li {
                  flex: 1;
                  border-bottom: 1px solid rgb(238,238,238);
                  border-right: 1px solid rgb(238,238,238);
                  padding: 5px;
                  color: rgb(102,102,102);
              }
              .last-li {
                  border-bottom: none;
              }
          }
      }
  }
}
</style>

<style lang="scss">
    #gismap {
        .amap-info-close {
            display: none;
        }
        .amap-info-close  {
            width: 26px;
        }
        .amap-info-content {
          padding: 10px;
        }
    }
</style>
