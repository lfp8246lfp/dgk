<template>
  <div class="energyMonitor">
    <el-row>
      <el-col :span="12" style="background:#0266d7;border-right:1px solid #277fe2;">
        <div class="top">
          <img src="../../../../static/images/allele.png" alt />
          <div class="left">
            <h1>{{$t('energyMonitor.totalPowerConsumption')}}</h1>
            <p>18232.1kWh</p>
          </div>
        </div>
      </el-col>
      <el-col :span="12" style="background:#0266d7;">
        <div class="top">
          <img src="../../../../static/images/allwater.png" alt />
          <div class="left">
            <h1>{{$t('energyMonitor.totalWaterConsumption')}}</h1>
            <p>18232.1t</p>
          </div>
        </div>
      </el-col>
    </el-row>
    <ul class="energy-box">
      <li>
        <img src="../../../../static/images/monthele.png" alt />
        <p>1.23kWh</p>
        <span @click="showtable">{{$t('energyMonitor.thisMonthPower')}}</span>
      </li>
      <li>
        <img src="../../../../static/images/lastmonthele.png" alt />
        <p>1.23kWh</p>
        <span>{{$t('energyMonitor.lastMonthPower')}}</span>
      </li>
      <li>
        <img src="../../../../static/images/loopele.png" alt />
        <p>1.23kWh</p>
        <span>{{$t('energyMonitor.loopPower')}}</span>
      </li>
      <li>
        <img src="../../../../static/images/monthwater.png" alt />
        <p>1.23kWh</p>
        <span>{{$t('energyMonitor.thisMonthWater')}}</span>
      </li>
      <li>
        <img src="../../../../static/images/lastmonthwater.png" alt />
        <p>1.23kWh</p>
        <span>{{$t('energyMonitor.lastMonthWater')}}</span>
      </li>
      <li>
        <img src="../../../../static/images/loopwater.png" alt />
        <p>1.23kWh</p>
        <span>{{$t('energyMonitor.loopWater')}}</span>
      </li>
    </ul>
    <el-row :gutter="10" style="margin-top:10px;">
      <el-col :span="6">
        <div class="table">
          <h1>{{$t('energyMonitor.monthlyElectricityConsumptionStatistics')}}</h1>
          <div class="box">
            <ve-line
              :data="chartData"
              height="260px"
              :legend-visible="false"
              :colors="colors"
              :settings="chartSettings"
              :extend="chartExtend"
            ></ve-line>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="table">
          <h1>{{$t('energyMonitor.quarterlyElectricityConsumptionChart')}}</h1>
          <div class="box">
            <ve-histogram
              :data="chartDataT"
              height="260px"
              :legend-visible="false"
              :colors="color"
              :settings="chartSettings"
              :extend="chartExtends"
            ></ve-histogram>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="table">
          <h1>{{$t('energyMonitor.monthlsWaterConsumptionStatistics')}}</h1>
          <div class="box">
            <ve-line
              :data="chartData"
              height="260px"
              :legend-visible="false"
              :colors="colors"
              :settings="chartSettings"
              :extend="chartExtend"
            ></ve-line>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="table">
          <h1>{{$t('energyMonitor.quarterlyWaterConsumptionChart')}}</h1>
          <div class="box">
            <ve-histogram
              :data="chartDataT"
              height="260px"
              :legend-visible="false"
              :colors="color"
              :settings="chartSettings"
              :extend="chartExtends"
            ></ve-histogram>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="10" style="margin-top:10px;">
      <el-col :span="12">
        <div class="table">
          <h1>{{$t('energyMonitor.regionalPowerRatio')}}</h1>
          <div class="box">
            <ve-ring :data="chartDataS" height="244px" :colors="colors" :extend="chartExtendss"></ve-ring>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="table">
          <h1>{{$t('energyMonitor.regionalWaterRatio')}}</h1>
          <div class="box">
            <ve-ring :data="chartDataS" height="244px" :colors="colors" :extend="chartExtendss"></ve-ring>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog :title="contTitle" :visible.sync="Mondialog" width="45%" class="mon-dialog">
      <el-table :data="tableData" style="width: 100%;margin-top: 20px;" border row-key="id">
        <el-table-column prop="date" :label="$t('common.time')"></el-table-column>
        <el-table-column prop="name" :label="$t('energyMonitor.areaName')"></el-table-column>
        <el-table-column prop="name" :label="$t('energyMonitor.PowerConsumption')"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="Mondialog = false">{{$t('common.cancel')}}</el-button>
        <el-button type="primary" @click="Mondialog = false">{{$t('common.yes')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
    name: '',

    data () {
        this.colors = ['#4287ff', '#1bd3b9'];
        this.color = ['#f2d879'];
        this.chartSettings = {
            area: true,
            xAxisType: 'category'
        };
        return {
            chartData: {
                columns: ['日期', '耗电量'],
                rows: [
                    { 日期: '1', 耗电量: 22 },
                    { 日期: '2', 耗电量: 23 },
                    { 日期: '3', 耗电量: 13 },
                    { 日期: '4', 耗电量: 37 },
                    { 日期: '5', 耗电量: 35 },
                    { 日期: '6', 耗电量: 40 },
                    { 日期: '7', 耗电量: 40 },
                    { 日期: '8', 耗电量: 40 },
                    { 日期: '9', 耗电量: 40 },
                    { 日期: '10', 耗电量: 40 },
                    { 日期: '11', 耗电量: 40 },
                    { 日期: '12', 耗电量: 40 }
                ]
            },
            chartDataT: {
                columns: ['日期', '耗电量'],
                rows: [
                    { 日期: '1', 耗电量: 22 },
                    { 日期: '2', 耗电量: 23 },
                    { 日期: '3', 耗电量: 13 },
                    { 日期: '4', 耗电量: 37 }
                ]
            },
            chartDataS: {
                columns: ['日期', '耗电量'],
                rows: [
                    { 日期: '1', 耗电量: 22 },
                    { 日期: '2', 耗电量: 23 },
                    { 日期: '3', 耗电量: 13 },
                    { 日期: '4', 耗电量: 37 }
                ]
            },
            chartExtend: {
                xAxis: {
                    boundaryGap: false
                },
                title: {
                    text: '2019年各月用电量'
                },
                grid: {
                    bottom: 0
                }
            },
            chartExtends: {
                title: {
                    text: '2019年季度用电量'
                },
                grid: {
                    bottom: 0
                },
                barWidth: 15
            },
            chartExtendss: {
                grid: {
                    top: 30,
                    bottom: 10
                },
                legend: {
                    orient: 'vertical',
                    x: 'left'
                },
                series: {
                    center: ['50%', '50%']
                }
            },
            contTitle: '本月耗电量详情',
            Mondialog: false,
            tableData: []
        };
    },
    methods: {
        getMonitor () {

        },
        showtable () {
            this.Mondialog = true;
        }
    }
};
</script>

<style lang='scss' scope>
.energyMonitor {
  padding: 10px;
  .top {
    color: white;
    padding: 0.26rem 0.3rem;
    display: flex;
    line-height: 100%;
    img {
      width: 33px;
      height: 33px;
      display: inline-block;
      vertical-align: middle;
    }
    .left {
      margin-left: 0.24rem;
    }
    h1 {
      font-size: 0.22rem;
      font-weight: normal;
      color: #cce3fe;
    }
    p {
      font-size: 0.3rem;
      margin-top: 0.1rem;
    }
  }
  .table {
    background: #fff;
    h1 {
      font-size: 0.24rem;
      padding: 0.24rem;
      border-bottom: 1px solid #eeeeee;
    }
    .box {
      padding: 0.18rem;
    }
  }
  .energy-box {
    background: #0570e9;
    display: flex;
    justify-content: space-around;
    text-align: center;
    padding: 0.34rem 0;
    p {
      color: white;
      font-size: 0.26rem;
      margin: 0.1rem 0 0.2rem;
    }
    span {
      color: #cce3fe;
      font-size: 0.1rem;
    }
  }
  .mon-dialog {
    .el-dialog:after {
      display: block;
      content: "";
      clear: both;
    }
    .el-dialog__header {
      border-bottom: 1px solid rgb(243, 243, 243);
      padding: 10px;
      padding-left: 20px;
    }
    .el-dialog__headerbtn {
      top: 12px;
      right: 10px;
    }
  }
}
</style>
