<template>
  <div id="wisdomEletricity">
     <el-row  :gutter="20">
        <el-col :span="5" class="dev_statistics">
          <div class="statistics">
            <p class="title">{{ $t('realtimeMonitor.devStatistics')}}</p>
            <div class="nums">
              <div class="nums_left pull-left">
                <div class="nums_left_top">
                  <p>{{ $t('realtimeMonitor.totalNum')}}</p>
                  <p><span class="special_num">109</span>个</p>
                </div>
                <div class="nums_left_bottom">
                  <p>{{ $t('realtimeMonitor.onlineNum')}}</p>
                  <p><span class="special_num">108</span>个</p>
                </div>
              </div>
              <div class="nums_right pull-right">
                <el-progress type="circle" :percentage="91.5" :height="110" :width="110" color="rgb(45,134,225)">
                </el-progress>
                <span class="progress_text">{{ $t('realtimeMonitor.onlineRatio')}}</span>
              </div>
            </div>
          </div>
          <div class="locations">
             <p class="title">{{ $t('realtimeMonitor.devDistribution')}}</p>
             <div class="chart">
                <ve-bar :data="chartData1" :settings="chartSettings1" :extend="chartExtend1" :colors="chartColor" height="100%" :legend-visible="false" :tooltip-visible="false"></ve-bar>
             </div>
          </div>
        </el-col>
        <el-col :span="13" class="dev_map">
           <el-amap class="amap-box" vid="map" :zoom="zoom" :center="center"></el-amap>
        </el-col>
        <el-col :span="6" class="alarm_statistics">
          <div class="alarm_statistics_top">
            <p class="title">{{ $t('realtimeMonitor.alarmStatistics')}}</p>
            <ul class="times">
              <li>
                <p>{{ $t('realtimeMonitor.totalTimes')}}</p>
                <p><span class="specical">136</span>{{ $t('realtimeMonitor.ci')}}</p>
              </li>
              <li>
                <p>{{ $t('realtimeMonitor.todayTimes')}}</p>
                <p><span class="specical">0</span>{{ $t('realtimeMonitor.ci')}}</p>
              </li>
              <li>
                <p>{{ $t('realtimeMonitor.yesterdayTimes')}}</p>
                <p><span class="specical">1</span>{{ $t('realtimeMonitor.ci')}}</p>
              </li>
            </ul>
            <div class="table">
              <el-table
                  :data="tableData"
                  :label="'....\n....'"
                  :header-cell-style="{background:'#2987E2',color:'#fff'}"
                  style="width: 100%;font-size: 0.18rem">
                  <el-table-column
                    prop="title"
                    :label="$t('common.deviceName')"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    :label="$t('realtimeMonitor.installAddress')"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="type"
                    :label="$t('realtimeMonitor.alarmTypa')"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="time"
                    :label="$t('realtimeMonitor.alarmTime')"
                    >
                  </el-table-column>
                </el-table>
            </div>
          </div>
           <div class="alarm_statistics_bottom">
            <p class="title">{{$t('realtimeMonitor.alarmRatio')}}</p>
            <div class="chart">
              <ve-ring :data="chartData" height="100%"  :colors="color" :extend="chartExtend" :legend-visible="false" :judge-width="true"></ve-ring>
            </div>
          </div>
        </el-col>
     </el-row>
  </div>
</template>

<script>
import Vue from 'vue';
import VueAMap from 'vue-amap';
Vue.use(VueAMap);

export default {
    name: 'wisdomEletricity',
    data () {
        this.chartSettings1 = {
            dimension: ['位置'],
            metrics: ['数量']
        };
        return {
            zoom: 15,
            center: [120.270374, 30.168244],
            tableData: [{
                title: '20180614',
                address: '位置1',
                type: '过压',
                time: '2019-02-12 \n 16:03:48'
            }, {
                title: '20180614',
                address: '位置1',
                type: '补光灯运作超时',
                time: '2019-02-12 \n 16:03:48'
            }, {
                title: '20180614',
                address: '位置1',
                type: '过压',
                time: '2019-02-12 \n 16:03:48'
            }, {
                title: '20180614',
                address: '位置1',
                type: '过压',
                time: '2019-02-12 \n 16:03:48'
            }, {
                title: '20180614',
                address: '位置1',
                type: '过压',
                time: '2019-02-12 \n 16:03:48'
            }, {
                title: '20180614',
                address: '位置1',
                type: '过压',
                time: '2019-02-12 \n 16:03:48'
            }],
            color: ['#2987E2', '#88CFFA', '#00C0FF', '#88CFEC', '#1891FF', '#0560B5', '#126CC1'],
            chartData: {
                columns: ['位置', '告警数量'],
                rows: [
                    { '位置': '位置一', '告警数量': 1393 },
                    { '位置': '位置二', '告警数量': 3530 },
                    { '位置': '位置三', '告警数量': 2923 },
                    { '位置': '位置四', '告警数量': 1723 },
                    { '位置': '位置五', '告警数量': 3792 },
                    { '位置': '位置六', '告警数量': 4593 },
                    { '位置': '位置七', '告警数量': 1200 }
                ]

            },
            chartExtend: {
                grid: {
                    bottom: 0,
                    top: 0
                },
                series: {
                    center: ['50%', '52%'],
                    label: {
                        normal: {
                            show: true,
                            formatter: '{b}\n{d}%',
                            textStyle: {
                                color: 'rgb(153,153,153)'
                            }
                        }
                    }
                }
            },
            chartData1: {
                columns: ['位置', '数量'],
                rows: [
                    { '位置': '位置A', '数量': 1393},
                    { '位置': '位置B', '数量': 3530},
                    { '位置': '位置C', '数量': 2923},
                    { '位置': '位置D', '数量': 1723},
                    { '位置': '位置E', '数量': 3792},
                    { '位置': '位置F', '数量': 4593},
                    { '位置': '位置D', '数量': 1723},
                    { '位置': '位置E', '数量': 3792},
                    { '位置': '位置F', '数量': 4593}
                ]
            },
            chartExtend1: {
                barWidth: 15,
                series: {
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                position: 'right',
                                textStyle: {
                                    color: '#000'
                                }
                            },
                            barBorderRadius: 8
                        }
                    }
                },
                grid: {
                    top: 0,
                    left: 0,
                    bottom: 0
                },
                xAxis: {
                    show: false
                }
                // 'yAxis.0.axisLabel.rotate':-45,
                // 'grid.left':'8%',
            },
            chartColor: ['#F2D97A']

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
                'AMap.Geolocation' // 定位控件，用来获取和展示用户主机所在的经纬度位置
            ],
            v: '1.4.4',
            uiVersion: '1.0.11'
        });
    },
    mounted () {

    },
    methods: {}
};
</script>

<style lang='scss' scope>
#wisdomEletricity {
  padding: 10px;
  background-color: #f5f5f5;
  .dev_statistics {
    box-sizing: border-box;
    height: 87.3vh;
    background-color: #fff;
    .statistics {
      padding: 10px;
      height: 30%;
      border-bottom: 1px solid #f5f5f5;
      box-sizing: border-box;
      background-color: #fff;
      .title {
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 0.5rem;
        font-family:Microsoft YaHei;
      }
      .nums {
        font-size: 0.18rem;
       .nums_left {
          width: 50%;
       }
       .nums_right {
          width: 50%;
          position: relative;
          .progress_text {
            width: 110px;
            position: absolute;
            top: 34%;
            left: 0;
            text-align: center;
          }
          .el-progress__text {
            font-size: 0.393rem!important;
            top: 70%;
          }
       }
        .special_num {
          font-size: 0.533rem;
        }
        .nums_left_bottom {
          margin-top: 0.2rem;
        }
      }
    }
    .locations {
      padding: 10px;
      padding-bottom: 0;
      height: 67%;
      background-color: #fff;
      .title {
        font-size: 18px;
        font-weight: 700;
        // margin-bottom: 0.3rem;
      }
      .chart {
        height: 94%;
      }
      .progress_num {
        display: inline-block;
        width: 80%;
        position: relative;
        .progress_total {
        position: absolute;
        left:37.8%;
        top:-4px;
       }
      }
      
      ul {
        display: flex;
        flex-direction: column;
        height: 93%;
        li {
          flex: 1;
          .progress_num {
            .el-progress-bar__outer {
              background-color: #fff!important;
            }
          }
         
        }
      }
    }
  }
  .dev_map {
    box-sizing: border-box;
    height: 87.3vh;
  }
  .alarm_statistics { 
    box-sizing: border-box;
    height: 87.3vh;
    background-color: #fff;
    .alarm_statistics_top {
      height: 57%;
      background-color: #fff;
      // border-bottom: 10px solid #f5f5f5;
      .title {
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 0.5rem;
        padding-top: 10px;
        padding-left: 10px;
      }
      .times {
        display: flex;
        padding-left: 10px;
        li {
          flex: 1;
          p {
            font-size: 0.18rem;
            .specical {
              font-size: 0.533rem;
            }
          }
          
        }
      }
      .table {
        .el-table__body tr,
          .el-table__body td {
            padding: 0;
            height: 0.6rem;
        }
        .el-table .cell {
          line-height:1.6!important;
          text-align: center;
          white-space: pre-line;
          
        }
        .el-table::before {
          display: none;
        }
        .el-table--border::after, .el-table--group::after, .el-table::before {
          display: none;
        }
       
      }
      .el-table thead {
        background-color: #2987E2;
      }
    }

    .alarm_statistics_bottom {
      height: 43%;
      // margin-top: 10px;
      background-color: #FFF;
      padding: 10px;
      box-sizing: border-box;
      .title {
        font-size: 18px;
        font-weight: 700;
      }
      .chart {
        height: 94%;
        .ve-ring {
          height: 100%;
        }
      }
    }
  }
}
</style>
