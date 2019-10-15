<template>
  <div class="water">
    <div class="statis_top">
      <el-select v-model="value" :placeholder="$t('electric.select')">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-date-picker
        v-model="timeframe"
        type="daterange"
        :range-separator="$t('common.to')"
        :start-placeholder="$t('common.startDate')"
        :end-placeholder="$t('common.endDate')"
      ></el-date-picker>
      <el-button type="primary">{{$t('common.query')}}</el-button>
    </div>

    <div class="statis_chart">
       <p class="title">{{$t('water.regionalWaterConsumptionChart')}}</p>
       <ve-histogram :data="chartData" :settings="chartSettings" :extend="chartExtend" :colors="barColors"></ve-histogram>
    </div>

    <div class="statis_table">
      <p class="clearfix">
          <span class="pull-left title">{{$t('water.regionalWaterConsumptionTable')}}</span>
          <el-dropdown class="pull-right icon">
              <span class="el-dropdown-link">
                <i class="fa fa-upload" aria-hidden="true"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>{{$t('common.exportExcel')}}</el-dropdown-item>
                <el-dropdown-item>{{$t('electric.exportPDF')}}</el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown>
        </p>
        <el-table
            :data="eleData"
            border
            height="400"
            :summary-method="getSummaries"
            show-summary
            style="width: 100%; margin-top: 20px">
            <el-table-column prop="id" :label="$t('common.serialNum')" width="180"></el-table-column>
              <el-table-column prop="name" :label="$t('electric.areaName')"></el-table-column>
              <el-table-column prop="amount1" :label="$t('electric.affiliation')"></el-table-column>
              <el-table-column prop="amount2" :label="$t('common.startDate')"></el-table-column>
              <el-table-column prop="amount3" :label="$t('common.endDate')"></el-table-column>
              <el-table-column prop="amount3" :label="$t('water.sumWaterConsumption')">
                <template slot-scope="scope">
                  <el-button type="text" @click="deviceshow">{{scope.row.amount3}}</el-button>
                </template>
              </el-table-column>
          </el-table>
    </div>
 
    <el-dialog
        :title="$t('water.devWaterConsumptionList')"
        :visible.sync="elecdialog"
        width="1000px"
        >
        <el-table
          :data="eleDialogData"
          border
          height="500"
          style="width: 100%; margin-top: 20px"
        >
          <el-table-column prop="id" :label="$t('common.serialNum')" width="180"></el-table-column>
          <el-table-column prop="name" :label="$t('common.deviceName')"></el-table-column>
          <el-table-column prop="amount1" :label="$t('electric.commAddress')"></el-table-column>
          <el-table-column prop="amount2" :label="$t('electric.installAddress')"></el-table-column>
          <el-table-column prop="amount3" :label="$t('electric.currentStatus')"></el-table-column>
          <el-table-column prop="amount3" :label="$t('electric.dataTime')"></el-table-column>
          <el-table-column prop="amount3" :label="$t('water.sumWaterConsumption')"></el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          @size-change="handleSizeChange"
          :total="total"
          style="text-align:right;margin-top:30px;">
        </el-pagination>
        <span slot="footer" class="dialog-footer">
          <el-button @click="elecdialog = false">{{$t('electric.canael')}}</el-button>
          <el-button type="primary" @click="elecdialog = false">{{$t('common.yes')}}</el-button>
        </span>
    </el-dialog>
    
  </div>
</template>

<script>
export default {
    name: '',

    data () {
        this.chartSettings = {
            dimension: ['区域']
        };
        return {
            options: [
                {
                    value: '1',
                    label: '按日期'
                },
                {
                    value: '2',
                    label: '按月份'
                }
            ],
            value: '',
            timeframe: '',
            eleData: [
                {
                    id: '12987122',
                    name: '王小虎',
                    amount1: '234',
                    amount2: '3.2',
                    amount3: 10
                },
                {
                    id: '12987123',
                    name: '王小虎',
                    amount1: '165',
                    amount2: '4.43',
                    amount3: 12
                },
                {
                    id: '12987124',
                    name: '王小虎',
                    amount1: '324',
                    amount2: '1.9',
                    amount3: 9
                }
            ],
            elecdialog: false,
            eleDialogData: [
                {
                    id: '12987122',
                    name: '王小虎',
                    amount1: '234',
                    amount2: '3.2',
                    amount3: 10
                }
            ],
            total: 1,
            chartData: {
                columns: ['区域', '用水量'],
                rows: [
                    { '区域': '区域A', '用水量': 8},
                    { '区域': '区域A', '用水量': 6},
                    { '区域': '区域A', '用水量': 11},
                    { '区域': '区域A', '用水量': 9},
                    { '区域': '区域A', '用水量': 4},
                    { '区域': '区域A', '用水量': 8},
                    { '区域': '区域A', '用水量': 6},
                    { '区域': '区域A', '用水量': 11},
                    { '区域': '区域A', '用水量': 9},
                    { '区域': '区域A', '用水量': 4},
                    { '区域': '区域A', '用水量': 8},
                    { '区域': '区域A', '用水量': 6},
                    { '区域': '区域A', '用水量': 11},
                    { '区域': '区域A', '用水量': 9},
                    { '区域': '区域A', '用水量': 4}

                ]
            },
            chartExtend: {
                barWidth: 25,
                series: {
                    center: ['50%', '60%']
                }
            },
            barColors: ['#1191FF']

        };
    },

    methods: {
        deviceshow () {
            this.elecdialog = true;
        },
        handleSizeChange () {

        },
        getSummaries (param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '合计';
                    return;
                }
                const values = data.map(item => Number(item[column.property]));
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                            return prev + curr;
                        } else {
                            return prev;
                        }
                    }, 0);
                    sums[index];
                } else {
                    sums[index] = '';
                }
            });

            return sums;
        }

    }
};
</script>

<style lang='scss' scope>
.water {
  .statis_top {
    padding: 10px;
    height: 80px;
    line-height: 80px;
    background-color: #fff;
  }

  .statis_chart {
    height: 6rem;
    background-color: #fff;
    margin: 10px;
    padding: 10px;
    .title {
      font-size: 18px;
      font-weight: 700;
    }
  }

  .statis_table {
       background-color: #fff;
       margin: 10px;
       padding: 10px;
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
  }

  .el-dialog {
    margin-top: 10vh!important;
  }
}
</style>
