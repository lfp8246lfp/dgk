<template>
  <div class="waterLoop">
    <div class="electricityLoop_search">
      <el-date-picker
        v-model="timeVal"
        type="date"
        :placeholder="$t('electricityLoop.pickAday')">
      </el-date-picker>
       <el-button type="primary">{{$t('common.query')}}</el-button>
    </div>

    <div class="electricityLoop_chart">
        <p class="clearfix">
           <span class="pull-left title">{{$t('waterLoop.regionalLooopWaterStatistics')}}</span>
           <el-radio-group v-model="radioVal" class="pull-right radio">
              <el-radio-button :label="$t('waterLoop.today')">{{$t('waterLoop.today')}}</el-radio-button>
              <el-radio-button :label="$t('waterLoop.thisMonth')">{{$t('waterLoop.thisMonth')}}</el-radio-button>
            </el-radio-group>
        </p>
        <ve-histogram :data="chartData" :settings="chartSettings" :extend="chartExtend" :colors="barColors"></ve-histogram>
    </div>

    <div class="electricityLoop_table">
        <p class="clearfix">
          <span class="pull-left title">{{$t('waterLoop.regionalLoopWaterList')}}</span>
          <el-dropdown class="pull-right icon">
              <span class="el-dropdown-link">
                <i class="fa fa-upload" aria-hidden="true"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>{{$t('common.exportExcel')}}</el-dropdown-item>
                <el-dropdown-item>{{$t('electricityLoop.exportPDF')}}</el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown>
        </p>
        <div class="table">
           <el-table   
              :data="tableData"
              border
              :header-cell-style="{background:'#F2F2F2',color:'rgb(51,51,51)'}"
              style="width: 100%;font-size: 14px">
              <el-table-column
                prop="num"
                :label="$t('common.serialNum')"
                width="100">
              </el-table-column>
              <el-table-column
                prop="areaName"
                 :label="$t('electricityLoop.areaName')">
              </el-table-column>
              <el-table-column
                prop="superior"
                :label="$t('electricityLoop.affiliation')">
              </el-table-column>
              <el-table-column
                prop="todayElectricity"
                :label="$t('waterLoop.todayWater')">
              </el-table-column>
              <el-table-column
                prop="yesterdayElectricity"
                :label="$t('waterLoop.yesterdayWater')">
              </el-table-column>
              <el-table-column
                prop="thisMon"
                :label="$t('waterLoop.thisMonthWater')">
              </el-table-column>
              <el-table-column
                prop="lastMon"
                :label="$t('waterLoop.lastMonthWater')">
              </el-table-column>
              <el-table-column
                prop="loopElectricity"
                 :label="$t('waterLoop.loopWater')">
              </el-table-column>
            
          </el-table> 
        </div>
          
        <div class="pagination clearfix">
           <el-pagination
              class="pull-right"
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="10"
              layout=" prev, pager, next, sizes"
              :total="100">
          </el-pagination>
        
        </div> 
    </div>
  
  </div>
</template>

<script>
export default {
    name: '',

    data () {
        this.chartSettings = {
            metrics: ['本月', '上月', '环比'],
            dimension: ['区域']
        };
        return {
            timeVal: '',
            chartData: {
                columns: ['区域', '本月', '上月', '环比'],
                rows: [
                    { '区域': '区域A', '本月': 8, '上月': 11, '环比': -2 },
                    { '区域': '区域A', '本月': 6, '上月': 11, '环比': -3 },
                    { '区域': '区域A', '本月': 11, '上月': 8, '环比': 2 },
                    { '区域': '区域A', '本月': 9, '上月': 11, '环比': -1 },
                    { '区域': '区域A', '本月': 4, '上月': 11, '环比': -4 },
                    { '区域': '区域A', '本月': 8, '上月': 11, '环比': -2 },
                    { '区域': '区域A', '本月': 6, '上月': 11, '环比': -3 },
                    { '区域': '区域A', '本月': 11, '上月': 8, '环比': 2 },
                    { '区域': '区域A', '本月': 9, '上月': 11, '环比': -1 },
                    { '区域': '区域A', '本月': 4, '上月': 11, '环比': -4 },
                    { '区域': '区域A', '本月': 8, '上月': 11, '环比': -2 },
                    { '区域': '区域A', '本月': 6, '上月': 11, '环比': -3 },
                    { '区域': '区域A', '本月': 11, '上月': 8, '环比': 2 },
                    { '区域': '区域A', '本月': 9, '上月': 11, '环比': -1 },
                    { '区域': '区域A', '本月': 4, '上月': 11, '环比': -4 }

                ]
            },
            chartExtend: {
                barWidth: 15,
                series: {
                    center: ['50%', '60%']
                }
            },
            barColors: ['#1191FF', '#126CC1', '#FFCD66'],
            tableData: [{
                num: 1,
                areaName: '区域A',
                superior: '上级a',
                todayElectricity: 0.32,
                yesterdayElectricity: 0.22,
                thisMon: 9.8,
                lastMon: 10.8,
                loopElectricity: -0.1
            }, {
                num: 1,
                areaName: '区域A',
                superior: '上级a',
                todayElectricity: 0.32,
                yesterdayElectricity: 0.22,
                thisMon: 9.8,
                lastMon: 10.8,
                loopElectricity: -0.1
            }, {
                num: 1,
                areaName: '区域A',
                superior: '上级a',
                todayElectricity: 0.32,
                yesterdayElectricity: 0.22,
                thisMon: 9.8,
                lastMon: 10.8,
                loopElectricity: -0.1
            }, {
                num: 1,
                areaName: '区域A',
                superior: '上级a',
                todayElectricity: 0.32,
                yesterdayElectricity: 0.22,
                thisMon: 9.8,
                lastMon: 10.8,
                loopElectricity: -0.1
            }, {
                num: 1,
                areaName: '区域A',
                superior: '上级a',
                todayElectricity: 0.32,
                yesterdayElectricity: 0.22,
                thisMon: 9.8,
                lastMon: 10.8,
                loopElectricity: -0.1
            }, {
                num: 1,
                areaName: '区域A',
                superior: '上级a',
                todayElectricity: 0.32,
                yesterdayElectricity: 0.22,
                thisMon: 9.8,
                lastMon: 10.8,
                loopElectricity: -0.1
            }, {
                num: 1,
                areaName: '区域A',
                superior: '上级a',
                todayElectricity: 0.32,
                yesterdayElectricity: 0.22,
                thisMon: 9.8,
                lastMon: 10.8,
                loopElectricity: -0.1
            }, {
                num: 1,
                areaName: '区域A',
                superior: '上级a',
                todayElectricity: 0.32,
                yesterdayElectricity: 0.22,
                thisMon: 9.8,
                lastMon: 10.8,
                loopElectricity: -0.1
            }, {
                num: 1,
                areaName: '区域A',
                superior: '上级a',
                todayElectricity: 0.32,
                yesterdayElectricity: 0.22,
                thisMon: 9.8,
                lastMon: 10.8,
                loopElectricity: -0.1
            }, {
                num: 1,
                areaName: '区域A',
                superior: '上级a',
                todayElectricity: 0.32,
                yesterdayElectricity: 0.22,
                thisMon: 9.8,
                lastMon: 10.8,
                loopElectricity: -0.1
            }
            ],
            currentPage: 1,
            radioVal: '当月'
        };
    },

    methods: {
        handleSizeChange (val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange (val) {
            console.log(`当前页: ${val}`);
        }
    }
};
</script>

<style lang='scss' scope>
  .waterLoop {
    padding-bottom: 20px;
    // .el-table td, .el-table th  {
    //     padding: 8px 0;
    //   }
    .electricityLoop_search {
      background-color: #fff;
      padding-left: 10px;
      height: 80px;
      line-height:80px;
      .el-button {
        margin-left: 10px;
      }
    }
    .electricityLoop_chart {
      background-color: #fff;
      height: 6rem;
      margin: 10px;
      padding: 20px 10px 10px 10px;
      p {
        .title {
        font-weight: 700;
        font-size: 18px;
       }
       .el-radio-button__inner {
          padding: 6px 9px;
          font-size: 14px;
        }
      }
      
    }
    .electricityLoop_table {
        padding: 10px;
        background-color: #fff;
        margin: 10px;
        p {
          .title {
              font-weight: 700;
              font-size: 18px;
              }
          .icon {
            display: inline-block;
            width: 25px;
            height: 25px;
            border-radius: 5px;
            line-height: 25px;
            background-color: rgb(236,243,252);
            text-align: center;
            .fa-upload {
              color: rgb(24,144,255);
              font-size: 7px;
            }
          }
        }
       
        .table {
          margin: 20px 0 30px 0 ;
          
        }
    }
    .el-select-dropdown .el-popper {
            transform-origin: center bottom 0px!important;
          }
  }
</style>

