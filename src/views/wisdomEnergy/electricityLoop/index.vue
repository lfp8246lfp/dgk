<template>
  <div class="electricityLoop">
    <div class="electricityLoop_search">
      <el-date-picker v-model="timeVal" type="date" :placeholder="$t('electricityLoop.pickAday')"></el-date-picker>
      <el-button type="primary">{{$t('common.query')}}</el-button>
    </div>

    <div class="electricityLoop_chart">
      <p class="title">{{$t('electricityLoop.regionalLoopPowerStatistics')}}</p>

      <ve-histogram
        :data="chartData"
        :settings="chartSettings"
        :extend="chartExtend"
        :colors="barColors"
      ></ve-histogram>
    </div>

    <div class="electricityLoop_table">
       <p class="clearfix">
          <span class="pull-left title">{{$t('electricityLoop.regionalLoopPowerList')}}</span>
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
      <!-- <p class="title">区域环比用电量列表</p> -->
     
      <div class="table">
        <el-table
          :data="tableData"
          border
          :header-cell-style="{background:'#F2F2F2',color:'rgb(51,51,51)'}"
          style="width: 100%;font-size: 14px"
        >
          <el-table-column prop="num" :label="$t('common.serialNum')" width="100"></el-table-column>
          <el-table-column prop="areaName" :label="$t('electricityLoop.areaName')"></el-table-column>
          <el-table-column prop="superior" :label="$t('electricityLoop.affiliation')"></el-table-column>
          <el-table-column prop="todayElectricity" :label="$t('electricityLoop.todayPower')"></el-table-column>
          <el-table-column prop="yesterdayElectricity" :label="$t('electricityLoop.yesterdayPower')"></el-table-column>
          <el-table-column prop="thisMon" :label="$t('electricityLoop.thisMonthPower')"></el-table-column>
          <el-table-column prop="lastMon" :label="$t('electricityLoop.lastMonthPower')"></el-table-column>
          <el-table-column prop="loopElectricity" :label="$t('electricityLoop.loopPower')"></el-table-column>
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
          x-placement="top-start"
          :total="100"
        ></el-pagination>
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
                    { 区域: '区域A', 本月: 8, 上月: 11, 环比: -2 },
                    { 区域: '区域A', 本月: 6, 上月: 11, 环比: -3 },
                    { 区域: '区域A', 本月: 11, 上月: 8, 环比: 2 },
                    { 区域: '区域A', 本月: 9, 上月: 11, 环比: -1 },
                    { 区域: '区域A', 本月: 4, 上月: 11, 环比: -4 },
                    { 区域: '区域A', 本月: 8, 上月: 11, 环比: -2 },
                    { 区域: '区域A', 本月: 6, 上月: 11, 环比: -3 },
                    { 区域: '区域A', 本月: 11, 上月: 8, 环比: 2 },
                    { 区域: '区域A', 本月: 9, 上月: 11, 环比: -1 },
                    { 区域: '区域A', 本月: 4, 上月: 11, 环比: -4 },
                    { 区域: '区域A', 本月: 8, 上月: 11, 环比: -2 },
                    { 区域: '区域A', 本月: 6, 上月: 11, 环比: -3 },
                    { 区域: '区域A', 本月: 11, 上月: 8, 环比: 2 },
                    { 区域: '区域A', 本月: 9, 上月: 11, 环比: -1 },
                    { 区域: '区域A', 本月: 4, 上月: 11, 环比: -4 }
                ]
            },
            chartExtend: {
                // title:{
                //     text: '区域环比用电量统计图(kWh)'
                //   },
                barWidth: 15,
                series: {
                    center: ['50%', '60%']
                }
            },
            barColors: ['#1191FF', '#126CC1', '#FFCD66'],
            tableData: [
                {
                    num: 1,
                    areaName: '区域A',
                    superior: '上级a',
                    todayElectricity: 0.32,
                    yesterdayElectricity: 0.22,
                    thisMon: 9.8,
                    lastMon: 10.8,
                    loopElectricity: -0.1
                },
                {
                    num: 1,
                    areaName: '区域A',
                    superior: '上级a',
                    todayElectricity: 0.32,
                    yesterdayElectricity: 0.22,
                    thisMon: 9.8,
                    lastMon: 10.8,
                    loopElectricity: -0.1
                },
                {
                    num: 1,
                    areaName: '区域A',
                    superior: '上级a',
                    todayElectricity: 0.32,
                    yesterdayElectricity: 0.22,
                    thisMon: 9.8,
                    lastMon: 10.8,
                    loopElectricity: -0.1
                },
                {
                    num: 1,
                    areaName: '区域A',
                    superior: '上级a',
                    todayElectricity: 0.32,
                    yesterdayElectricity: 0.22,
                    thisMon: 9.8,
                    lastMon: 10.8,
                    loopElectricity: -0.1
                },
                {
                    num: 1,
                    areaName: '区域A',
                    superior: '上级a',
                    todayElectricity: 0.32,
                    yesterdayElectricity: 0.22,
                    thisMon: 9.8,
                    lastMon: 10.8,
                    loopElectricity: -0.1
                },
                {
                    num: 1,
                    areaName: '区域A',
                    superior: '上级a',
                    todayElectricity: 0.32,
                    yesterdayElectricity: 0.22,
                    thisMon: 9.8,
                    lastMon: 10.8,
                    loopElectricity: -0.1
                },
                {
                    num: 1,
                    areaName: '区域A',
                    superior: '上级a',
                    todayElectricity: 0.32,
                    yesterdayElectricity: 0.22,
                    thisMon: 9.8,
                    lastMon: 10.8,
                    loopElectricity: -0.1
                },
                {
                    num: 1,
                    areaName: '区域A',
                    superior: '上级a',
                    todayElectricity: 0.32,
                    yesterdayElectricity: 0.22,
                    thisMon: 9.8,
                    lastMon: 10.8,
                    loopElectricity: -0.1
                },
                {
                    num: 1,
                    areaName: '区域A',
                    superior: '上级a',
                    todayElectricity: 0.32,
                    yesterdayElectricity: 0.22,
                    thisMon: 9.8,
                    lastMon: 10.8,
                    loopElectricity: -0.1
                },
                {
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
            options: [
                {
                    value: '10',
                    label: '10条/页'
                },
                {
                    value: '20',
                    label: '20条/页'
                },
                {
                    value: '30',
                    label: '30条/页'
                },
                {
                    value: '40',
                    label: '40条/页'
                },
                {
                    value: '50',
                    label: '50条/页'
                }
            ],
            value: '10条/页'
        };
    },

    methods: {
        handleSizeChange (val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange (val) {
            // $('html, body').animate({scrollTop: 100}, 1000);
            console.log(`当前页: ${val}`);
        }
    }
};
</script>

<style lang='scss' scope>
.electricityLoop {
  padding-bottom: 20px;
  .electricityLoop_search {
    background-color: #fff;
    padding-left: 10px;
    box-sizing: border-box;
    height: 80px;
    line-height:  80px;
    .el-button {
      margin-left: 10px;
    }
  }
  .electricityLoop_chart {
    background-color: #fff;
    height: 6rem;
    margin: 10px;
    padding: 20px 10px 10px 10px;
    .title {
      font-weight: 700;
      font-size: 18px;
    }
  }
  .electricityLoop_table {
    padding: 10px;
    // padding-bottom: 30px;
    background-color: #fff;
    margin: 10px;
    margin-bottom: 0;
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
      margin: 20px 0 30px 0;
    }
    
  }

  .clearfix:after {
    display: block;
    clear: both;
    content: "";
    visibility: hidden;
    height: 0;
  }
  .clearfix {
    zoom: 1;
  }
  .el-select-dropdown .el-popper {
    transform-origin: center bottom 0px !important;
  }
}
</style>
