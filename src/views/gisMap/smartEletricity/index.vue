<template>
  <div id="gismap">
    <!-- <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box> -->
    <div class="search-box">
        <el-autocomplete
           class="pull-left"
           clearable
            v-model="state"
            :fetch-suggestions="querySearchAsync"
            :placeholder="$t('GISmap.placeholder')"
            @select="selectSearch"
            :trigger-on-focus="false"
            ></el-autocomplete>
        <el-button type="primary" icon="el-icon-search"  class="pull-left" @click="searchDev"></el-button>
    </div>
    
    <el-amap class="amap-box" vid="map" :zoom="zoom" :center="center" :plugin="plugin" >
        <el-amap-marker vid="marker"  v-for="(marker,index) in markers"  :key="index" :position="marker.position" :visible="true" :draggable="false" :icon="marker.icon" :events="marker.events" :isHotspot="open"></el-amap-marker>
        <!-- <el-amap-info-window v-if="window" :position="windows[0].position" :visible="windows[0].visible" :content="windows[0].content" :offset="windows[0].offset" ></el-amap-info-window> -->
          <el-amap-info-window v-if="window" :position="window.position" :visible="window.visible" :content="window.content" :offset="window.offset" ></el-amap-info-window>
    </el-amap>
    
  </div>
</template>

<script>
import Vue from 'vue';
import VueAMap from 'vue-amap';
Vue.use(VueAMap);

export default {
    data () {
        return {
            zoom: 15,
            center: [120.275177, 30.201746],
            open: true,
            markerGroups: [
                {
                    position: [120.28316, 30.2363],
                    content: '设备1号',
                    offset: [10, 12],
                    icon: '../../../static/images/eletricity-online.png',
                    commaddress: '18001'

                },
                {
                    position: [120.275177, 30.201746],
                    content: '设备2号',
                    offset: [10, 12],
                    icon: '../../../static/images/eletricity-alarm.png',
                    commaddress: '18002'
                    // events: {
                    //     click: () => {
                    //         this.windows[1].visible = !this.windows[1].visible;
                    //     }
                    // }
                    //  dragend: (e) => {
                    //         this.markers[0].position = [e.lnglat.lng, e.lnglat.lat]
                    // }

                },
                {
                    position: [120.273794, 30.20058],
                    content: '设备3号',
                    offset: [10, 12],
                    icon: '../../../static/images/eletricity-outline.png',
                    commaddress: '18003'

                },
                {
                    position: [120.271794, 30.20058],
                    content: '设备4号',
                    offset: [10, 12],
                    icon: '../../../static/images/safe-online.png',
                    commaddress: '18003'

                },
                {
                    position: [120.280794, 30.20158],
                    content: '设备5号',
                    offset: [10, 12],
                    icon: '../../../static/images/safe-outline.png',
                    commaddress: '18003'

                },
                {
                    position: [120.280094, 30.20158],
                    content: '设备6号',
                    offset: [10, 12],
                    icon: '../../../static/images/safe-alarm.png',
                    commaddress: '18003'

                },
                {
                    position: [120.277094, 30.20158],
                    content: '设备7号',
                    offset: [10, 12],
                    icon: '../../../static/images/eletricity-outline.png',
                    commaddress: '18003'

                },
                {
                    position: [120.270094, 30.20008],
                    content: '设备8号',
                    offset: [10, 12],
                    icon: '../../../static/images/eletricity-outline.png',
                    commaddress: '18003'

                },
                {
                    position: [120.276112, 30.197751],
                    content: '测试设备1',
                    offset: [10, 12],
                    icon: '../../../static/images/eletricity-online.png',
                    commaddress: '18004'
                },
                {
                    position: [120.275112, 30.198751],
                    content: '测试设备2',
                    offset: [10, 12],
                    icon: '../../../static/images/environment-online.png',
                    commaddress: '18005'
                },
                {
                    position: [120.296112, 30.197751],
                    content: '测试设备3',
                    offset: [10, 12],
                    icon: '../../../static/images/environment-outline.png',
                    commaddress: '18007'
                },
                {
                    position: [120.277772, 30.200051],
                    content: '测试设备4',
                    offset: [10, 12],
                    icon: '../../../static/images/environment-alarm.png',
                    commaddress: '18007'
                }
            ],
            searchOption: {
                city: '全国',
                citylimit: true

            },
            mapCenter: [120.275177, 30.201746],
            markers: [],
            windows: [],
            window: '',
            plugin: [
                {
                    pName: 'ToolBar', // 工具条插件
                    position: 'RB'
                }
                // {
                //     pName: 'MapType', // 卫星与地图切换
                //     defaultType: 0
                // },
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
        this.getWindows();
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
            let list = [{}];
            this.markerGroups.forEach(function (item, i) {
                if (item.content.indexOf(queryString) != -1) {
                    list.push({'value': item.content});
                    list.push({'label': item.position});
                }
            });
            if (!queryString) {
                list = list.splice(0, 7);
            }
            cb(list);
        },
        selectSearch (item) {
            let that = this;
            that.state = item.value;
        },
        searchDev () {
            let that = this;
            this.markerGroups.forEach(function (k, i) {
                if (that.state == k.content) {
                    that.center = k.position;
                    // console.log("windows",that.windows.commaddress)
                    that.windows.forEach((window) => {
                        window.visible = false;
                        if (k.commaddress == window.commaddress) {
                            //   console.log(window.commaddress, window.visible)
                            window.visible = true;
                            //    console.log("1",window.commaddress, window.visible)
                        }
                    });
                }
            });
        },
        getWindows () {
            let markers = [];
            let windows = [];
            let that = this;
            this.markerGroups.forEach((item, index) => {
                markers.push({
                    position: item.position,
                    icon: item.icon,
                    offset: item.offset,
                    content: item.content,
                    events: {
                        // click(){
                        //     that.windows.forEach(window => {
                        //         window.visible = false;
                        //     });
                        //     that.window = that.windows[index];
                        //     that.$nextTick(() => {
                        //     that.window.visible = true;
                        //         });
                        // },
                        mouseover () {
                            that.windows.forEach(window => {
                                window.visible = false;
                            });
                            that.window = that.windows[index];
                            that.$nextTick(() => {
                                that.window.visible = true;
                            });
                        },
                        mouseout () {
                            that.windows.forEach(window => {
                                window.visible = false;
                            });
                        }
                    }
                });

                windows.push({
                    position: item.position,
                    commaddress: item.commaddress,
                    visible: false,
                    offset: [0, -30],
                    isCustom: true,
                    content: `<div class="map-inner">
                        <h1>` + this.$t('GISmap.deviceInfo') + `</h1>
                        <div class="map-table" >
                        <span>
                            <ul class="cloum">
                            <li>` + this.$t('common.deviceName') + `</li>
                            <li>` + this.$t('GISmap.deviceOrder') + `</li>
                            <li class="last-li">` + this.$t('GISmap.IP') + `</li>
                            </ul>
                        </span>
                        <span>
                            <ul class="cloum">
                                <li>` + item.content + `</li>
                                <li>` + item.commaddress + `</li>
                                <li class="last-li">47.98.43.237</li>
                            </ul>
                        </span>
                           <div class="map-img pull-right">
                              <img src="../../../static/images/alarm.png" />
                              <p class="map-alarm">异常</p>
                            </div>
                        </div>
                        </div>`
                });
            });
            this.markers = markers;
            this.windows = windows;
        }

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
      box-shadow: 0 0 10px rgba(102, 102, 102, 0.15);
      .el-input__inner {
          border: none;
          border-radius: 4px 0 0 4px;
      }
      .el-button {
          border: none;
          border-radius: 0 4px 4px 0;
          height: 40px;
      }
    }
  
  .map-inner {
      h1 {
          font-size: 18px;
          padding: 10px 0;
      }
      .map-table {
          border: 1px solid rgb(238,238,238);
          font-size: 14px;
          margin-top: 5px;
          span {
              display: inline-block;
             
          }
         img { 
             width: 50px;
             height: 50px;
              }
          .map-img {
              padding: 10px;
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
                  padding: 10px;
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
