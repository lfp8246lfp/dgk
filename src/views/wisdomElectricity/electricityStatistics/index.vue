<template>
  <div class="alarmStatistics">
   <div class="alarmStatistics_top">
      <el-select v-model="value" :placeholder="$t('common.pleaseSelect')">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
       <el-select v-model="value1" :placeholder="$t('common.pleaseSelect')">
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button type="primary">{{$t('common.query')}}</el-button>
    </div>
    <div class="alarm_rate">
       <el-row  :gutter="10" class="alarm_rate_content">
          <el-col :span="8">
            <div class="alarm_occur_rate">
              <p class="title">{{$t('alarmStatistics.alarmOccur')}}</p>
              <div class="chart"> 
                  <ve-ring :data="chartData" height="100%"  :colors="color" :judge-width="true" :extend="chartExtend"></ve-ring>    
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="alarm_distribute_rate">
              <p class="title">{{$t('alarmStatistics.alarmDistribution')}}</p>
              <div class="chart"> 
                  <ve-ring :data="chartData1" height="100%"  :colors="color1" :judge-width="true" :extend="chartExtend"></ve-ring>    
              </div>
            </div>
          </el-col>
          <el-col :span="8" >
            <div class="alarm_deal_rate">
              <p class="title">{{$t('alarmStatistics.alarmDeal')}}</p>
              <div class="chart"> 
                  <ve-ring :data="chartData2" height="100%"  :colors="color" :judge-width="true" :extend="chartExtend"></ve-ring>    
              </div>
            </div>
          </el-col>
       </el-row>
    </div>
    <div class="alarm_type_rate">
      <p class="title">{{$t('alarmStatistics.alarmType')}}</p>
      <div class="chart"> 
          <ve-ring :data="chartData3" height="100%"  :colors="color1" :judge-width="true" :extend="chartExtend"></ve-ring>    
      </div>
    </div>
    <div class="alarm_table">
       <el-row  :gutter="10" class="alarm_table_content">
         <el-col :span="12">
           <div class="alarm_table_left">
             <p class="title">{{$t('alarmStatistics.frequentFailure')}}</p>
              <el-table
                :data="tableData"
                border
                :header-cell-style="{background:'#F2F2F2',color:'rgb(51,51,51)'}"
                style="width: 100%;font-size:14px">
                <el-table-column
                  prop="date"
                  :label="$t('common.deviceName')"
                 >
                </el-table-column>
                <el-table-column
                  prop="name"
                  :label="$t('alarmStatistics.devOrder')"
                 >
                </el-table-column>
                <el-table-column
                  prop="address"
                  :label="$t('alarmStatistics.addressIP')">
                </el-table-column>
                <el-table-column
                  prop="address"
                  :label="$t('alarmStatistics.installAddress')">
                </el-table-column>
              </el-table>
           </div>
         </el-col>
          <el-col :span="12">
           <div class="alarm_table_right">
             <p class="title">{{$t('alarmStatistics.unresolvedError')}}</p>
              <el-table
                :data="tableData"
                border
                :header-cell-style="{background:'#F2F2F2',color:'rgb(51,51,51)'}"
                style="width: 100%;font-size: 14px">
                <el-table-column
                  prop="date"
                   :label="$t('common.deviceName')"
                 >
                </el-table-column>
                <el-table-column
                  prop="name"
                  :label="$t('alarmStatistics.devOrder')"
                 >
                </el-table-column>
                <el-table-column
                  prop="address"
                  :label="$t('alarmStatistics.addressIP')">
                </el-table-column>
                <el-table-column
                  prop="address"
                  :label="$t('alarmStatistics.installAddress')">
                </el-table-column>
              </el-table>
           </div>
         </el-col>
       </el-row>
    </div>
  </div>
</template>

<script>
export default {

    name: '',
    data () {
        return {
            options: [
                {
                    value: 'option1',
                    label: this.$t('alarmStatistics.byMonth')
                },
                {
                    value: 'option2',
                    label: this.$t('alarmStatistics.byArea')
                }
            ],
            value: '',
            options1: [
                {
                    value: 'Jan',
                    label: '1月'
                },
                {
                    value: 'Feb',
                    label: '2月'
                },
                {
                    value: 'Mar',
                    label: '3月'
                },
                {
                    value: 'Apr',
                    label: '4月'
                },
                {
                    value: 'May',
                    label: '5月'
                },
                {
                    value: 'Jun',
                    label: '6月'
                },
                {
                    value: 'July',
                    label: '7月'
                }

            ],
            value1: '',
            chartData: {
                columns: ['告警类型', '告警数量'],
                rows: [
                    { '告警类型': '告警数量', '告警数量': 30 },
                    { '告警类型': '未告警数量', '告警数量': 300 }
                ]
            },
            color: ['#88CFFA', '#0560B5'],
            chartExtend: {
                grid: {
                    bottom: 0,
                    top: 0
                },
                series: {
                    center: ['50%', '52%'],
                    label: {
                        normal: {
                            show: false
                        }
                    }
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    top: '10px'
                }

            },
            chartData1: {
                columns: ['地区', '告警数量'],
                rows: [
                    { '地区': '萧山区', '告警数量': 30 },
                    { '地区': '江北区', '告警数量': 120 },
                    { '地区': '堇州区', '告警数量': 300 },
                    { '地区': '奉化区', '告警数量': 600 },
                    { '地区': '镇海区', '告警数量': 400 }
                ]
            },
            color1: ['#88CFFA', '#00C0FF', '#88CFEC', '#1891FF', '#0560B5', '#126CC1', '#2987E2'],
            chartData2: {
                columns: ['告警类型', '告警数量'],
                rows: [
                    { '告警类型': '未处理告警', '告警数量': 130 },
                    { '告警类型': '已处理告警', '告警数量': 300 }
                ]
            },
            chartData3: {
                columns: ['告警类型', '告警数量'],
                rows: [
                    { '告警类型': '类型1', '告警数量': 2 },
                    { '告警类型': '类型2', '告警数量': 2 },
                    { '告警类型': '类型3', '告警数量': 4 },
                    { '告警类型': '类型4', '告警数量': 4 },
                    { '告警类型': '类型5', '告警数量': 3 },
                    { '告警类型': '类型6', '告警数量': 1 },
                    { '告警类型': '类型7', '告警数量': 3 },
                    { '告警类型': '类型8', '告警数量': 2 },
                    { '告警类型': '类型9', '告警数量': 2 },
                    { '告警类型': '类型10', '告警数量': 2 },
                    { '告警类型': '类型11', '告警数量': 2 },
                    { '告警类型': '类型12', '告警数量': 2 }

                ]
            },
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '华瑞中心'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '华瑞中心'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '华瑞中心'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '华瑞中心'
            }]

        };
    },

    methods: {}
};
</script>

<style lang='scss' scope>
  .alarmStatistics {
    .alarmStatistics_top {
      padding-left: 10px;
      height: 80px;
      line-height:80px;
      background-color: #fff;
      box-sizing: border-box;
      .el-input {
      width: 217px;
      margin-right: 10px;
      }
    }
    .alarm_rate {
      padding: 10px;
      padding-left: 12px;
      .alarm_rate_content {
        .alarm_occur_rate {
          background-color: #fff;
          height: 4.5rem;
          padding: 10px;
          box-sizing: border-box;
          .chart {
            height: 4rem;
            
          }
        }
        .alarm_distribute_rate {
          background-color: #fff;
          height: 4.5rem;
          padding: 10px;
          box-sizing: border-box;
          .chart {
            height: 4rem;
          }
        }
        .alarm_deal_rate {
          background-color: #fff;
          height: 4.5rem;
          padding: 10px;
          box-sizing: border-box;
           .chart {
            height: 4rem;
          }
        }
         .title {
           font-size: 18px;
           color: #000;
           font-weight: 700;
         }
      }
    }
    .alarm_type_rate {
      background-color: #fff;
      margin: 0 10px;
      height: 5.6rem;
      padding: 10px;
      .title {
          font-size: 18px;
          color: #000;
          font-weight: 700;
      }
      .chart {
        height: 5.1rem;
      }
    }
    .alarm_table {
      padding: 10px;
      .alarm_table_content {
        .alarm_table_left {
          // height: 4.39rem;
          background-color: #fff;
          padding: 10px;
          box-sizing: border-box;           
        }
         .alarm_table_right {
          // height: 4.39rem;
          background-color: #fff;
          padding: 10px;
          box-sizing: border-box;
        }
        .title {
            font-size: 18px;
            color: #000;
            font-weight: 700;
            margin-bottom: 10px;
          }
      }
    }
  }
</style>
